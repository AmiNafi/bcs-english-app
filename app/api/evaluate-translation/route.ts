import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { original, userTranslation, reference, direction } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  const isE2B = direction === "E2B";
  const refLine = reference ? `\nReference Translation: "${reference}"` : "";

  const systemPrompt = `You are an expert BCS (Bangladesh Civil Service) exam translation evaluator. You evaluate translation quality and respond ONLY with valid JSON — no markdown, no backticks, no explanation outside the JSON.`;

  const userPrompt = isE2B
    ? `A student translated an English passage to Bengali for BCS exam practice.

Original English: "${original}"${refLine}

Student's Bengali Translation: "${userTranslation}"

Evaluate the translation quality. Respond ONLY with this JSON structure:
{"score":85,"grade":"A","accuracy":"Good","feedback":"2-3 sentences of overall feedback in English.","strengths":["strength 1","strength 2"],"improvements":["improvement 1","improvement 2","improvement 3"],"corrections":[{"original":"wrong Bengali phrase student wrote","corrected":"correct Bengali phrase","reason":"why this is wrong"}]}`
    : `A student translated a Bengali passage to English for BCS exam practice.

Original Bengali: "${original}"${refLine}

Student's English Translation: "${userTranslation}"

Evaluate the translation quality. Respond ONLY with this JSON structure:
{"score":85,"grade":"A","accuracy":"Good","feedback":"2-3 sentences of overall feedback.","strengths":["strength 1","strength 2"],"improvements":["improvement 1","improvement 2","improvement 3"],"corrections":[{"original":"wrong phrase student wrote","corrected":"better phrase","reason":"why this is wrong"}]}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 1024,
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const text: string = data.choices?.[0]?.message?.content ?? "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `AI evaluation failed: ${msg}` }, { status: 500 });
  }
}
