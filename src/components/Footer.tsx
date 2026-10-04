import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                C
              </span>
              <span className="text-lg font-extrabold text-slate-900">{SITE.name}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Free online image compressor. Shrink images to any exact size — 100% in your
              browser, no uploads, no signup.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Compress</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-jpeg/">Compress JPEG</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-png/">Compress PNG</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-webp/">Compress WebP</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-gif/">Compress GIF</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-svg/">Compress SVG</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">More tools</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-600 hover:text-blue-600" href="/compress-pdf/">Compress PDF</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/resize-image/">Resize Image</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/reduce-image-size-in-kb/">Reduce Image Size</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/jpg-to-webp/">JPG to WebP</Link></li>
              <li><Link className="text-slate-600 hover:text-blue-600" href="/gif-to-jpg/">GIF to JPG</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy/" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-blue-600">Terms</Link>
            <Link href="/contact/" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
