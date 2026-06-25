"use client";
import { useState, useMemo } from "react";
import { vocabulary, categories, VocabularyWord } from "@/data/vocabulary";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [selected, setSelected] = useState<VocabularyWord | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"grid" | "flashcard">("grid");
  const [fcIndex, setFcIndex] = useState(0);

  const filtered = useMemo(() => {
    return vocabulary.filter((w) => {
      const matchSearch =
        search === "" ||
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        w.bangla.includes(search) ||
        w.definition.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || w.category === category;
      const matchDiff = difficulty === "All" || w.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  const flashcards = useMemo(() => (mode === "flashcard" ? filtered : []), [filtered, mode]);
  const currentCard = flashcards[fcIndex] ?? null;

  function nextCard() {
    setFlipped(false);
    setFcIndex((i) => (i + 1) % flashcards.length);
  }
  function prevCard() {
    setFlipped(false);
    setFcIndex((i) => (i - 1 + flashcards.length) % flashcards.length);
  }

  return (
    <div className="max-w-6xl fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">📚 Vocabulary</h1>
          <p style={{ color: "var(--muted)" }}>
            {filtered.length} words — BCS-level English vocabulary with Bangla meanings
          </p>
        </div>
        <div className="flex gap-2">
          <button className={`btn ${mode === "grid" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("grid")}>
            Grid
          </button>
          <button className={`btn ${mode === "flashcard" ? "btn-primary" : "btn-secondary"}`} onClick={() => { setMode("flashcard"); setFcIndex(0); setFlipped(false); }}>
            Flashcards
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search words, meanings, definitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
          style={{ maxWidth: 320 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: 160 }}>
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ width: 140 }}>
          <option value="All">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {mode === "flashcard" && currentCard && (
        <div className="mb-8">
          <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>
            Card {fcIndex + 1} / {flashcards.length}
          </div>
          <div
            className="card cursor-pointer select-none"
            style={{ minHeight: 260, cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setFlipped((f) => !f)}
          >
            {!flipped ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <div className="text-4xl font-bold text-white mb-3">{currentCard.word}</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>{currentCard.pronunciation}</div>
                <div className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                  <span className="badge badge-{currentCard.difficulty}">{currentCard.partOfSpeech}</span>
                </div>
                <div className="mt-6 text-xs" style={{ color: "var(--muted)" }}>Click to reveal meaning →</div>
              </div>
            ) : (
              <div className="py-4">
                <div className="text-2xl font-bold text-white mb-1">{currentCard.word}</div>
                <div className="text-2xl font-semibold bangla mb-3" style={{ color: "#a5b4fc" }}>
                  {currentCard.bangla}
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{currentCard.definition}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-green-400 mb-1">Synonyms</div>
                    <div style={{ color: "var(--muted)" }}>{currentCard.synonyms.slice(0, 3).join(", ")}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-400 mb-1">Antonyms</div>
                    <div style={{ color: "var(--muted)" }}>{currentCard.antonyms.slice(0, 3).join(", ")}</div>
                  </div>
                </div>
                <div className="mt-3 p-3 rounded-lg text-sm italic" style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                  "{currentCard.example}"
                </div>
                {currentCard.mnemonic && (
                  <div className="mt-3 text-sm" style={{ color: "#fcd34d" }}>
                    💡 {currentCard.mnemonic}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <button className="btn btn-secondary flex-1" onClick={prevCard}>← Previous</button>
            <button className="btn btn-primary flex-1" onClick={nextCard}>Next →</button>
          </div>
        </div>
      )}

      {mode === "grid" && (
        <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {filtered.map((word) => (
            <div
              key={word.id}
              className="card cursor-pointer hover:border-indigo-500 transition-all"
              onClick={() => setSelected(selected?.id === word.id ? null : word)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xl font-bold text-white">{word.word}</span>
                  <span className="ml-2 text-sm" style={{ color: "var(--muted)" }}>{word.pronunciation}</span>
                </div>
                <span className={`badge badge-${word.difficulty}`}>{word.difficulty}</span>
              </div>
              <div className="bangla text-lg font-semibold mb-2" style={{ color: "#a5b4fc" }}>
                {word.bangla}
              </div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                <span className="font-medium" style={{ color: "#94a3b8" }}>{word.partOfSpeech}</span>
                {" · "}
                {word.definition.length > 70 ? word.definition.slice(0, 70) + "…" : word.definition}
              </div>

              {selected?.id === word.id && (
                <div className="mt-4 pt-4 fade-in" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>{word.definition}</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-xs font-semibold text-green-400 mb-1">SYNONYMS</div>
                      <div className="flex flex-wrap gap-1">
                        {word.synonyms.map((s) => (
                          <span key={s} className="badge" style={{ background: "#064e3b", color: "#6ee7b7", fontSize: "0.7rem" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-red-400 mb-1">ANTONYMS</div>
                      <div className="flex flex-wrap gap-1">
                        {word.antonyms.map((a) => (
                          <span key={a} className="badge" style={{ background: "#7f1d1d", color: "#fca5a5", fontSize: "0.7rem" }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-sm italic" style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                    "{word.example}"
                  </div>
                  {word.mnemonic && (
                    <div className="mt-2 text-sm" style={{ color: "#fcd34d" }}>
                      💡 Memory trick: {word.mnemonic}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20" style={{ color: "var(--muted)" }}>
          No words match your search. Try different filters.
        </div>
      )}
    </div>
  );
}
