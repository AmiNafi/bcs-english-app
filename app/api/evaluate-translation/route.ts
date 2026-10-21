import { NextRequest, NextResponse } from "next/server";
import { GroqError, asScore, asString, asStringArray, gradeFromScore, groqJson, isRecord } from "@/lib/groq";

// Give the Groq call room on Vercel (default function timeout can be as low as 10s).
export const maxDuration = 60;

const MAX_INPUT_CHARS = 6000;

const ACCURACY_LABELS = ["Excellent", "Good", "Fair", "Poor"] as const;
const GRADES = ["A+", "A", "B", "C", "D", "F"] as const;

const translationSchema = {
  type: "object",
  properties: {
    score: { type: "integer", description: "Overall score from 0 to 100" },
    grade: { type: "string", enum: [...GRADES] },
    accuracy: { type: "string", enum: [...ACCURACY_LABELS] },
    feedback: { type: "string", description: "2-3 sentences of overall feedback in English" },
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
    corrections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          original: { type: "string", description: "The exact wrong phrase the student wrote" },
          corrected: { type: "string", description: "The corrected phrase" },
          reason: { type: "string", description: "Why the original is wrong, in English" },
        },
        required: ["original", "corrected", "reason"],
        additionalProperties: false,
      },
    },
  },
  required: ["score", "grade", "accuracy", "feedback", "strengths", "improvements", "corrections"],
  additionalProperties: false,
};

type Correction = { original: string; corrected: string; reason: string };
type EvalResult = {
  score: number;
  grade: string;
  accuracy: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  corrections: Correction[];
};

/** Coerce whatever the model returned into exactly what the translation page renders. */
function normalize(raw: unknown): EvalResult {
  const r = isRecord(raw) ? raw : {};
  const score = asScore(r.score);
  const grade = asString(r.grade);
  const accuracy = asString(r.accuracy);
  const corrections: Correction[] = Array.isArray(r.corrections)
    ? r.corrections
        .filter(isRecord)
        .map((c) => ({ original: asString(c.original), corrected: asString(c.corrected), reason: asString(c.reason) }))
        .filter((c) => c.original || c.corrected)
    : [];
  return {
    score,
    grade: (GRADES as readonly string[]).includes(grade) ? grade : gradeFromScore(score),
    accuracy: (ACCURACY_LABELS as readonly string[]).includes(accuracy)
      ? accuracy
      : score >= 85 ? "Excellent" : score >= 65 ? "Good" : score >= 45 ? "Fair" : "Poor",
    feedback: asString(r.feedback, "No feedback was returned."),
    strengths: asStringArray(r.strengths),
    improvements: asStringArray(r.improvements),
    corrections,
  };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const b = isRecord(body) ? body : {};
  const original = asString(b.original).trim();
  const userTranslation = asString(b.userTranslation).trim();
  const reference = asString(b.reference).trim();
  const direction = b.direction === "B2E" ? "B2E" : "E2B";

  if (!original || !userTranslation) {
    return NextResponse.json({ error: "Both the passage and your translation are required." }, { status: 400 });
  }
  if (userTranslation.length < 10) {
    return NextResponse.json({ error: "Your translation is too short to evaluate." }, { status: 400 });
  }
  if (original.length > MAX_INPUT_CHARS || userTranslation.length > MAX_INPUT_CHARS) {
    return NextResponse.json({ error: `Text is too long (limit ${MAX_INPUT_CHARS} characters).` }, { status: 400 });
  }

  const isE2B = direction === "E2B";
  const sourceLang = isE2B ? "English" : "Bengali";
  const targetLang = isE2B ? "Bengali" : "English";
  const refLine = reference ? `\nReference ${targetLang} translation (for guidance only; other correct renderings are acceptable):\n"""${reference}"""` : "";

  const system = `You are an expert BCS (Bangladesh Civil Service) exam translation evaluator. You grade ${sourceLang}-to-${targetLang} translations strictly but fairly, the way a BCS written-exam examiner would: meaning accuracy first, then grammar, word choice, naturalness, and register. You always answer with a single JSON object and nothing else.`;

  const user = `A student translated the following ${sourceLang} passage into ${targetLang} for BCS exam practice.

Original ${sourceLang} passage:
"""${original}"""${refLine}

Student's ${targetLang} translation:
"""${userTranslation}"""

Evaluate the student's translation and respond with JSON in exactly this shape:
{"score":<0-100>,"grade":"<A+|A|B|C|D|F>","accuracy":"<Excellent|Good|Fair|Poor>","feedback":"2-3 sentences of overall feedback in English","strengths":["..."],"improvements":["...","...","..."],"corrections":[{"original":"exact wrong ${targetLang} phrase the student wrote","corrected":"correct ${targetLang} phrase","reason":"why it is wrong, in English"}]}

Rules:
- "corrections" must quote the student's own wording in "original" (copy it exactly) and give the fixed ${targetLang} wording in "corrected". Include every real mistake (meaning, grammar, spelling, omission). Use an empty array if there are none.
- Keep "feedback", "reason" and the list items in English so the student can study them.
- Score guide: 90+ near-perfect, 80-89 minor slips, 65-79 understandable with several errors, 50-64 meaning partly lost, below 50 mostly incorrect.`;

  try {
    const raw = await groqJson({
      system,
      user,
      schemaName: "translation_evaluation",
      schema: translationSchema,
      maxTokens: 4096,
      temperature: 0.2,
    });
    return NextResponse.json(normalize(raw));
  } catch (e) {
    const status = e instanceof GroqError ? e.status : 500;
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[evaluate-translation]", msg);
    return NextResponse.json({ error: `AI evaluation failed: ${msg}` }, { status });
  }
}
