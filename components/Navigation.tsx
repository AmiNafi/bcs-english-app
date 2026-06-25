"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", icon: "🏠", label: "Dashboard" },
  { href: "/vocabulary", icon: "📚", label: "Vocabulary" },
  { href: "/translation", icon: "🔄", label: "Translation" },
  { href: "/writing", icon: "✍️", label: "Free Writing" },
  { href: "/quiz", icon: "📝", label: "Mock Test" },
];

export default function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`nav-link mb-1 ${path === link.href ? "active" : ""}`}
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            B
          </div>
          <span className="font-bold text-white text-sm">BCS English</span>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="btn btn-secondary"
          style={{ padding: "0.4rem 0.7rem", fontSize: "1.1rem" }}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className="md:hidden fixed top-0 left-0 h-full z-50 flex flex-col w-64 transition-transform duration-200"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="p-5 pb-3 mt-14">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--muted)" }}>
            Modules
          </div>
          <NavLinks />
        </div>
        <div className="p-4 m-3 mt-auto rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="text-xs font-semibold text-indigo-300 mb-1">BCS Tip</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Practice 10 new words daily. Consistency beats intensity!
          </div>
        </div>
      </div>

      {/* ── Desktop sidebar ── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col"
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
          <NavLinks />
        </div>

        <div className="p-4 m-3 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="text-xs font-semibold text-indigo-300 mb-1">BCS Tip</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Practice 10 new words daily. Consistency beats intensity!
          </div>
        </div>
      </nav>
    </>
  );
}
