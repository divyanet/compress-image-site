import Link from "next/link";
import { SITE } from "@/lib/site";

const COMPRESS_COL = [
  { label: "Compress JPEG", href: "/compress-jpeg/" },
  { label: "Compress PNG", href: "/compress-png/" },
  { label: "Compress WebP", href: "/compress-webp/" },
  { label: "Compress GIF", href: "/compress-gif/" },
  { label: "Compress SVG", href: "/compress-svg/" },
  { label: "Compress Image", href: "/compress-image/" },
];

const POPULAR_COL = [
  { label: "JPEG to 20KB", href: "/compress-jpeg-to-20kb/" },
  { label: "JPEG to 100KB", href: "/compress-jpeg-to-100kb/" },
  { label: "PNG to 100KB", href: "/compress-png-to-100kb/" },
  { label: "WebP to 100KB", href: "/compress-webp-to-100kb/" },
  { label: "PDF to 100KB", href: "/compress-pdf/100kb/" },
  { label: "Resize Image", href: "/resize-image/" },
];

const MORE_COL = [
  { label: "Compress PDF", href: "/compress-pdf/" },
  { label: "Reduce Image Size", href: "/reduce-image-size-in-kb/" },
  { label: "JPG to WebP", href: "/jpg-to-webp/" },
  { label: "HEIC to JPG", href: "/heic-to-jpg/" },
  { label: "AVIF to JPG", href: "/avif-to-jpg/" },
  { label: "All tools", href: "/#tools" },
];

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="text-slate-600 transition-colors hover:text-blue-600" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h11M4 8l3-3M4 8l3 3M20 16H9m11 0l-3-3m3 3l-3 3" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Compress<span className="text-blue-400">Image</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Free online image compressor. Compress images to any exact KB size — 100% in
              your browser, no uploads, no signup.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["100% free", "No signup", "No watermark", "Private by design"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-white/10"
                >
                  <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Col title="Compress" links={COMPRESS_COL} />
          <Col title="Popular" links={POPULAR_COL} />
          <Col title="More tools" links={MORE_COL} />
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy/" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms/" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/contact/" className="transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
