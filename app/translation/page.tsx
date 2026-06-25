"use client";
import { useState, useMemo } from "react";
import { phrasalVerbs, idiomsAndPhrases, sampleSentences, linkingVerbs, TranslationEntry } from "@/data/translations";
import { passages, passageCategories, Passage } from "@/data/passages";

type Tab = "phrasal" | "idioms" | "linking" | "sentences" | "passages";

type EvalResult = {
  score: number;
  grade: string;
  accuracy: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  corrections: { original: string; corrected: string; reason: string }[];
};

const diffColor = (d: string) =>
  d === "easy" ? { bg: "rgba(16,185,129,0.15)", text: "#10b981" } :
  d === "medium" ? { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" } :
  { bg: "rgba(239,68,68,0.15)", text: "#ef4444" };

function EntryCard({ entry }: { entry: TranslationEntry }) {
  const [open, setOpen] = useState(false);
  const dc = diffColor(entry.difficulty);
  return (
    <div
      className="card fade-in"
      style={{ cursor: "pointer", transition: "border-color 0.15s" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-white">{entry.english}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: dc.bg, color: dc.text }}>
              {entry.difficulty}
            </span>
          </div>
          <div className="bangla text-base font-semibold" style={{ color: "#a5b4fc" }}>{entry.bangla}</div>
        </div>
        <span className="text-lg flex-shrink-0 mt-1" style={{ color: "var(--muted)" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="mt-3 pt-3 space-y-2 fade-in" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-start gap-2 text-sm p-2 rounded-lg" style={{ background: "var(--surface2)" }}>
            <span style={{ color: "#6366f1", flexShrink: 0 }}>📌</span>
            <span style={{ color: "var(--muted)" }}>{entry.grammaticalNote}</span>
          </div>
          <div className="flex items-start gap-2 text-sm p-2 rounded-lg" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <span style={{ color: "#f59e0b", flexShrink: 0 }}>💬</span>
            <span className="italic" style={{ color: "#e2e8f0" }}>{entry.example}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TranslationPage() {
  const [tab, setTab] = useState<Tab>("phrasal");
  const [filter, setFilter] = useState("");

  const [pDirection, setPDirection] = useState<"all" | "E2B" | "B2E">("all");
  const [pCategory, setPCategory] = useState("all");
  const [pDifficulty, setPDifficulty] = useState("all");
  const [pSearch, setPSearch] = useState("");
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [userTranslation, setUserTranslation] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<EvalResult | null>(null);
  const [evalError, setEvalError] = useState("");

  const filteredPhrasal = phrasalVerbs.filter((p) =>
    filter === "" || p.english.toLowerCase().includes(filter.toLowerCase()) || p.bangla.includes(filter)
  );
  const filteredIdioms = idiomsAndPhrases.filter((p) =>
    filter === "" || p.english.toLowerCase().includes(filter.toLowerCase()) || p.bangla.includes(filter)
  );
  const filteredLinking = linkingVerbs.filter((p) =>
    filter === "" || p.english.toLowerCase().includes(filter.toLowerCase()) || p.bangla.includes(filter)
  );

  const filteredPassages = useMemo(() => passages.filter((p) => {
    if (pDirection !== "all" && p.direction !== pDirection) return false;
    if (pCategory !== "all" && p.category !== pCategory) return false;
    if (pDifficulty !== "all" && p.difficulty !== pDifficulty) return false;
    if (pSearch && !p.title.toLowerCase().includes(pSearch.toLowerCase()) && !p.original.toLowerCase().includes(pSearch.toLowerCase())) return false;
    return true;
  }), [pDirection, pCategory, pDifficulty, pSearch]);

  async function submitEvaluation() {
    if (!selectedPassage || !userTranslation.trim()) return;
    setEvaluating(true); setEvalResult(null); setEvalError("");
    try {
      const res = await fetch("/api/evaluate-translation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original: selectedPassage.original, userTranslation: userTranslation.trim(), reference: selectedPassage.reference || "", direction: selectedPassage.direction }),
      });
      const data = await res.json();
      if (data.error) setEvalError(data.error); else setEvalResult(data);
    } catch { setEvalError("Network error. Please try again."); }
    finally { setEvaluating(false); }
  }

  function openPassage(p: Passage) { setSelectedPassage(p); setUserTranslation(""); setEvalResult(null); setEvalError(""); }

  const gradeColor = (g: string) => g === "A+" || g === "A" ? "#10b981" : g === "B" ? "#f59e0b" : g === "C" ? "#f97316" : "#ef4444";
  const scoreColor = (s: number) => s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : s >= 40 ? "#f97316" : "#ef4444";

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: "phrasal",   label: "Phrasal Verbs",    icon: "🔗", count: phrasalVerbs.length },
    { id: "idioms",    label: "Idioms & Phrases", icon: "💬", count: idiomsAndPhrases.length },
    { id: "linking",   label: "Linking Verbs",    icon: "🔤", count: linkingVerbs.length },
    { id: "sentences", label: "Sentences",         icon: "📄", count: sampleSentences.length },
    { id: "passages",  label: "Passages",          icon: "📖", count: passages.length },
  ];

  return (
    <div className="max-w-4xl fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white mb-1">🔄 English ↔ Bangla Translation</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Words, phrases, idioms, sentences & AI-evaluated passage translation</p>
      </div>

      {/* ── Card-based tab selector ── */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setFilter(""); }}
            className="card text-center p-3"
            style={{
              cursor: "pointer",
              border: tab === t.id ? "2px solid #6366f1" : "1px solid var(--border)",
              background: tab === t.id ? "rgba(99,102,241,0.12)" : "var(--surface)",
              transition: "all 0.15s",
            }}
          >
            <div className="text-xl mb-1">{t.icon}</div>
            <div className="text-xs font-semibold leading-tight" style={{ color: tab === t.id ? "#a5b4fc" : "var(--muted)" }}>
              {t.label}
            </div>
            {t.count !== undefined && (
              <div className="text-xs mt-1 font-bold" style={{ color: tab === t.id ? "#6366f1" : "var(--border)" }}>
                {t.count}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Phrasal Verbs ── */}
      {tab === "phrasal" && (
        <div>
          <input className="mb-4" placeholder="Filter phrasal verbs..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>Tap any card to see grammar note & example sentence.</p>
          <div className="space-y-2">{filteredPhrasal.map((e, i) => <EntryCard key={i} entry={e} />)}</div>
        </div>
      )}

      {/* ── Idioms ── */}
      {tab === "idioms" && (
        <div>
          <input className="mb-4" placeholder="Filter idioms and phrases..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>Tap any card to see grammar note & example sentence.</p>
          <div className="space-y-2">{filteredIdioms.map((e, i) => <EntryCard key={i} entry={e} />)}</div>
        </div>
      )}

      {/* ── Linking Verbs ── */}
      {tab === "linking" && (
        <div>
          <div className="card mb-4" style={{ background: "rgba(99,102,241,0.08)", borderColor: "#6366f1" }}>
            <p className="text-sm" style={{ color: "#a5b4fc" }}>
              <strong className="text-white">Linking verbs</strong> connect the subject to a descriptive word. They do <em>not</em> show action. Always use an <strong>adjective</strong> (not adverb) after them — e.g. &quot;She feels <u>happy</u>&quot; not &quot;happily&quot;.
            </p>
          </div>
          <input className="mb-4" placeholder="Filter linking verbs..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>Tap any card to see grammar note & example sentence.</p>
          <div className="space-y-2">{filteredLinking.map((e, i) => <EntryCard key={i} entry={e} />)}</div>
        </div>
      )}

      {/* ── Sentences ── */}
      {tab === "sentences" && (
        <div className="space-y-3">
          {sampleSentences.map((s, i) => (
            <div key={i} className="card">
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>{s.category}</div>
              <p className="text-white font-medium mb-2">{s.english}</p>
              <p className="bangla text-base" style={{ color: "#a5b4fc" }}>{s.bangla}</p>
              {s.note && <div className="mt-2 text-xs p-2 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>💡 {s.note}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── Passages list ── */}
      {tab === "passages" && !selectedPassage && (
        <div>
          <div className="card mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Direction</label>
                <div className="flex gap-2">
                  {(["all", "E2B", "B2E"] as const).map((d) => (
                    <button key={d} className={`btn ${pDirection === d ? "btn-primary" : "btn-secondary"}`}
                      style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }} onClick={() => setPDirection(d)}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>{filteredPassages.length} passages found</div>

          <div className="space-y-2">
            {filteredPassages.map((p) => (
              <div key={p.id} className="card cursor-pointer" style={{ transition: "border-color 0.15s" }}
                onClick={() => openPassage(p)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white text-sm">{p.title}</span>
                      <span className="badge" style={{ background: p.direction === "E2B" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.2)", color: p.direction === "E2B" ? "#a5b4fc" : "#6ee7b7", fontSize: "0.65rem" }}>
                        {p.direction === "E2B" ? "EN→BN" : "BN→EN"}
                      </span>
                      <span className={`badge badge-${p.difficulty}`}>{p.difficulty}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      {p.original.slice(0, 100)}{p.original.length > 100 ? "…" : ""}
                    </p>
                  </div>
                  <span className="text-sm flex-shrink-0" style={{ color: "var(--muted)" }}>→</span>
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
          <button className="btn btn-secondary mb-4" onClick={() => { setSelectedPassage(null); setEvalResult(null); }}>← Back</button>

          <div className="card mb-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-bold text-white">{selectedPassage.title}</span>
              <span className="badge" style={{ background: selectedPassage.direction === "E2B" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.2)", color: selectedPassage.direction === "E2B" ? "#a5b4fc" : "#6ee7b7", fontSize: "0.65rem" }}>
                {selectedPassage.direction === "E2B" ? "English → Bangla" : "Bangla → English"}
              </span>
              <span className={`badge badge-${selectedPassage.difficulty}`}>{selectedPassage.difficulty}</span>
            </div>
            <div className={selectedPassage.direction === "B2E" ? "bangla leading-relaxed text-white" : "text-white leading-relaxed"}>
              {selectedPassage.original}
            </div>
          </div>

          {!evalResult && (
            <div className="card mb-4">
              <label className="block text-sm font-semibold mb-2 text-white">
                {selectedPassage.direction === "E2B" ? "Write your Bangla translation:" : "Write your English translation:"}
              </label>
              <textarea value={userTranslation} onChange={(e) => setUserTranslation(e.target.value)}
                placeholder={selectedPassage.direction === "E2B" ? "এখানে বাংলা অনুবাদ লিখুন…" : "Write your English translation here…"}
                rows={6} className={selectedPassage.direction === "E2B" ? "bangla" : ""}
                style={{ resize: "vertical", fontSize: selectedPassage.direction === "E2B" ? "1.05rem" : "1rem", lineHeight: "1.8" }} />
              <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                <span className="text-xs" style={{ color: "var(--muted)" }}>{userTranslation.trim().split(/\s+/).filter(Boolean).length} words</span>
                <button className="btn btn-primary" onClick={submitEvaluation}
                  disabled={evaluating || userTranslation.trim().length < 10}
                  style={{ opacity: userTranslation.trim().length < 10 ? 0.5 : 1 }}>
                  {evaluating ? "⏳ Evaluating…" : "🤖 Submit for AI Evaluation"}
                </button>
              </div>
              {evalError && <p className="mt-2 text-sm" style={{ color: "#fca5a5" }}>❌ {evalError}</p>}
            </div>
          )}

          {evalResult && (
            <div className="fade-in space-y-4">
              <div className="card text-center" style={{ borderColor: scoreColor(evalResult.score) }}>
                <div className="text-5xl font-bold mb-1" style={{ color: scoreColor(evalResult.score) }}>{evalResult.score}</div>
                <div className="text-xl font-bold mb-1" style={{ color: gradeColor(evalResult.grade) }}>Grade: {evalResult.grade}</div>
                <div className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>{evalResult.accuracy}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{evalResult.feedback}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="font-semibold text-green-400 mb-2">✅ Strengths</h3>
                  <ul className="space-y-1">{evalResult.strengths.map((s, i) => <li key={i} className="text-sm" style={{ color: "var(--muted)" }}>• {s}</li>)}</ul>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-yellow-400 mb-2">💡 Improvements</h3>
                  <ul className="space-y-1">{evalResult.improvements.map((s, i) => <li key={i} className="text-sm" style={{ color: "var(--muted)" }}>• {s}</li>)}</ul>
                </div>
              </div>

              {evalResult.corrections?.length > 0 && (
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

              <div className="card">
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
