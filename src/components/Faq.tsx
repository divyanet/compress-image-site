"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";
import { RichText } from "@/components/RichText";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqs.map((f, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-[15px] font-semibold text-slate-900">{f.q}</span>
            <span className={`shrink-0 text-lg text-slate-400 transition-transform ${open === i ? "rotate-45" : ""}`} aria-hidden="true">
              +
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
              <RichText text={f.a} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
