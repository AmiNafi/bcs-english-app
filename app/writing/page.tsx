"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { vocabulary } from "@/data/vocabulary";
import { sampleSentences } from "@/data/translations";

type Tab = "free" | "word" | "sentence";

type WritingEval = {
  score: number;
  grade: string;
  summary: string;
  grammar: {
    score: number;
    errors: { wrong: string; correct: string; rule: string }[];
  };
  vocabulary: {
    score: number;
    weak_words: { used: string; better: string; reason: string }[];
    advanced_used: string[];
  };
  coherence: { score: number; feedback: string };
  style: { score: number; feedback: string };
  strengths: string[];
  improvements: string[];
  improved_version: string;
};

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = useCallback(() => { setRunning(true); setSeconds(0); }, []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => { setRunning(false); setSeconds(0); }, []);
  useEffect(() => {
    if (running) { ref.current = setInterval(() => setSeconds((s) => s + 1), 1000); }
    else if (ref.current) clearInterval(ref.current);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);
  return { seconds, running, start, stop, reset };
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function wpm(text: string, seconds: number) {
  if (seconds < 2) return 0;
  return Math.round((text.trim().split(/\s+/).filter(Boolean).length / seconds) * 60);
}

const scoreColor = (s: number) => s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : "#ef4444";
const gradeColor = (g: string) => g === "A+" || g === "A" ? "#10b981" : g === "B" ? "#f59e0b" : g === "C" ? "#f97316" : "#ef4444";

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: "var(--muted)" }}>{label}</span>
        <span className="font-bold" style={{ color: scoreColor(score) }}>{score}/100</span>
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: "var(--surface2)" }}>
        <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, background: scoreColor(score) }} />
      </div>
    </div>
  );
}

