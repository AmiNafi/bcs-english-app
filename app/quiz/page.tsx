"use client";
import { useState, useEffect, useCallback } from "react";
import { quizQuestions } from "@/data/quiz-questions";

type State = "idle" | "running" | "finished";

export default function QuizPage() {
  const [state, setState] = useState<State>("idle");
  const [questions, setQuestions] = useState(quizQuestions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timedMode, setTimedMode] = useState(true);
  const [filter, setFilter] = useState<"all" | "synonym" | "antonym" | "meaning" | "bangla" | "fill-blank">("all");
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");

  const current = questions[index];
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  const prepareQuiz = useCallback(() => {
    let q = [...quizQuestions];
    if (filter !== "all") q = q.filter((x) => x.type === filter);
    if (difficulty !== "all") q = q.filter((x) => x.difficulty === difficulty);
    q.sort(() => Math.random() - 0.5);
    setQuestions(q.slice(0, 15));
    setAnswers([]);
    setIndex(0);
    setSelected(null);
    setTimeLeft(30);
    setState("running");
  }, [filter, difficulty]);

  useEffect(() => {
    if (state !== "running" || !timedMode || selected !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  });

  function handleAnswer(opt: number) {
    if (selected !== null) return;
    setSelected(opt);
    const newAnswers = [...answers];
    newAnswers[index] = opt;
    setAnswers(newAnswers);
  }

  function next() {
    if (index + 1 >= questions.length) {
      setState("finished");
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(30);
    }
  }

  const pct = Math.round((score / questions.length) * 100);
  const grade = pct >= 80 ? "A+" : pct >= 70 ? "A" : pct >= 60 ? "B" : pct >= 50 ? "C" : "F";
  const gradeColor = pct >= 70 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";

  if (state === "idle") {
    return (
      <div className="max-w-2xl fade-in">
        <h1 className="text-3xl font-bold text-white mb-1">📝 BCS Mock Test</h1>
        <p className="mb-8" style={{ color: "var(--muted)" }}>BCS-style English MCQ — synonyms, antonyms, meanings, Bangla translation & fill-in-the-blank</p>

        <div className="card mb-5">
          <h2 className="font-semibold text-white mb-4">Configure Your Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>Question Type</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
                <option value="all">All Types</option>
                <option value="synonym">Synonyms</option>
                <option value="antonym">Antonyms</option>
                <option value="meaning">Word Meanings</option>
                <option value="bangla">Bangla Translation</option>
                <option value="fill-blank">Fill in the Blank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}>
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--muted)" }}>
              <input
                type="checkbox"
                checked={timedMode}
                onChange={(e) => setTimedMode(e.target.checked)}
                className="w-4 h-4"
                style={{ width: 16, height: 16, accentColor: "#6366f1" }}
              />
              Timed mode (30 seconds per question)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Questions", value: "30", color: "#6366f1" },
            { label: "Per Session", value: "15", color: "#8b5cf6" },
            { label: "Time per Q", value: timedMode ? "30s" : "∞", color: "#06b6d4" },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary w-full text-base py-3" onClick={prepareQuiz}>
          Start Test →
        </button>
      </div>
    );
  }

  if (state === "finished") {
    return (
      <div className="max-w-2xl fade-in">
        <div className="card text-center mb-6" style={{ borderColor: gradeColor }}>
          <div className="text-7xl font-bold mb-2" style={{ color: gradeColor }}>{grade}</div>
          <div className="text-3xl font-bold text-white mb-2">{score} / {questions.length}</div>
          <div className="text-xl mb-1" style={{ color: gradeColor }}>{pct}%</div>
          <p style={{ color: "var(--muted)" }}>
            {pct >= 80 ? "Excellent! BCS-ready performance." : pct >= 60 ? "Good effort! Keep practicing." : "Keep studying — you'll get there!"}
          </p>
        </div>

        <div className="card mb-6">
          <h2 className="font-semibold text-white mb-4">Answer Review</h2>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAns = answers[i] ?? -1;
              const correct = userAns === q.correct;
              return (
                <div key={q.id} className="p-3 rounded-lg" style={{ background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${correct ? "#10b981" : "#ef4444"}33` }}>
                  <div className="flex items-start gap-2 mb-2">
                    <span>{correct ? "✅" : "❌"}</span>
                    <p className="text-sm text-white">{q.question}</p>
                  </div>
                  {!correct && (
                    <div className="text-xs ml-6 space-y-1">
                      {userAns !== -1 && (
                        <div style={{ color: "#fca5a5" }}>Your answer: {q.options[userAns]}</div>
                      )}
                      {userAns === -1 && <div style={{ color: "#fca5a5" }}>Time out!</div>}
                      <div style={{ color: "#6ee7b7" }}>Correct: {q.options[q.correct]}</div>
                    </div>
                  )}
                  <p className="text-xs mt-2 ml-6 italic" style={{ color: "var(--muted)" }}>{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-primary flex-1" onClick={prepareQuiz}>Retry Test</button>
          <button className="btn btn-secondary flex-1" onClick={() => setState("idle")}>Change Settings</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--muted)" }}>
            Question {index + 1} of {questions.length}
          </div>
          <div className="w-48 h-2 rounded-full mt-1" style={{ background: "var(--surface2)" }}>
            <div className="h-2 rounded-full" style={{ background: "#6366f1", width: `${((index) / questions.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Score: <span className="text-white font-semibold">{score}</span>
          </div>
          {timedMode && (
            <div
              className="text-2xl font-bold w-12 text-center"
              style={{ color: timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#f59e0b" : "#10b981" }}
            >
              {timeLeft}
            </div>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className={`badge badge-${current.difficulty}`}>{current.difficulty}</span>
          <span className="badge" style={{ background: "var(--surface2)", color: "var(--muted)", fontSize: "0.7rem" }}>
            {current.type.replace("-", " ")}
          </span>
        </div>
        <p className="text-xl text-white font-medium leading-relaxed">{current.question}</p>
      </div>

      <div className="space-y-3 mb-4">
        {current.options.map((opt, i) => {
          let bg = "var(--surface)";
          let border = "var(--border)";
          let textColor = "var(--text)";

          if (selected !== null) {
            if (i === current.correct) { bg = "rgba(16,185,129,0.15)"; border = "#10b981"; textColor = "#6ee7b7"; }
            else if (i === selected && selected !== current.correct) { bg = "rgba(239,68,68,0.15)"; border = "#ef4444"; textColor = "#fca5a5"; }
          } else if (selected === null) {
            // hover handled by CSS
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className="w-full text-left p-4 rounded-xl transition-all font-medium"
              style={{ background: bg, border: `1px solid ${border}`, color: textColor, cursor: selected !== null ? "default" : "pointer" }}
            >
              <span className="font-bold mr-3 opacity-60">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="card mb-4 fade-in" style={{ borderColor: "#6366f1" }}>
          <div className="text-sm font-semibold mb-1" style={{ color: "#a5b4fc" }}>Explanation</div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{current.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button className="btn btn-primary w-full py-3 text-base" onClick={next}>
          {index + 1 >= questions.length ? "See Results →" : "Next Question →"}
        </button>
      )}
    </div>
  );
}
