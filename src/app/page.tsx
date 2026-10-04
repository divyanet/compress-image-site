import Link from "next/link";
import { CompressTool } from "@/components/CompressTool";
import { StarRating } from "@/components/StarRating";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE, siteUrl } from "@/lib/site";
import { PAGES } from "@/lib/slugs";

const HUBS = [
  { href: "/compress-jpeg/", label: "Compress JPEG", desc: "Shrink JPG photos to any exact KB size" },
  { href: "/compress-png/", label: "Compress PNG", desc: "Smaller PNGs with transparency kept" },
  { href: "/compress-webp/", label: "Compress WebP", desc: "Modern format, tiny files" },
  { href: "/compress-gif/", label: "Compress GIF", desc: "Lighter GIFs, animation kept" },
  { href: "/compress-svg/", label: "Compress SVG", desc: "Lossless vector optimization" },
  { href: "/compress-image/", label: "Compress Image", desc: "Any image, any size" },
];

const POPULAR = [
  "/compress-jpeg-to-20kb/",
  "/compress-jpeg-to-50kb/",
  "/compress-jpeg-to-100kb/",
  "/compress-png-to-100kb/",
  "/compress-webp-to-100kb/",
  "/compress-image-to-20kb/",
  "/compress-pdf/100kb/",
  "/resize-image/",
];

function popularPages() {
  return POPULAR.map((href) => PAGES.find((p) => `/${p.slug}/` === href)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
}

export default function Home() {
  const popular = popularPages();
  return (
    <div>
      {/* Hero with tool */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 text-center md:pt-14">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Compress Images Online — Free
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
            Shrink JPG, PNG, WebP, GIF and SVG to any exact KB size. 100% free, no
            signup — your files never leave your browser.
          </p>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm md:p-6">
            <CompressTool format={null} targetKb={null} pageName="Compress Image" />
          </div>
          <div className="mt-4">
            <StarRating />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            {["100% free", "No signup", "No watermark", "Private — no uploads"].map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AdSlot slot="home-top" />

      {/* Format hubs */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
          Compress by format
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
          Pick your format — every hub offers exact KB targets from 1KB to 500KB.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUBS.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-base font-bold text-slate-900 group-hover:text-blue-700">{h.label}</div>
              <div className="mt-1 text-sm text-slate-600">{h.desc}</div>
              <div className="mt-3 text-sm font-semibold text-blue-600">Open tool →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
            Popular tools
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {popular.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}/`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
          Why compress with {SITE.name}?
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Exact KB targets", d: "Not 'roughly smaller' — hit 20KB, 100KB or any size you need, and see the real result." },
            { t: "Private by design", d: "Everything runs in your browser. Your images are never uploaded to any server." },
            { t: "Honest results", d: "We show true output sizes. If a target can't be reached cleanly, we tell you — never fake it." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-[15px] font-bold text-slate-900">{c.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <FaqSection
            faqs={[
              { q: "Is this image compressor really free?", a: "Yes — completely free, no signup, no watermarks. Compress as many images as you like." },
              { q: "Are my images uploaded to a server?", a: "No. All compression happens locally in your browser using your device. Nothing is uploaded, stored or seen by anyone." },
              { q: "What image formats are supported?", a: "JPG/JPEG, PNG, WebP, GIF, SVG and BMP inputs. PDF compression is available too." },
              { q: "Will the compressed image hit my exact KB target?", a: "The engine works toward your exact target and shows the real output size. If a target genuinely can't be reached without wrecking quality, it tells you honestly instead of faking the number." },
            ]}
          />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: siteUrl("/"),
          description: "Free online image compressor — shrink images to any exact KB size in your browser.",
        }}
      />
    </div>
  );
}
