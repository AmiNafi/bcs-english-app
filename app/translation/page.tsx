"use client";
import { useState, useMemo, useEffect } from "react";
import { phrasalVerbs, idiomsAndPhrases, sampleSentences, linkingVerbs, TranslationEntry } from "@/data/translations";
import { passages, passageCategories, Passage } from "@/data/passages";

type Tab = "phrasal" | "idioms" | "linking" | "sentences" | "passages" | "weak";

type EvalResult = {
  score: number;
  grade: string;
  accuracy: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  corrections: { original: string; corrected: string; reason: string }[];
};

export type WeakItem = {
  id: string;
  passageTitle: string;
  direction: "E2B" | "B2E";
  original: string;
  corrected: string;
  reason: string;
  addedAt: number;
  relatedEntries: TranslationEntry[];
};

const WEAK_KEY = "bcs_weak_areas";

function loadWeak(): WeakItem[] {
  try { return JSON.parse(localStorage.getItem(WEAK_KEY) ?? "[]"); } catch { return []; }
}
function saveWeak(items: WeakItem[]) {
  localStorage.setItem(WEAK_KEY, JSON.stringify(items));
}

const allEntries = [...phrasalVerbs, ...idiomsAndPhrases, ...linkingVerbs];

function findRelated(text: string): TranslationEntry[] {
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return allEntries.filter((e) =>
    words.some((w) =>
      e.english.toLowerCase().includes(w) ||
      e.bangla.includes(w) ||
      e.grammaticalNote.toLowerCase().includes(w)
    )
  ).slice(0, 3);
}

