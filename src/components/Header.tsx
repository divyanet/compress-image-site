"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const COMPRESS_LINKS: NavLink[] = [
  { label: "Compress Image", href: "/compress-image/" },
  { label: "Compress JPEG", href: "/compress-jpeg/" },
  { label: "Compress PNG", href: "/compress-png/" },
  { label: "Compress WebP", href: "/compress-webp/" },
  { label: "Compress GIF", href: "/compress-gif/" },
  { label: "Compress SVG", href: "/compress-svg/" },
];

const CONVERT_LINKS: NavLink[] = [
  { label: "JPG to WebP", href: "/jpg-to-webp/" },
  { label: "AVIF to JPG", href: "/avif-to-jpg/" },
  { label: "HEIC to JPG", href: "/heic-to-jpg/" },
  { label: "BMP to JPG", href: "/bmp-to-jpg/" },
  { label: "TIFF to JPG", href: "/tiff-to-jpg/" },
  { label: "GIF to JPG", href: "/gif-to-jpg/" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-2" aria-label="CompressImage home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5322d] text-white">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h11M4 8l3-3M4 8l3 3M20 16H9m11 0l-3-3m3 3l-3 3" />
        </svg>
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-[#383e45]"}`}>
        Compress<span className="text-[#e5322d]">Image</span>
      </span>
    </span>
  );
}

function Chevron() {
  return (
    <svg className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const NAV_ITEM =
  "rounded-md px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-[#383e45] transition-colors hover:text-[#e5322d]";

function Dropdown({ label, href, links }: { label: string; href: string; links: NavLink[] }) {
  return (
    <div className="group relative">
      <Link href={href} className={`inline-flex items-center gap-1 ${NAV_ITEM}`}>
        {label}
        <Chevron />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-60 rounded-xl border border-[#e5e5ea] bg-white p-2 shadow-xl shadow-black/10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#383e45] transition-colors hover:bg-red-50 hover:text-[#e5322d]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e5ea] bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Dropdown label="Compress" href="/compress-image/" links={COMPRESS_LINKS} />
          <Link href="/resize-image/" className={NAV_ITEM}>
            Resize
          </Link>
          <Dropdown label="Convert" href="/jpg-to-webp/" links={CONVERT_LINKS} />
          <Link href="/compress-pdf/" className={NAV_ITEM}>
            PDF
          </Link>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 rounded-lg bg-[#e5322d] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#c82823]"
          >
            All tools
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-[#383e45] hover:bg-gray-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-[#e5e5ea] bg-white px-4 py-3 lg:hidden" aria-label="Mobile">
          {[
            { title: "Compress", links: COMPRESS_LINKS },
            { title: "Convert", links: CONVERT_LINKS },
            {
              title: "More",
              links: [
                { label: "Resize Image", href: "/resize-image/" },
                { label: "Compress PDF", href: "/compress-pdf/" },
                { label: "All tools", href: "/#tools" },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {section.title}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {section.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#383e45] hover:bg-gray-100"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