export default function WritingPage() {
  const [tab, setTab] = useState<Tab>("free");

  // Free Write
  const [freeText, setFreeText] = useState("");
  const freeTimer = useTimer();
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<WritingEval | null>(null);
  const [evalError, setEvalError] = useState("");

  // Word Tracing
  const wordList = vocabulary.slice(0, 100);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordInput, setWordInput] = useState("");
  const [wordScore, setWordScore] = useState({ correct: 0, attempted: 0 });
  const currentWord = wordList[wordIdx]?.word ?? "";

  function nextWord(correct: boolean) {
    setWordScore((s) => ({ correct: s.correct + (correct ? 1 : 0), attempted: s.attempted + 1 }));
    setWordInput("");
    setWordIdx((i) => (i + 1) % wordList.length);
  }
  function handleWordKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") nextWord(wordInput.trim().toLowerCase() === currentWord.toLowerCase());
  }

  // Sentence Practice
  const sentences = sampleSentences;
  const [sentIdx, setSentIdx] = useState(0);
  const [sentInput, setSentInput] = useState("");
  const [sentDone, setSentDone] = useState(false);
  const [sentWpm, setSentWpm] = useState(0);
  const [sentAccuracy, setSentAccuracy] = useState(0);
  const sentTimer = useTimer();
  const currentSent = sentences[sentIdx]?.english ?? "";

  function handleSentInput(val: string) {
    if (!sentTimer.running && val.length === 1) sentTimer.start();
    setSentInput(val);
    if (val.length >= currentSent.length - 2) {
      sentTimer.stop();
      setSentDone(true);
      setSentWpm(wpm(val, sentTimer.seconds));
      const correct = [...val].filter((c, i) => c === currentSent[i]).length;
      setSentAccuracy(Math.round((correct / Math.max(currentSent.length, 1)) * 100));
    }
  }
  function nextSentence() {
    setSentIdx((i) => (i + 1) % sentences.length);
    setSentInput(""); setSentDone(false); setSentWpm(0); setSentAccuracy(0);
    sentTimer.reset();
  }

  function renderSentence() {
    return [...currentSent].map((char, i) => {
      let color = "var(--muted)";
      if (i < sentInput.length) color = sentInput[i] === char ? "#6ee7b7" : "#fca5a5";
      return <span key={i} style={{ color, fontFamily: "monospace", fontSize: "1.1rem" }}>{char}</span>;
    });
  }
  function renderWord() {
    return [...currentWord].map((char, i) => {
      let color = "var(--muted)";
      if (i < wordInput.length) color = wordInput[i]?.toLowerCase() === char.toLowerCase() ? "#6ee7b7" : "#fca5a5";
      return <span key={i} style={{ color, fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.1em" }}>{char}</span>;
    });
  }

  const freeWords = freeText.trim().split(/\s+/).filter(Boolean).length;
  const freeWpm = freeTimer.seconds > 2 ? Math.round((freeWords / freeTimer.seconds) * 60) : 0;

  async function evaluateWriting() {
    if (freeText.trim().length < 20) return;
    setEvaluating(true); setEvalResult(null); setEvalError("");
    try {
      const res = await fetch("/api/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: freeText.trim() }),
      });
      const data = await res.json();
      if (data.error) setEvalError(data.error);
      else setEvalResult(data);
    } catch { setEvalError("Network error. Please try again."); }
    finally { setEvaluating(false); }
  }

  return (
    <div className="max-w-4xl fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">✍️ Writing Practice</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Free writing with AI evaluation, word tracing, and sentence speed practice</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["free", "word", "sentence"] as const).map((t) => (
          <button key={t} className={`btn ${tab === t ? "btn-primary" : "btn-secondary"}`}
            onClick={() => { setTab(t); freeTimer.reset(); sentTimer.reset(); setEvalResult(null); setEvalError(""); }}>
            {t === "free" ? "✏️ Free Write" : t === "word" ? "📝 Word Practice" : "📄 Sentence Practice"}
          </button>
        ))}
      </div>

      {/* ── Free Write ── */}
      {tab === "free" && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span className="font-semibold text-white">Free Writing</span>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm font-mono" style={{ color: "var(--muted)" }}>{formatTime(freeTimer.seconds)}</span>
                {!freeTimer.running
                  ? <button className="btn btn-green" onClick={freeTimer.start}>▶ Start</button>
                  : <button className="btn btn-red" onClick={freeTimer.stop}>⏹ Pause</button>}
                <button className="btn btn-secondary" onClick={() => { setFreeText(""); freeTimer.reset(); setEvalResult(null); setEvalError(""); }}>🗑 Clear</button>
              </div>
            </div>
            <textarea
              value={freeText}
              onChange={(e) => { if (!freeTimer.running && e.target.value.length === 1) freeTimer.start(); setFreeText(e.target.value); setEvalResult(null); }}
              placeholder="Start writing here… Write a paragraph, an essay, or any English text. Click ▶ Start to track speed, then Evaluate when done."
              rows={10}
              style={{ resize: "vertical", fontSize: "1rem", lineHeight: "1.7" }}
            />
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <div className="flex gap-4 text-sm flex-wrap">
                <span style={{ color: "var(--muted)" }}>Words: <strong className="text-white">{freeWords}</strong></span>
                <span style={{ color: "var(--muted)" }}>Chars: <strong className="text-white">{freeText.length}</strong></span>
                <span style={{ color: "var(--muted)" }}>WPM: <strong style={{ color: freeWpm >= 30 ? "#10b981" : freeWpm >= 20 ? "#f59e0b" : "#f1f5f9" }}>{freeWpm}</strong></span>
              </div>
              <button
                className="btn btn-primary"
                onClick={evaluateWriting}
                disabled={evaluating || freeText.trim().length < 20}
                style={{ opacity: freeText.trim().length < 20 ? 0.5 : 1 }}
              >
                {evaluating ? "⏳ Evaluating…" : "🤖 Evaluate Writing"}
              </button>
            </div>
            {evalError && <p className="mt-3 text-sm" style={{ color: "#fca5a5" }}>❌ {evalError}</p>}
          </div>

          {/* ── Evaluation Results ── */}
          {evalResult && (
            <div className="space-y-3 fade-in">

              {/* Overall score */}
              <div className="card text-center" style={{ borderColor: scoreColor(evalResult.score) }}>
                <div className="text-5xl font-bold mb-1" style={{ color: scoreColor(evalResult.score) }}>
                  {evalResult.score}<span className="text-2xl">/100</span>
                </div>
                <div className="text-xl font-bold mb-2" style={{ color: gradeColor(evalResult.grade) }}>
                  Grade {evalResult.grade}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{evalResult.summary}</p>
              </div>

              {/* Score breakdown */}
              <div className="card">
                <h3 className="font-semibold text-white mb-4">📊 Score Breakdown</h3>
                <ScoreBar label="Grammar" score={evalResult.grammar.score} />
                <ScoreBar label="Vocabulary" score={evalResult.vocabulary.score} />
                <ScoreBar label="Coherence & Flow" score={evalResult.coherence.score} />
                <ScoreBar label="Style & Tone" score={evalResult.style.score} />
              </div>

              {/* Grammar errors */}
              {evalResult.grammar.errors?.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-white mb-3">🔴 Grammar Mistakes</h3>
                  <div className="space-y-3">
                    {evalResult.grammar.errors.map((e, i) => (
                      <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                        <div className="p-2 text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
                          ✗ {e.wrong}
                        </div>
                        <div className="p-2 text-sm" style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7" }}>
                          ✓ {e.correct}
                        </div>
                        <div className="p-2 text-xs" style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                          📌 {e.rule}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocabulary */}
              <div className="card">
                <h3 className="font-semibold text-white mb-3">📚 Vocabulary</h3>
                {evalResult.vocabulary.advanced_used?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold mb-2" style={{ color: "#10b981" }}>✅ Good words you used</div>
                    <div className="flex flex-wrap gap-2">
                      {evalResult.vocabulary.advanced_used.map((w, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7" }}>{w}</span>
                      ))}
                    </div>
                  </div>
                )}
                {evalResult.vocabulary.weak_words?.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold mb-2" style={{ color: "#f59e0b" }}>💡 Upgrade these words</div>
                    <div className="space-y-2">
                      {evalResult.vocabulary.weak_words.map((w, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm p-2 rounded-lg" style={{ background: "var(--surface2)" }}>
                          <span style={{ color: "#fca5a5", flexShrink: 0 }}>{w.used}</span>
                          <span style={{ color: "var(--muted)" }}>→</span>
                          <span style={{ color: "#6ee7b7", flexShrink: 0 }}>{w.better}</span>
                          <span className="text-xs hidden sm:block" style={{ color: "var(--muted)" }}>— {w.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Coherence & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="card">
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: "#a5b4fc" }}>🔗 Coherence & Flow</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>{evalResult.coherence.feedback}</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: "#a5b4fc" }}>🎨 Style & Tone</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>{evalResult.style.feedback}</p>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="card">
                  <h3 className="font-semibold mb-2" style={{ color: "#10b981" }}>✅ Strengths</h3>
                  <ul className="space-y-2">
                    {evalResult.strengths.map((s, i) => (
                      <li key={i} className="text-sm p-2 rounded-lg" style={{ background: "var(--surface2)", color: "var(--muted)" }}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 className="font-semibold mb-2" style={{ color: "#f59e0b" }}>💡 Improvements</h3>
                  <ul className="space-y-2">
                    {evalResult.improvements.map((s, i) => (
                      <li key={i} className="text-sm p-2 rounded-lg" style={{ background: "var(--surface2)", color: "var(--muted)" }}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI improved version */}
              {evalResult.improved_version && (
                <div className="card" style={{ borderColor: "#6366f1", background: "rgba(99,102,241,0.06)" }}>
                  <h3 className="font-semibold mb-2" style={{ color: "#a5b4fc" }}>✨ How to improve it</h3>
                  <p className="text-sm leading-relaxed italic" style={{ color: "#e2e8f0" }}>{evalResult.improved_version}</p>
                </div>
              )}

              <button className="btn btn-secondary w-full" onClick={() => setEvalResult(null)}>
                ← Back to Writing
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Word Practice ── */}
      {tab === "word" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
                Word {wordIdx + 1} of {wordList.length} — Type the word exactly
              </div>
              <div className="mb-2 text-center py-4">{renderWord()}</div>
              <div className="bangla text-center text-lg mb-4" style={{ color: "#a5b4fc" }}>
                {vocabulary[wordIdx]?.bangla.split("/")[0].trim()}
              </div>
              <input autoFocus value={wordInput} onChange={(e) => setWordInput(e.target.value)}
                onKeyDown={handleWordKey} placeholder="Type the word and press Enter…"
                style={{ fontSize: "1.1rem", textAlign: "center", letterSpacing: "0.05em" }} />
              <div className="flex gap-3 mt-3">
                <button className="btn btn-secondary flex-1" onClick={() => nextWord(false)}>Skip →</button>
                <button className="btn btn-primary flex-1"
                  onClick={() => nextWord(wordInput.trim().toLowerCase() === currentWord.toLowerCase())}
                  disabled={!wordInput.trim()}>Submit ↵</button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card">
              <div className="font-semibold text-white mb-3">📊 Score</div>
              <div className="text-4xl font-bold mb-1" style={{ color: "#6366f1" }}>
                {wordScore.attempted > 0 ? Math.round((wordScore.correct / wordScore.attempted) * 100) : 0}%
              </div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>{wordScore.correct} / {wordScore.attempted} correct</div>
              <button className="btn btn-secondary w-full mt-3 text-xs" onClick={() => setWordScore({ correct: 0, attempted: 0 })}>Reset Score</button>
            </div>
            <div className="card">
              <div className="font-semibold text-white mb-2">📖 Word Info</div>
              <div className="text-sm space-y-1" style={{ color: "var(--muted)" }}>
                <div><span className="text-white">{vocabulary[wordIdx]?.word}</span> · {vocabulary[wordIdx]?.partOfSpeech}</div>
                <div className="bangla" style={{ color: "#a5b4fc" }}>{vocabulary[wordIdx]?.bangla}</div>
                <div className="mt-2 text-xs leading-relaxed">{vocabulary[wordIdx]?.definition}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Sentence Practice ── */}
      {tab === "sentence" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
                Type the sentence below — timer starts on first keystroke
              </div>
              <div className="p-4 rounded-xl mb-4 leading-loose" style={{ background: "var(--surface2)", letterSpacing: "0.01em" }}>
                {renderSentence()}
              </div>
              {sentences[sentIdx]?.bangla && (
                <div className="bangla text-sm mb-3" style={{ color: "#a5b4fc" }}>{sentences[sentIdx].bangla}</div>
              )}
              {!sentDone ? (
                <textarea value={sentInput} onChange={(e) => handleSentInput(e.target.value)}
                  placeholder="Start typing here…" rows={3}
                  style={{ resize: "none", fontSize: "1rem", fontFamily: "monospace" }} />
              ) : (
                <div className="p-4 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981" }}>
                  <div className="text-3xl font-bold text-green-400 mb-1">✓ Done!</div>
                  <div className="flex justify-center gap-6 text-sm flex-wrap">
                    <span style={{ color: "var(--muted)" }}>WPM: <strong style={{ color: sentWpm >= 30 ? "#10b981" : "#f59e0b" }}>{sentWpm}</strong></span>
                    <span style={{ color: "var(--muted)" }}>Accuracy: <strong style={{ color: sentAccuracy >= 90 ? "#10b981" : sentAccuracy >= 70 ? "#f59e0b" : "#ef4444" }}>{sentAccuracy}%</strong></span>
                    <span style={{ color: "var(--muted)" }}>Time: <strong className="text-white">{formatTime(sentTimer.seconds)}</strong></span>
                  </div>
                </div>
              )}
              <button className="btn btn-primary w-full mt-3" onClick={nextSentence}>Next Sentence →</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card">
              <div className="font-semibold text-white mb-3">⏱ Session</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted)" }}>Time</span>
                  <span className="text-white font-mono">{formatTime(sentTimer.seconds)}</span>
                </div>
                {sentDone && <>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted)" }}>WPM</span>
                    <span style={{ color: sentWpm >= 30 ? "#10b981" : "#f59e0b" }}>{sentWpm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted)" }}>Accuracy</span>
                    <span style={{ color: sentAccuracy >= 90 ? "#10b981" : "#f59e0b" }}>{sentAccuracy}%</span>
                  </div>
                </>}
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted)" }}>Target</span>
                  <span className="text-green-400">30 WPM</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="font-semibold text-white mb-3">✍️ Tips</div>
              <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                <li>• BCS exam target: 25–35 WPM</li>
                <li>• Practice daily for 20 min</li>
                <li>• Focus on accuracy before speed</li>
                <li>• Review words you skip often</li>
                <li>• Use touch typing technique</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