const diffColor = (d: string) =>
  d === "easy" ? { bg: "rgba(16,185,129,0.15)", text: "#10b981" } :
  d === "medium" ? { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" } :
  { bg: "rgba(239,68,68,0.15)", text: "#ef4444" };

function EntryCard({ entry }: { entry: TranslationEntry }) {
  const [open, setOpen] = useState(false);
  const dc = diffColor(entry.difficulty);
  return (
    <div className="card fade-in" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-white">{entry.english}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: dc.bg, color: dc.text }}>{entry.difficulty}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface2)", color: "var(--muted)" }}>{entry.category}</span>
          </div>
          {!open && (
            <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>tap to reveal meaning →</div>
          )}
        </div>
        <span className="text-lg flex-shrink-0 mt-1" style={{ color: "var(--muted)" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="mt-3 pt-3 space-y-2 fade-in" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="bangla text-base font-semibold mb-2" style={{ color: "#a5b4fc" }}>{entry.bangla}</div>
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

function SentenceCard({ s }: { s: { english: string; bangla: string; note?: string; category: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>{s.category}</div>
          <p className="text-white font-medium">{s.english}</p>
          {!open && <div className="text-xs mt-2" style={{ color: "var(--muted)" }}>tap to reveal Bangla →</div>}
        </div>
        <span className="text-lg flex-shrink-0 mt-1" style={{ color: "var(--muted)" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="mt-3 pt-3 fade-in" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="bangla text-base" style={{ color: "#a5b4fc" }}>{s.bangla}</p>
          {s.note && <div className="mt-2 text-xs p-2 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>💡 {s.note}</div>}
        </div>
      )}
    </div>
  );
}

export default function TranslationPage() {
  const [tab, setTab] = useState<Tab>("passages");
  const [filter, setFilter] = useState("");
  const [weakItems, setWeakItems] = useState<WeakItem[]>([]);

  useEffect(() => { setWeakItems(loadWeak()); }, []);

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
      const data = await res.json() as EvalResult & { error?: string };
      if (data.error) {
        setEvalError(data.error);
      } else {
        setEvalResult(data);
        // Save mistakes to weak areas
        if (data.corrections?.length > 0) {
          const existing = loadWeak();
          const newItems: WeakItem[] = data.corrections.map((c, i) => ({
            id: `${Date.now()}-${i}`,
            passageTitle: selectedPassage.title,
            direction: selectedPassage.direction,
            original: c.original,
            corrected: c.corrected,
            reason: c.reason,
            addedAt: Date.now(),
            relatedEntries: findRelated(c.original + " " + c.corrected),
          }));
          const merged = [...newItems, ...existing].slice(0, 50);
          saveWeak(merged);
          setWeakItems(merged);
        }
      }
    } catch { setEvalError("Network error. Please try again."); }
    finally { setEvaluating(false); }
  }

  function openPassage(p: Passage) { setSelectedPassage(p); setUserTranslation(""); setEvalResult(null); setEvalError(""); }

  function removeWeak(id: string) {
    const updated = weakItems.filter((w) => w.id !== id);
    saveWeak(updated);
    setWeakItems(updated);
  }

  function clearWeak() {
    saveWeak([]);
    setWeakItems([]);
  }

  const gradeColor = (g: string) => g === "A+" || g === "A" ? "#10b981" : g === "B" ? "#f59e0b" : g === "C" ? "#f97316" : "#ef4444";
  const scoreColor = (s: number) => s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : s >= 40 ? "#f97316" : "#ef4444";

  const tabs: { id: Tab; label: string; icon: string; count?: number; badge?: boolean }[] = [
    { id: "passages",  label: "Passages",          icon: "📖", count: passages.length },
    { id: "phrasal",   label: "Phrasal Verbs",    icon: "🔗", count: phrasalVerbs.length },
    { id: "idioms",    label: "Idioms & Phrases", icon: "💬", count: idiomsAndPhrases.length },
    { id: "linking",   label: "Links & Connectors", icon: "🔤", count: linkingVerbs.length },
    { id: "sentences", label: "Sentences",         icon: "📄", count: sampleSentences.length },
    { id: "weak",      label: "Weak Areas",        icon: "⚠️", count: weakItems.length, badge: weakItems.length > 0 },
  ];

  return (
    <div className="max-w-4xl fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white mb-1">🔄 English ↔ Bangla Translation</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Words, phrases, idioms, sentences & AI-evaluated passage translation</p>
      </div>

      {/* ── Card-based tab selector ── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setFilter(""); }}
            className="card text-center p-3 relative"
            style={{
              cursor: "pointer",
              border: tab === t.id ? "2px solid" : "1px solid var(--border)",
              borderColor: tab === t.id ? (t.id === "weak" ? "#ef4444" : "#6366f1") : "var(--border)",
              background: tab === t.id ? (t.id === "weak" ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.12)") : "var(--surface)",
              transition: "all 0.15s",
            }}
          >
            <div className="text-xl mb-1">{t.icon}</div>
            <div className="text-xs font-semibold leading-tight" style={{ color: tab === t.id ? (t.id === "weak" ? "#fca5a5" : "#a5b4fc") : "var(--muted)" }}>
              {t.label}
            </div>
            {t.count !== undefined && (
              <div className="text-xs mt-1 font-bold" style={{ color: t.id === "weak" && t.count > 0 ? "#ef4444" : tab === t.id ? "#6366f1" : "var(--border)" }}>
                {t.count}
              </div>
            )}
            {t.badge && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
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
              <strong className="text-white">Linking verbs</strong> connect the subject to a descriptive adjective/noun (e.g. <em>seem, become, feel</em>). <strong>Connectors</strong> join clauses and ideas — coordinating conjunctions (FANBOYS), subordinating conjunctions, correlatives, and transitional words. All are essential for BCS writing.
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
          {sampleSentences.map((s, i) => <SentenceCard key={i} s={s} />)}
        </div>
      )}

      {/* ── Weak Areas ── */}
      {tab === "weak" && (
        <div>
          {weakItems.length === 0 ? (
            <div className="card text-center py-16">
              <div className="text-4xl mb-3">🎉</div>
              <div className="font-semibold text-white mb-2">No weak areas recorded yet</div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Practice passage translations in the Passages tab. When the AI finds mistakes, they&apos;ll appear here automatically.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-white">{weakItems.length} mistake{weakItems.length !== 1 ? "s" : ""} recorded</h2>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>From your translation practice — review these to improve</p>
                </div>
                <button className="btn btn-secondary text-xs" onClick={clearWeak}>Clear All</button>
              </div>

              <div className="space-y-4">
                {weakItems.map((item) => (
                  <div key={item.id} className="card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>
                          {item.direction === "E2B" ? "EN→BN" : "BN→EN"}
                        </span>
                        <span className="text-xs" style={{ color: "var(--muted)" }}>from: {item.passageTitle}</span>
                      </div>
                      <button onClick={() => removeWeak(item.id)} className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>✕ dismiss</button>
                    </div>

                    {/* Correction */}
                    <div className="p-3 rounded-lg mb-3" style={{ background: "var(--surface2)" }}>
                      <div className="flex flex-col gap-1 text-sm mb-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 font-semibold" style={{ color: "#fca5a5" }}>✗ You wrote:</span>
                          <span style={{ color: "#fca5a5" }}>{item.original}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 font-semibold" style={{ color: "#6ee7b7" }}>✓ Should be:</span>
                          <span style={{ color: "#6ee7b7" }}>{item.corrected}</span>
                        </div>
                      </div>
                      <div className="text-xs pt-2" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
                        💡 {item.reason}
                      </div>
                    </div>

                    {/* Related phrases/verbs to study */}
                    {item.relatedEntries.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#f59e0b" }}>
                          📚 Related to study
                        </div>
                        <div className="space-y-2">
                          {item.relatedEntries.map((e, i) => <EntryCard key={i} entry={e} />)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
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
              <div key={p.id} className="card cursor-pointer" style={{ transition: "border-color 0.15s" }} onClick={() => openPassage(p)}>
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
        <div className="fade-in space-y-3 w-full">

          {/* Back + meta */}
          <button className="btn btn-secondary" onClick={() => { setSelectedPassage(null); setEvalResult(null); }}>← Back</button>

          <div className="card w-full">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge" style={{ background: selectedPassage.direction === "E2B" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.2)", color: selectedPassage.direction === "E2B" ? "#a5b4fc" : "#6ee7b7" }}>
                {selectedPassage.direction === "E2B" ? "English → Bangla" : "Bangla → English"}
              </span>
              <span className={`badge badge-${selectedPassage.difficulty}`}>{selectedPassage.difficulty}</span>
            </div>
            <p className="font-bold text-white text-sm mb-3">{selectedPassage.title}</p>
            <p className={`text-sm leading-relaxed text-white ${selectedPassage.direction === "B2E" ? "bangla" : ""}`}>
              {selectedPassage.original}
            </p>
          </div>

          {/* Input */}
          {!evalResult && (
            <div className="card w-full">
              <label className="block text-sm font-semibold mb-2 text-white">
                {selectedPassage.direction === "E2B" ? "✍️ Your Bangla translation:" : "✍️ Your English translation:"}
              </label>
              <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder={selectedPassage.direction === "E2B" ? "এখানে বাংলা অনুবাদ লিখুন…" : "Write your English translation here…"}
                rows={6}
                className={selectedPassage.direction === "E2B" ? "bangla" : ""}
                style={{ resize: "vertical", lineHeight: "1.8" }}
              />
              <div className="text-xs mt-2 mb-3" style={{ color: "var(--muted)" }}>
                {userTranslation.trim().split(/\s+/).filter(Boolean).length} words written
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={submitEvaluation}
                disabled={evaluating || userTranslation.trim().length < 10}
                style={{ opacity: userTranslation.trim().length < 10 ? 0.5 : 1 }}
              >
                {evaluating ? "⏳ Evaluating your translation…" : "🤖 Submit for AI Evaluation"}
              </button>
              {evalError && <p className="mt-3 text-sm" style={{ color: "#fca5a5" }}>❌ {evalError}</p>}
            </div>
          )}

          {/* Results */}
          {evalResult && (
            <div className="space-y-3 w-full">

              {/* Score card */}
              <div className="card w-full text-center" style={{ borderColor: scoreColor(evalResult.score) }}>
                <div className="text-5xl font-bold mb-1" style={{ color: scoreColor(evalResult.score) }}>{evalResult.score}<span className="text-2xl">/100</span></div>
                <div className="text-lg font-bold mb-2" style={{ color: gradeColor(evalResult.grade) }}>Grade {evalResult.grade} · {evalResult.accuracy}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{evalResult.feedback}</p>
                {evalResult.corrections?.length > 0 && (
                  <div className="mt-3 text-xs p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
                    ⚠️ {evalResult.corrections.length} mistake{evalResult.corrections.length !== 1 ? "s" : ""} saved to Weak Areas tab
                  </div>
                )}
              </div>

              {/* Strengths */}
              <div className="card w-full">
                <h3 className="font-semibold mb-2" style={{ color: "#10b981" }}>✅ Strengths</h3>
                <ul className="space-y-2">
                  {evalResult.strengths.map((s, i) => (
                    <li key={i} className="text-sm p-2 rounded-lg" style={{ background: "var(--surface2)", color: "var(--muted)" }}>• {s}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="card w-full">
                <h3 className="font-semibold mb-2" style={{ color: "#f59e0b" }}>💡 Improvements</h3>
                <ul className="space-y-2">
                  {evalResult.improvements.map((s, i) => (
                    <li key={i} className="text-sm p-2 rounded-lg" style={{ background: "var(--surface2)", color: "var(--muted)" }}>• {s}</li>
                  ))}
                </ul>
              </div>

              {/* Corrections */}
              {evalResult.corrections?.length > 0 && (
                <div className="card w-full">
                  <h3 className="font-semibold text-white mb-3">🔧 Corrections</h3>
                  <div className="space-y-3">
                    {evalResult.corrections.map((c, i) => (
                      <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                        <div className="p-2 text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
                          ✗ You wrote: {c.original}
                        </div>
                        <div className="p-2 text-sm" style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7" }}>
                          ✓ Should be: {c.corrected}
                        </div>
                        <div className="p-2 text-xs" style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                          💡 {c.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Your translation recap */}
              <div className="card w-full">
                <h3 className="font-semibold text-white mb-2 text-sm">Your Translation</h3>
                <p className={`text-sm leading-relaxed ${selectedPassage.direction === "E2B" ? "bangla" : ""}`} style={{ color: "var(--muted)" }}>
                  {userTranslation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn btn-secondary w-full" onClick={() => { setEvalResult(null); setUserTranslation(""); }}>↩ Try Again</button>
                <button className="btn btn-primary w-full" onClick={() => { setSelectedPassage(null); setEvalResult(null); setUserTranslation(""); }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
