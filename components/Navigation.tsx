"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", icon: "🏠", label: "Dashboard" },
  { href: "/vocabulary", icon: "📚", label: "Vocabulary" },
  { href: "/translation", icon: "🔄", label: "Translation" },
  { href: "/writing", icon: "✍️", label: "Free Writing" },
  { href: "/quiz", icon: "📝", label: "Mock Test" },
];

export default function Navigation() {
  const path = usePathname();

  return (
    <nav
      className="fixed left-0 top-0 h-full w-64 flex flex-col"
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            B
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">BCS English</div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>Master</div>
          </div>
        </div>
      </div>

      <div className="px-3 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-3" style={{ color: "var(--muted)" }}>
          Modules
        </div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link mb-1 ${path === link.href ? "active" : ""}`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 m-3 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <div className="text-xs font-semibold text-indigo-300 mb-1">BCS Tip</div>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Practice 10 new words daily. Consistency beats intensity!
        </div>
      </div>
    </nav>
  );
}
