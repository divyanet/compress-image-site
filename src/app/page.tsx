import { CompressTool } from "@/components/CompressTool";
import { ToolsDirectory } from "@/components/ToolsDirectory";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE, siteUrl } from "@/lib/site";

const TRUST = [
  {
    label: "100% free",
    d: "M4.5 12.75l6 6 9-13.5",
  },
  {
    label: "No signup",
    d: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm4.125-9.75a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z",
  },
  {
    label: "Private — no uploads",
    d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    label: "No watermark",
    d: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
];

const STATS = [
  { value: "353", label: "free tools" },
  { value: "1KB–500KB", label: "exact size targets" },
  { value: "100%", label: "in your browser" },
  { value: "$0", label: "forever, no catch" },
];

const WHY = [
  {
    t: "Exact KB targets",
    d: "Not “roughly smaller” — hit 20KB, 100KB or any size you pick, and see the real result down to the byte.",
    icon: "M4 8h11M4 8l3-3M4 8l3 3M20 16H9m11 0l-3-3m3 3l-3 3",
    tint: "bg-blue-100 text-blue-600",
  },
  {
    t: "Private by design",
    d: "Everything runs on your device. Your images are never uploaded, stored or seen by anyone — period.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    tint: "bg-green-100 text-green-600",
  },
  {
    t: "Honest results",
    d: "We show true output sizes. If a target genuinely can't be reached without wrecking quality, we tell you — never fake it.",
    icon: "M4.5 12.75l6 6 9-13.5",
    tint: "bg-amber-100 text-amber-600",
  },
];

const STEPS = [
  { t: "Drop your image", d: "Drag & drop, click to browse, or try a sample — JPG, PNG, WebP, GIF, SVG and PDF." },
  { t: "Pick your target", d: "Choose an exact KB size or drag the quality slider. The engine does the rest locally." },
  { t: "Download", d: "Get your compressed file instantly with the true size shown. No signup, no watermark." },
];

export default function Home() {
  return (
    <div>
      {/* HERO — the dropzone IS the hero */}
      <section id="tool" className="dot-grid border-b border-slate-100 bg-gradient-to-b from-blue-50/80 via-white to-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-12 text-center sm:px-6 md:pt-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/25">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            100% free · No signup
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Compress Images to Any <span className="text-blue-600">Exact Size</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Compress JPG, PNG, WebP, GIF, SVG and PDF to the exact KB you need.
            Everything runs in your browser — your files never leave your device.
          </p>
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-4 text-left shadow-xl shadow-blue-600/5 md:p-6">
            <CompressTool
              format={null}
              targetKb={null}
              pageName="Compress Image"
              sample={{ url: "/samples/sample-1.jpg", name: "sample-photo.jpg" }}
              nextTools={[
                { label: "Resize image", href: "/resize-image/" },
                { label: "JPG to WebP", href: "/jpg-to-webp/" },
              ]}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {TRUST.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200"
              >
                <svg className="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.d} />
                </svg>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS band */}
      <section className="border-b border-slate-100 bg-slate-950">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black tracking-tight text-white">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot="home-top" />

      {/* ALL TOOLS directory */}
      <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-20">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Tool directory</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Every tool you&apos;ll ever need
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            353 free tools across compression, resizing, conversion and PDF —
            pick a category or search your exact size below.
          </p>
        </div>
        <div className="mt-10">
          <ToolsDirectory />
        </div>
      </section>

      {/* WHY */}
      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900">
            Why compress with {SITE.name}?
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHY.map((c) => (
              <div key={c.t} className="rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.t} className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FaqSection
            faqs={[
              { q: "Is this image compressor really free?", a: "Yes — completely free, no signup, no watermarks. Compress as many images as you like." },
              { q: "Are my images uploaded to a server?", a: "No. All compression happens locally in your browser using your device. Nothing is uploaded, stored or seen by anyone." },
              { q: "What image formats are supported?", a: "JPG/JPEG, PNG, WebP, GIF, SVG and BMP inputs. PDF compression is available too." },
              { q: "Will the compressed image hit my exact KB target?", a: "The engine works toward your exact target and shows the real output size. If a target genuinely can't be reached without wrecking quality, it tells you honestly instead of faking the number." },
              { q: "Is there a file size limit?", a: "You can drop files up to 25MB. Everything is processed on your own device, so there are no queues or daily caps." },
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
