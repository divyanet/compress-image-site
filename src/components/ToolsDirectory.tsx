"use client";

import Link from "next/link";
import { useState } from "react";
import { PAGES, type PageDef } from "@/lib/slugs";

type Tab = "all" | "compress" | "resize" | "convert" | "pdf";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All tools" },
  { id: "compress", label: "Compress" },
  { id: "resize", label: "Resize" },
  { id: "convert", label: "Convert" },
  { id: "pdf", label: "PDF" },
];

const byKb = (a: PageDef, b: PageDef) =>
  (a.targetKb ?? 0) - (b.targetKb ?? 0) || (a.slug < b.slug ? -1 : 1);

const sizesOf = (fmt: PageDef["format"]) =>
  PAGES.filter((p) => p.kind === "size" && p.format === fmt).sort(byKb);

const sizesForHub = (hubSlug: string) =>
  PAGES.filter((p) => p.kind === "size" && p.slug.startsWith(`${hubSlug}-to-`)).length;

const FORMAT_LABELS: Record<string, string> = {
  jpeg: "JPEG / JPG",
  png: "PNG",
  webp: "WebP",
  gif: "GIF",
  svg: "SVG",
};

/* ---------- icons ---------- */

function Icon({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const ICONS = {
  compress: "M4 8h11M4 8l3-3M4 8l3 3M20 16H9m11 0l-3-3m3 3l-3 3",
  resize: "M4 9V5.5A1.5 1.5 0 015.5 4H9m11 5v3.5a1.5 1.5 0 01-1.5 1.5H15M4 15v3.5A1.5 1.5 0 005.5 20H9m11-5v-3.5a1.5 1.5 0 00-1.5-1.5H15",
  convert: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4",
  pdf: "M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 0v5h5",
  image: "M4 16l4.5-4.5a1.5 1.5 0 012 0L16 17m-2-2l1.5-1.5a1.5 1.5 0 012 0L20 16M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
};

const TILE: Record<string, string> = {
  compress: "bg-blue-100 text-blue-600",
  resize: "bg-violet-100 text-violet-600",
  convert: "bg-amber-100 text-amber-600",
  pdf: "bg-red-100 text-red-600",
  image: "bg-emerald-100 text-emerald-600",
};

/* ---------- pieces ---------- */

function ToolCard({
  href,
  title,
  desc,
  icon,
  tint,
  badge,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
  tint: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${TILE[tint]}`}>
        <Icon d={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-bold text-slate-900">{title}</span>
          {badge && (
            <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-1 block text-[13px] leading-snug text-slate-500">{desc}</span>
        <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-blue-600">
          Open tool
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function SizeAccordion({ label, pages, defaultOpen = false }: { label: string; pages: PageDef[]; defaultOpen?: boolean }) {
  if (pages.length === 0) return null;
  return (
    <details className="tool-group rounded-2xl border border-slate-200 bg-white" open={defaultOpen || undefined}>
      <summary className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="flex items-center gap-3">
          <span className="text-[15px] font-bold text-slate-900">{label}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
            {pages.length}
          </span>
        </span>
        <svg className="chev h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-4 sm:grid-cols-3 lg:grid-cols-4">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}/`}
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center text-[13px] font-medium leading-snug text-slate-600 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </details>
  );
}

/* ---------- main ---------- */

const HUB_DESC: Record<string, string> = {
  "compress-image": "Any image, any exact KB size",
  "compress-jpeg": "Compress JPG photos, keep them sharp",
  "compress-jpg": "Same as JPEG — smaller JPG files",
  "compress-png": "Smaller PNGs, transparency kept",
  "compress-webp": "Modern format, tiny files",
  "compress-gif": "Lighter GIFs, animation kept",
  "compress-svg": "Lossless vector optimization",
};

const CONV_DESC: Record<string, string> = {
  "jpg-to-webp": "Modern tiny WebP output",
  "avif-to-jpg": "Universal JPG from AVIF",
  "heic-to-jpg": "iPhone photos to JPG",
  "bmp-to-jpg": "Heavy BMPs to light JPG",
  "tiff-to-jpg": "Scans and TIFFs to JPG",
  "gif-to-jpg": "Still frame as JPG",
};

export function ToolsDirectory() {
  const [tab, setTab] = useState<Tab>("all");

  const hubs = PAGES.filter((p) => p.kind === "hub");
  const converters = PAGES.filter((p) => p.kind === "converter");
  const resizePages = PAGES.filter((p) => p.kind === "resize");
  const reducePages = PAGES.filter((p) => p.kind === "reduce").sort(byKb);
  const pdfPages = PAGES.filter((p) => p.kind === "pdf").sort(byKb);
  const pdfHub = pdfPages.find((p) => p.slug === "compress-pdf");
  const pdfSizes = pdfPages.filter((p) => p.slug !== "compress-pdf");

  const show = (t: Tab) => tab === "all" || tab === t;

  return (
    <div>
      {/* Tabs — iLoveIMG pattern */}
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Tool categories">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              tab === t.id
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {show("compress") && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((p) => (
              <ToolCard
                key={p.slug}
                href={`/${p.slug}/`}
                title={p.name}
                desc={HUB_DESC[p.slug] ?? "Exact KB targets, free"}
                icon={ICONS.compress}
                tint="compress"
                badge={`${sizesForHub(p.slug)} sizes`}
              />
            ))}
          </div>
        )}

        {show("compress") && (
          <div className="space-y-3">
            {(["jpeg", "png", "webp", "gif", "svg"] as const).map((f, i) => (
              <SizeAccordion key={f} label={`${FORMAT_LABELS[f]} sizes`} pages={sizesOf(f)} defaultOpen={tab === "compress" && i === 0} />
            ))}
            <SizeAccordion label="Any image sizes" pages={sizesOf(null)} />
          </div>
        )}

        {show("resize") && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resizePages.map((p) => (
                <ToolCard
                  key={p.slug}
                  href={`/${p.slug}/`}
                  title={p.name}
                  desc="Precise dimensions, kept sharp"
                  icon={ICONS.resize}
                  tint="resize"
                />
              ))}
            </div>
            <SizeAccordion label="Reduce image size" pages={reducePages} defaultOpen={tab === "resize"} />
          </>
        )}

        {show("convert") && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {converters.map((p) => (
              <ToolCard
                key={p.slug}
                href={`/${p.slug}/`}
                title={p.name}
                desc={CONV_DESC[p.slug] ?? "Fast format conversion"}
                icon={ICONS.convert}
                tint="convert"
              />
            ))}
          </div>
        )}

        {show("pdf") && (
          <>
            {pdfHub && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ToolCard
                  href={`/${pdfHub.slug}/`}
                  title={pdfHub.name}
                  desc="Compress PDFs to a target size"
                  icon={ICONS.pdf}
                  tint="pdf"
                  badge={`${pdfSizes.length} sizes`}
                />
              </div>
            )}
            <SizeAccordion label="Compress PDF sizes" pages={pdfSizes} defaultOpen={tab === "pdf"} />
          </>
        )}
      </div>
    </div>
  );
}
