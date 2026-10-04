"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "JPEG", href: "/compress-jpeg/" },
  { label: "PNG", href: "/compress-png/" },
  { label: "WebP", href: "/compress-webp/" },
  { label: "GIF", href: "/compress-gif/" },
  { label: "SVG", href: "/compress-svg/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
            C
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            {SITE.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Formats">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 md:hidden" aria-label="Formats mobile">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Compress {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
