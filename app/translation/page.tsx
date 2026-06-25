"use client";
import { useState, useMemo } from "react";
import { phrasalVerbs, idiomsAndPhrases, sampleSentences, TranslationEntry } from "@/data/translations";
import { vocabulary } from "@/data/vocabulary";
import { passages, passageCategories, Passage } from "@/data/passages";

type Tab = "lookup" | "phrasal" | "idioms" | "sentences" | "passages";

type EvalResult = {
  score: number;
  grade: string;
  accuracy: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  corrections: { original: string; corrected: string; reason: string }[];
};

export default function TranslationPage() {
  const [tab, setTab] = useState<Tab>("lookup");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | { word: string; bangla: string; note: string }>(null);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState("");

  // Passage state
  const [pDirection, setPDirection] = useState<"all" | "E2B" | "B2E">("all");
  const [pCategory, setPCategory] = useState("all");
  const [pDifficulty, setPDifficulty] = useState("all");
  const [pSearch, setPSearch] = useState("");
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [userTranslation, setUserTranslation] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<EvalResult | null>(null);
  const [evalError, setEvalError] = useState("");

  function handleLookup() {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const vocabMatch = vocabulary.find((w) => w.word.toLowerCase() === q);
    if (vocabMatch) { setResult({ word: vocabMatch.word, bangla: vocabMatch.bangla, note: vocabMatch.definition }); setNotFound(false); return; }
    const phrasal = phrasalVerbs.find((p) => p.english.toLowerCase() === q);
    if (phrasal) { setResult({ word: phrasal.english, bangla: phrasal.bangla, note: phrasal.grammaticalNote }); setNotFound(false); return; }
    const idiom = idiomsAndPhrases.find((i) => i.english.toLowerCase() === q);
    if (idiom) { setResult({ word: idiom.english, bangla: idiom.bangla, note: idiom.grammaticalNote }); setNotFound(false); return; }
    const sentence = sampleSentences.find((s) => s.english.toLowerCase().includes(q));
    if (sentence) { setResult({ word: sentence.english, bangla: sentence.bangla, note: sentence.note ?? "" }); setNotFound(false); return; }
    setResult(null); setNotFound(true);
  }

  const filteredPhrsal = phrasalVerbs.filter((p) => filter === "" || p.english.toLowerCase().includes(filter.toLowerCase()) || p.bangla.includes(filter));
  const filteredIdioms = idiomsAndPhrases.filter((p) => filter === "" || p.english.toLowerCase().includes(filter.toLowerCase()) || p.bangla.includes(filter));

  const filteredPassages = useMemo(() => passages.filter((p) => {
    if (pDirection !== "all" && p.direction !== pDirection) return false;
    if (pCategory !== "all" && p.category !== pCategory) return false;
    if (pDifficulty !== "all" && p.difficulty !== pDifficulty) return false;
    if (pSearch && !p.title.toLowerCase().includes(pSearch.toLowerCase()) && !p.original.toLowerCase().includes(pSearch.toLowerCase())) return false;
    return true;
  }), [pDirection, pCategory, pDifficulty, pSearch]);

  async function submitEvaluation() {
    if (!selectedPassage || !userTranslation.trim()) return;
    setEvaluating(true);
    setEvalResult(null);
    setEvalError("");
    try {
      const res = await fetch("/api/evaluate-translation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original: selectedPassage.original,
          userTranslation: userTranslation.trim(),
          reference: selectedPassage.reference || "",
          direction: selectedPassage.direction,
        }),
      });
      const data = await res.json();
      if (data.error) { setEvalError(data.error); } else { setEvalResult(data); }
    } catch { setEvalError("Network error. Please try again."); }
    finally { setEvaluating(false); }
  }

  function openPassage(p: Passage) {
    setSelectedPassage(p);
    setUserTranslation("");
    setEvalResult(null);
    setEvalError("");
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "lookup", label: "Word Lookup", icon: "🔍" },
    { id: "phrasal", label: "Phrasal Verbs", icon: "🔗" },
    { id: "idioms", label: "Idioms & Phrases", icon: "💬" },
    { id: "sentences", label: "Sentence Practice", icon: "📄" },
    { id: "passages", label: "Passages", icon: "📖" },
  ];

  const gradeColor = (g: string) => g === "A+" || g === "A" ? "#10b981" : g === "B" ? "#f59e0b" : g === "C" ? "#f97316" : "#ef4444";
  const scoreColor = (s: number) => s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : s >= 40 ? "#f97316" : "#ef4444";

  return (
    <div className="max-w-4xl fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🔄 English ↔ Bangla Translation</h1>
        <p style={{ color: "var(--muted)" }}>Words, phrases, idioms, sentences & AI-evaluated passage translation</p>
      </div>

      <div className="flex gap-2 mb-6 border-b flex-wrap" style={{ borderColor: "var(--border)" }}>
        {tabs.map((t) => (
          <button key={t.id} className="btn" onClick={() => { setTab(t.id); setFilter(""); }}
            style={{ borderRadius: "8px 8px 0 0", background: tab === t.id ? "var(--surface)" : "transparent", color: tab === t.id ? "white" : "var(--muted)", borderBottom: tab === t.id ? "2px solid #6366f1" : "2px solid transparent" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Word Lookup ── */}
      {tab === "lookup" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input type="text" placeholder="Enter English word, phrase, or sentence..." value={query}
              onChange={(e) => { setQuery(e.target.value); setResult(null); setNotFound(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()} />
            <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={handleLookup}>Translate</button>
          </div>
          {result && (
            <div className="card fade-in" style={{ borderColor: "#6366f1" }}>
              <div className="text-2xl font-bold text-white mb-2">{result.word}</div>
              <div className="text-3xl bangla font-bold mb-3" style={{ color: "#a5b4fc" }}>{result.bangla}</div>
              {result.note && <p className="text-sm" style={{ color: "var(--muted)" }}>{result.note}</p>}
            </div>
          )}
          {notFound && (
            <div className="card" style={{ borderColor: "var(--border)" }}>
              <p style={{ color: "var(--muted)" }}>No translation found for <strong style={{ color: "white" }}>"{query}"</strong>. Try checking the Vocabulary section.</p>
            </div>
          )}
          <div className="card">
            <h3 className="font-semibold text-white mb-3">Quick Reference — Common BCS Words</h3>
            <div className="grid grid-cols-2 gap-2">
              {vocabulary.slice(0, 12).map((w) => (
                <div key={w.id} className="flex justify-between items-center p-2 rounded-lg cursor-pointer" style={{ background: "var(--surface2)" }}
                  onClick={() => { setQuery(w.word); setResult({ word: w.word, bangla: w.bangla, note: w.definition }); setNotFound(false); }}>
                  <span className="text-white font-medium text-sm">{w.word}</span>
                  <span className="bangla text-sm" style={{ color: "#a5b4fc" }}>{w.bangla.split("/")[0].trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Phrasal Verbs ── */}
      {tab === "phrasal" && (
        <div>
          <input className="mb-4" placeholder="Filter phrasal verbs..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <div className="space-y-3">{filteredPhrsal.map((entry, i) => <TranslationCard key={i} entry={entry} />)}</div>
        </div>
      )}

      {/* ── Idioms ── */}
      {tab === "idioms" && (
        <div>
          <input className="mb-4" placeholder="Filter idioms and phrases..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <div className="space-y-3">{filteredIdioms.map((entry, i) => <TranslationCard key={i} entry={entry} />)}</div>
        </div>
      )}

      {/* ── Sentences ── */}
      {tab === "sentences" && (
        <div className="space-y-4">
          {sampleSentences.map((s, i) => (
            <div key={i} className="card">
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>{s.category}</div>
              <p className="text-white font-medium mb-2">{s.english}</p>
              <p className="bangla text-lg" style={{ color: "#a5b4fc" }}>{s.bangla}</p>
              {s.note && <div className="mt-2 text-xs p-2 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>💡 {s.note}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── Passages ── */}
      {tab === "passages" && !selectedPassage && (
        <div>
          {/* Filters */}
          <div className="card mb-5">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Direction</label>
                <div className="flex gap-2">
                  {(["all", "E2B", "B2E"] as const).map((d) => (
                    <button key={d} className={`btn ${pDirection === d ? "btn-primary" : "btn-secondary"}`} style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }} onClick={() => setPDirection(d)}>
                      {d === "all" ? "All" : d === "E2B" ? "EN→BN" : "BN→EN"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Difficulty</label>
                <select value={pDifficulty} onChange={(e) => setPDifficulty(e.target.value)}>
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Category</label>
                <select value={pCategory} onChange={(e) => setPCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  {passageCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Search</label>
                <input placeholder="Search passages..." value={pSearch} onChange={(e) => setPSearch(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>{filteredPassages.length} passages found</div>

          <div className="space-y-3">
            {filteredPassages.map((p) => (
              <div key={p.id} className="card cursor-pointer hover:border-indigo-500 transition-all" onClick={() => openPassage(p)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white text-sm">{p.title}</span>
                      <span className="badge" style={{ background: p.direction === "E2B" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.2)", color: p.direction === "E2B" ? "#a5b4fc" : "#6ee7b7", fontSize: "0.65rem" }}>
                        {p.direction === "E2B" ? "EN→BN" : "BN→EN"}
                      </span>
                      <span className={`badge badge-${p.difficulty}`}>{p.difficulty}</span>
                      <span className="badge" style={{ background: "var(--surface2)", color: "var(--muted)", fontSize: "0.65rem" }}>{p.category}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      {p.original.slice(0, 120)}{p.original.length > 120 ? "…" : ""}
                    </p>
                  </div>
                  <div className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>{p.source}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredPassages.length === 0 && (
            <div className="text-center py-16" style={{ color: "var(--muted)" }}>No passages match your filters.</div>
          )}
        </div>
      )}

      {/* ── Passage detail & evaluation ── */}
      {tab === "passages" && selectedPassage && (
        <div className="fade-in">
          <button className="btn btn-secondary mb-4" onClick={() => { setSelectedPassage(null); setEvalResult(null); }}>← Back to Passages</button>

          <div className="card mb-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-bold text-white">{selectedPassage.title}</span>
              <span className="badge" style={{ background: selectedPassage.direction === "E2B" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.2)", color: selectedPassage.direction === "E2B" ? "#a5b4fc" : "#6ee7b7", fontSize: "0.65rem" }}>
                {selectedPassage.direction === "E2B" ? "English → Bangla" : "Bangla → English"}
              </span>
              <span className={`badge badge-${selectedPassage.difficulty}`}>{selectedPassage.difficulty}</span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>— {selectedPassage.source}</span>
            </div>
            <div className={selectedPassage.direction === "B2E" ? "bangla leading-relaxed text-white" : "text-white leading-relaxed"} style={{ fontSize: selectedPassage.direction === "B2E" ? "1.05rem" : "1rem" }}>
              {selectedPassage.original}
            </div>
          </div>

          {!evalResult && (
            <div className="card mb-4">
              <label className="block text-sm font-semibold mb-2 text-white">
                {selectedPassage.direction === "E2B" ? "Write your Bangla translation below:" : "Write your English translation below:"}
              </label>
              <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder={selectedPassage.direction === "E2B" ? "এখানে বাংলা অনুবাদ লিখুন…" : "Write your English translation here…"}
                rows={6}
                className={selectedPassage.direction === "E2B" ? "bangla" : ""}
                style={{ resize: "vertical", fontSize: selectedPassage.direction === "E2B" ? "1.05rem" : "1rem", lineHeight: "1.8" }}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs" style={{ color: "var(--muted)" }}>{userTranslation.trim().split(/\s+/).filter(Boolean).length} words</span>
                <button
                  className="btn btn-primary"
                  onClick={submitEvaluation}
                  disabled={evaluating || userTranslation.trim().length < 10}
                  style={{ opacity: userTranslation.trim().length < 10 ? 0.5 : 1 }}
                >
                  {evaluating ? "⏳ Evaluating…" : "🤖 Submit for AI Evaluation"}
                </button>
              </div>
              {evalError && <p className="mt-2 text-sm" style={{ color: "#fca5a5" }}>❌ {evalError}</p>}
            </div>
          )}

          {evalResult && (
            <div className="fade-in space-y-4">
              {/* Score card */}
              <div className="card text-center" style={{ borderColor: scoreColor(evalResult.score) }}>
                <div className="text-6xl font-bold mb-1" style={{ color: scoreColor(evalResult.score) }}>{evalResult.score}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: gradeColor(evalResult.grade) }}>Grade: {evalResult.grade}</div>
                <div className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>{evalResult.accuracy}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{evalResult.feedback}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="card">
                  <h3 className="font-semibold text-green-400 mb-2">✅ Strengths</h3>
                  <ul className="space-y-1">
                    {evalResult.strengths.map((s, i) => (
                      <li key={i} className="text-sm" style={{ color: "var(--muted)" }}>• {s}</li>
                    ))}
                  </ul>
                </div>
                {/* Improvements */}
                <div className="card">
                  <h3 className="font-semibold text-yellow-400 mb-2">💡 Improvements</h3>
                  <ul className="space-y-1">
                    {evalResult.improvements.map((s, i) => (
                      <li key={i} className="text-sm" style={{ color: "var(--muted)" }}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Corrections */}
              {evalResult.corrections && evalResult.corrections.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-white mb-3">🔧 Corrections</h3>
                  <div className="space-y-3">
                    {evalResult.corrections.map((c, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: "var(--surface2)" }}>
                        <div className="text-sm mb-1">
                          <span style={{ color: "#fca5a5" }}>✗ {c.original}</span>
                          <span className="mx-2" style={{ color: "var(--muted)" }}>→</span>
                          <span style={{ color: "#6ee7b7" }}>✓ {c.corrected}</span>
                        </div>
                        <div className="text-xs" style={{ color: "var(--muted)" }}>{c.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Your translation */}
              <div className="card" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-white mb-2">Your Translation</h3>
                <p className={`text-sm leading-relaxed ${selectedPassage.direction === "E2B" ? "bangla" : ""}`} style={{ color: "var(--muted)" }}>{userTranslation}</p>
              </div>

              <div className="flex gap-3">
                <button className="btn btn-secondary flex-1" onClick={() => { setEvalResult(null); setUserTranslation(""); }}>Try Again</button>
                <button className="btn btn-primary flex-1" onClick={() => { setSelectedPassage(null); setEvalResult(null); setUserTranslation(""); }}>Next Passage</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TranslationCard({ entry }: { entry: TranslationEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card cursor-pointer hover:border-indigo-500 transition-all" onClick={() => setOpen((o) => !o)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-white font-semibold">{entry.english}</span>
          <span className={`badge badge-${entry.difficulty}`}>{entry.difficulty}</span>
          <span className="badge" style={{ background: "var(--surface2)", color: "var(--muted)", fontSize: "0.7rem" }}>{entry.category}</span>
        </div>
        <span className="bangla font-semibold" style={{ color: "#a5b4fc" }}>{entry.bangla}</span>
      </div>
      {open && <div className="mt-3 pt-3 text-sm fade-in" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>{entry.grammaticalNote}</div>}
    </div>
  );
}
