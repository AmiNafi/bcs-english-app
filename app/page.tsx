import Link from "next/link";
import { vocabulary } from "@/data/vocabulary";

const modules = [
  {
    href: "/vocabulary",
    icon: "📚",
    title: "Vocabulary",
    description: "175+ BCS-level words with Bangla meanings, synonyms, antonyms, mnemonics & examples",
    stat: `${vocabulary.length} words`,
    color: "#6366f1",
  },
  {
    href: "/translation",
    icon: "🔄",
    title: "Translation",
    description: "English → Bangla: phrasal verbs, idioms, proverbs & formal sentence translations",
    stat: "50+ entries",
    color: "#8b5cf6",
  },
  {
    href: "/writing",
    icon: "✍️",
    title: "Free Writing",
    description: "Practice handwriting on canvas — trace words, write sentences, clear & retry",
    stat: "Canvas tool",
    color: "#06b6d4",
  },
  {
    href: "/quiz",
    icon: "📝",
    title: "Mock Test",
    description: "BCS-style MCQ: synonyms, antonyms, meanings, Bangla translation & fill-in-the-blank",
    stat: "30 questions",
    color: "#f59e0b",
  },
];

const tips = [
  "Learn 10 new vocabulary words daily with Bangla meanings.",
  "Phrasal verbs and idioms frequently appear in BCS written exams.",
  "Practice translating editorial paragraphs — it sharpens both grammar and vocabulary.",
];

export default function HomePage() {
  const easy = vocabulary.filter((w) => w.difficulty === "easy").length;
  const medium = vocabulary.filter((w) => w.difficulty === "medium").length;
  const hard = vocabulary.filter((w) => w.difficulty === "hard").length;

  return (
    <div className="max-w-5xl fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">
          BCS English <span style={{ color: "#a5b4fc" }}>Master</span>
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-lg">
          Your complete English preparation toolkit for Bangladesh Civil Service exam
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total Words", value: vocabulary.length, color: "#6366f1" },
          { label: "Easy", value: easy, color: "#10b981" },
          { label: "Medium", value: medium, color: "#f59e0b" },
          { label: "Hard", value: hard, color: "#ef4444" },
          { label: "Idioms & Phrases", value: "20+", color: "#8b5cf6" },
          { label: "Quiz Questions", value: "30", color: "#06b6d4" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="card block hover:border-indigo-500 transition-all hover:translate-y-[-2px]"
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${m.color}22` }}
              >
                {m.icon}
              </div>
              <div>
                <div className="font-bold text-white mb-1 text-lg">{m.title}</div>
                <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                  {m.description}
                </p>
                <span className="badge" style={{ background: `${m.color}22`, color: m.color }}>
                  {m.stat}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <h2 className="font-bold text-white mb-4 text-lg">💡 BCS English Strategy Tips</h2>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-3 items-start text-sm" style={{ color: "var(--muted)" }}>
              <span className="text-indigo-400 font-bold mt-0.5">{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
