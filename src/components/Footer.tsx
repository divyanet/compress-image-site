import Link from "next/link";
import { Logo } from "./Header";
import { SITE } from "@/lib/site";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Compress",
    links: [
      { label: "Compress Image", href: "/compress-image/" },
      { label: "Compress JPEG", href: "/compress-jpeg/" },
      { label: "Compress PNG", href: "/compress-png/" },
      { label: "Compress WebP", href: "/compress-webp/" },
      { label: "Compress GIF", href: "/compress-gif/" },
      { label: "Compress SVG", href: "/compress-svg/" },
    ],
  },
  {
    title: "Resize & Convert",
    links: [
      { label: "Resize Image", href: "/resize-image/" },
      { label: "Reduce Image Size", href: "/reduce-image-size-in-kb/" },
      { label: "JPG to WebP", href: "/jpg-to-webp/" },
      { label: "HEIC to JPG", href: "/heic-to-jpg/" },
      { label: "AVIF to JPG", href: "/avif-to-jpg/" },
      { label: "All tools", href: "/#tools" },
    ],
  },
  {
    title: "Popular",
    links: [
      { label: "JPEG to 20KB", href: "/compress-jpeg-to-20kb/" },
      { label: "JPEG to 100KB", href: "/compress-jpeg-to-100kb/" },
      { label: "PNG to 100KB", href: "/compress-png-to-100kb/" },
      { label: "WebP to 100KB", href: "/compress-webp-to-100kb/" },
      { label: "PDF to 100KB", href: "/compress-pdf/100kb/" },
      { label: "Compress PDF", href: "/compress-pdf/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact/" },
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms of Use", href: "/terms/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e5e5ea] bg-[#fafafb]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Free online image tools for everyone. Compress images to any exact
              KB size — 100% in your browser, no uploads, no signup.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#383e45]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-500 transition-colors hover:text-[#e5322d]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#e5e5ea] pt-6 text-[13px] text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy/" className="transition-colors hover:text-[#e5322d]">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="transition-colors hover:text-[#e5322d]">
              Terms
            </Link>
            <Link href="/contact/" className="transition-colors hover:text-[#e5322d]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
