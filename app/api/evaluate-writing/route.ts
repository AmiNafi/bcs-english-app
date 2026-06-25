import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  if (!text || text.trim().length < 20) return NextResponse.json({ error: "Text is too short to evaluate." }, { status: 400 });

  const systemPrompt = `You are an expert BCS (Bangladesh Civil Service) English writing evaluator. Evaluate the student's free-hand English writing for grammar, vocabulary, coherence, and style. Respond ONLY with valid JSON — no markdown, no backticks, no text outside the JSON.`;

  const userPrompt = `Evaluate this English writing sample for BCS exam preparation:

"${text}"

Respond ONLY with this exact JSON structure:
{
  "score": 78,
  "grade": "B",
  "summary": "2-3 sentence overall assessment",
  "grammar": {
    "score": 80,
    "errors": [
      { "wrong": "exact wrong phrase from text", "correct": "corrected version", "rule": "grammar rule violated" }
    ]
  },
  "vocabulary": {
    "score": 75,
    "weak_words": [
      { "used": "simple word used", "better": "more impressive alternative", "reason": "why the alternative is better for BCS" }
    ],
    "advanced_used": ["list", "of", "good", "words", "already", "used"]
  },
  "coherence": {
    "score": 70,
    "feedback": "feedback on sentence flow, paragraph structure, and logical connection"
  },
  "style": {
    "score": 72,
    "feedback": "feedback on tone, formality, and writing style for BCS context"
  },
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "improved_version": "A rewritten version of the first 1-2 sentences showing how to improve them."
}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const raw: string = data.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Evaluation failed: ${msg}` }, { status: 500 });
  }
}
