// Shared helper for the two AI evaluation routes.
//
// Both routes used to hard-code `llama-3.3-70b-versatile`. Groq retired that model
// for free/developer keys on 2026-08-16, so every evaluation request started failing
// with a "model decommissioned" error. The default below is Groq's recommended
// replacement. If Groq retires this one too, set GROQ_MODEL in your environment
// (Vercel → Project → Settings → Environment Variables) instead of editing code.
export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const REQUEST_TIMEOUT_MS = 45_000;

export class GroqError extends Error {
  readonly status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "GroqError";
    this.status = status;
  }
}

export type GroqJsonOptions = {
  system: string;
  user: string;
  /** Identifier for the schema, e.g. "translation_evaluation". */
  schemaName: string;
  /** JSON Schema the model must follow (strict mode: every property required, additionalProperties false). */
  schema: Record<string, unknown>;
  maxTokens?: number;
  temperature?: number;
};

type GroqErrorBody = { message?: string; code?: string; type?: string };
type GroqResponse = {
  error?: GroqErrorBody;
  choices?: { message?: { content?: string | null }; finish_reason?: string }[];
};

export function getGroqModel(): string {
  return process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;
}

/**
 * Ask Groq for a JSON object and return it parsed.
 *
 * First tries strict structured output (`json_schema`), which guarantees the shape on
 * the default model. If the configured model rejects that request format, it retries
 * once with plain JSON mode (`json_object`), so swapping GROQ_MODEL keeps working.
 */
export async function groqJson(opts: GroqJsonOptions): Promise<unknown> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new GroqError(
      "GROQ_API_KEY is not configured. Add it to .env.local for local dev, or to Vercel → Settings → Environment Variables, then redeploy.",
      500,
    );
  }

  const model = getGroqModel();
  const base = {
    model,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    temperature: opts.temperature ?? 0.2,
    max_completion_tokens: opts.maxTokens ?? 4096,
  };

  const strictPayload = {
    ...base,
    reasoning_effort: "low",
    response_format: {
      type: "json_schema",
      json_schema: { name: opts.schemaName, strict: true, schema: opts.schema },
    },
  };
  const plainPayload = {
    ...base,
    response_format: { type: "json_object" },
  };

  let { res, data } = await callGroq(apiKey, strictPayload);

  // 400/422 here almost always means "this model doesn't support json_schema /
  // reasoning_effort" — retry in the most widely supported mode. Model-level errors
  // (decommissioned, not found) would fail again identically, so don't bother.
  const code = data.error?.code ?? "";
  if ((res.status === 400 || res.status === 422) && !code.startsWith("model_")) {
    ({ res, data } = await callGroq(apiKey, plainPayload));
  }

  if (!res.ok || data.error) {
    throw new GroqError(describeError(res.status, data.error, model), mapStatus(res.status));
  }

  const choice = data.choices?.[0];
  const content = (choice?.message?.content ?? "").trim();
  if (!content) {
    throw new GroqError(
      choice?.finish_reason === "length"
        ? "The AI ran out of output tokens before answering. Try a shorter text."
        : `Groq returned an empty response from ${model}.`,
    );
  }

  try {
    return extractJson(content);
  } catch {
    throw new GroqError(
      choice?.finish_reason === "length"
        ? "The AI response was cut off before it finished. Try a shorter text."
        : `Groq (${model}) returned something that is not valid JSON.`,
    );
  }
}

async function callGroq(apiKey: string, payload: Record<string, unknown>): Promise<{ res: Response; data: GroqResponse }> {
  let res: Response;
  try {
    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (e) {
    const timedOut = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
    throw new GroqError(timedOut ? "Groq took too long to respond. Please try again." : "Could not reach the Groq API.", 504);
  }

  const text = await res.text();
  let data: GroqResponse = {};
  if (text) {
    try {
      data = JSON.parse(text) as GroqResponse;
    } catch {
      // e.g. an HTML error page from a gateway
      throw new GroqError(`Groq returned a non-JSON response (HTTP ${res.status}).`, mapStatus(res.status));
    }
  }
  return { res, data };
}

function describeError(status: number, err: GroqErrorBody | undefined, model: string): string {
  const message = err?.message ?? `HTTP ${status}`;
  if (status === 401) return "Groq rejected the API key. Check GROQ_API_KEY (no quotes or trailing spaces) and redeploy.";
  if (status === 429) return `Groq rate limit reached: ${message}`;
  if (err?.code === "model_decommissioned" || err?.code === "model_not_found") {
    return `The model "${model}" is no longer available on Groq. Set GROQ_MODEL to a current model (see https://console.groq.com/docs/models). Groq said: ${message}`;
  }
  return `Groq API error: ${message}`;
}

/** Status we report to the browser: keep 429 so the UI could back off, everything else is an upstream failure. */
function mapStatus(upstream: number): number {
  return upstream === 429 ? 429 : 502;
}

/** Pull a JSON object out of a model reply, tolerating code fences or stray prose. */
export function extractJson(text: string): unknown {
  const stripped = text.replace(/```(?:json)?/gi, "").trim();
  try {
    return JSON.parse(stripped);
  } catch {
    const start = stripped.indexOf("{");
    const end = stripped.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("no JSON object found");
    return JSON.parse(stripped.slice(start, end + 1));
  }
}

// ---- small coercion helpers for turning untrusted model output into the shapes the UI expects ----

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function asString(v: unknown, fallback = ""): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return fallback;
}

export function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => asString(x)).filter((s) => s.trim().length > 0);
}

/** Clamp to an integer 0–100; falls back to 0 when the model omits or garbles it. */
export function asScore(v: unknown): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function gradeFromScore(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  if (score >= 35) return "D";
  return "F";
}
