import { NextRequest, NextResponse } from "next/server";
import { GroqError, asScore, asString, asStringArray, gradeFromScore, groqJson, isRecord } from "@/lib/groq";

// Give the Groq call room on Vercel (default function timeout can be as low as 10s).
export const maxDuration = 60;

const MAX_INPUT_CHARS = 8000;
const GRADES = ["A+", "A", "B", "C", "D", "F"] as const;

const writingSchema = {
  type: "object",
  properties: {
    score: { type: "integer", description: "Overall score 0-100" },
    grade: { type: "string", enum: [...GRADES] },
    summary: { type: "string", description: "2-3 sentence overall assessment" },
    grammar: {
      type: "object",
      properties: {
        score: { type: "integer" },
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              wrong: { type: "string", description: "Exact wrong phrase from the text" },
              correct: { type: "string", description: "Corrected version" },
              rule: { type: "string", description: "Grammar rule violated" },
            },
            required: ["wrong", "correct", "rule"],
            additionalProperties: false,
          },
        },
      },
      required: ["score", "errors"],
      additionalProperties: false,
    },
    vocabulary: {
      type: "object",
      properties: {
        score: { type: "integer" },
        weak_words: {
          type: "array",
          items: {
            type: "object",
            properties: {
              used: { type: "string", description: "Simple word the student used" },
              better: { type: "string", description: "Stronger alternative" },
              reason: { type: "string", description: "Why the alternative is better for BCS" },
            },
            required: ["used", "better", "reason"],
            additionalProperties: false,
          },
        },
        advanced_used: { type: "array", items: { type: "string" } },
      },
      required: ["score", "weak_words", "advanced_used"],
      additionalProperties: false,
    },
    coherence: {
      type: "object",
      properties: { score: { type: "integer" }, feedback: { type: "string" } },
      required: ["score", "feedback"],
      additionalProperties: false,
    },
    style: {
      type: "object",
      properties: { score: { type: "integer" }, feedback: { type: "string" } },
      required: ["score", "feedback"],
      additionalProperties: false,
    },
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
    improved_version: { type: "string", description: "Rewritten version of the first 1-2 sentences" },
  },
  required: ["score", "grade", "summary", "grammar", "vocabulary", "coherence", "style", "strengths", "improvements", "improved_version"],
  additionalProperties: false,
};

type WritingEval = {
  score: number;
  grade: string;
  summary: string;
  grammar: { score: number; errors: { wrong: string; correct: string; rule: string }[] };
  vocabulary: { score: number; weak_words: { used: string; better: string; reason: string }[]; advanced_used: string[] };
  coherence: { score: number; feedback: string };
  style: { score: number; feedback: string };
  strengths: string[];
  improvements: string[];
  improved_version: string;
};

/** Coerce whatever the model returned into exactly what the writing page renders. */
function normalize(raw: unknown): WritingEval {
  const r = isRecord(raw) ? raw : {};
  const grammar = isRecord(r.grammar) ? r.grammar : {};
  const vocabulary = isRecord(r.vocabulary) ? r.vocabulary : {};
  const coherence = isRecord(r.coherence) ? r.coherence : {};
  const style = isRecord(r.style) ? r.style : {};
  const score = asScore(r.score);
  const grade = asString(r.grade);
  return {
    score,
    grade: (GRADES as readonly string[]).includes(grade) ? grade : gradeFromScore(score),
    summary: asString(r.summary, "No summary was returned."),
    grammar: {
      score: asScore(grammar.score),
      errors: Array.isArray(grammar.errors)
        ? grammar.errors
            .filter(isRecord)
            .map((e) => ({ wrong: asString(e.wrong), correct: asString(e.correct), rule: asString(e.rule) }))
            .filter((e) => e.wrong || e.correct)
        : [],
    },
    vocabulary: {
      score: asScore(vocabulary.score),
      weak_words: Array.isArray(vocabulary.weak_words)
        ? vocabulary.weak_words
            .filter(isRecord)
            .map((w) => ({ used: asString(w.used), better: asString(w.better), reason: asString(w.reason) }))
            .filter((w) => w.used || w.better)
        : [],
      advanced_used: asStringArray(vocabulary.advanced_used),
    },
    coherence: { score: asScore(coherence.score), feedback: asString(coherence.feedback) },
    style: { score: asScore(style.score), feedback: asString(style.feedback) },
    strengths: asStringArray(r.strengths),
    improvements: asStringArray(r.improvements),
    improved_version: asString(r.improved_version),
  };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const text = asString(isRecord(body) ? body.text : "").trim();
  if (text.length < 20) return NextResponse.json({ error: "Text is too short to evaluate." }, { status: 400 });
  if (text.length > MAX_INPUT_CHARS) {
    return NextResponse.json({ error: `Text is too long (limit ${MAX_INPUT_CHARS} characters).` }, { status: 400 });
  }

  const system = `You are an expert BCS (Bangladesh Civil Service) English writing evaluator. You assess free-hand English writing for grammar, vocabulary, coherence, and style the way a BCS written-exam examiner would. You always answer with a single JSON object and nothing else.`;

  const user = `Evaluate this English writing sample for BCS exam preparation:

"""${text}"""

Respond with JSON in exactly this shape:
{
  "score": <0-100 overall>,
  "grade": "<A+|A|B|C|D|F>",
  "summary": "2-3 sentence overall assessment",
  "grammar": { "score": <0-100>, "errors": [ { "wrong": "exact wrong phrase from the text", "correct": "corrected version", "rule": "grammar rule violated" } ] },
  "vocabulary": { "score": <0-100>, "weak_words": [ { "used": "simple word used", "better": "more impressive alternative", "reason": "why the alternative is better for BCS" } ], "advanced_used": ["good words already used"] },
  "coherence": { "score": <0-100>, "feedback": "feedback on sentence flow, paragraph structure, and logical connection" },
  "style": { "score": <0-100>, "feedback": "feedback on tone, formality, and writing style for the BCS context" },
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "improved_version": "A rewritten version of the first 1-2 sentences showing how to improve them."
}

Rules:
- Quote the student's exact wording in "wrong" and "used"; use empty arrays when there is nothing to report.
- Be specific and actionable; all feedback in English.`;

  try {
    const raw = await groqJson({
      system,
      user,
      schemaName: "writing_evaluation",
      schema: writingSchema,
      maxTokens: 4096,
      temperature: 0.2,
    });
    return NextResponse.json(normalize(raw));
  } catch (e) {
    const status = e instanceof GroqError ? e.status : 500;
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[evaluate-writing]", msg);
    return NextResponse.json({ error: `Evaluation failed: ${msg}` }, { status });
  }
}
