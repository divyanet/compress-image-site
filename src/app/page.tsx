import { ToolsDirectory } from "@/components/ToolsDirectory";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE, siteUrl } from "@/lib/site";

const WHY = [
  {
    t: "Exact KB targets",
    d: "Not “roughly smaller” — hit 20KB, 100KB or any size you pick, and see the real result down to the byte.",
    icon: "M4 8h11M4 8l3-3M4 8l3 3M20 16H9m11 0l-3-3m3 3l-3 3",
  },
  {
    t: "Private by design",
    d: "Everything runs on your device. Your images are never uploaded, stored or seen by anyone — period.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    t: "Honest results",
    d: "We show true output sizes. If a target genuinely can't be reached without wrecking quality, we tell you — never fake it.",
    icon: "M4.5 12.75l6 6 9-13.5",
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
      {/* HERO — iLovePDF style */}
      <section className="mx-auto max-w-4xl px-4 pb-10 pt-12 text-center sm:px-6 md:pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#383e45] sm:text-5xl">
          Every tool you need to compress images in one place
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
          Every tool you need to work with images, at your fingertips. All are 100% FREE and
          easy to use! Compress, resize, convert and optimize your images with just a few clicks.
        </p>
      </section>

      {/* ALL TOOLS */}
      <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6">
        <ToolsDirectory />
      </section>

      <AdSlot slot="home-top" />

      {/* WHY */}
      <section className="border-y border-[#e5e5ea] bg-[#fafafb]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#383e45]">
            Why compress with {SITE.name}?
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHY.map((c) => (
              <div key={c.t} className="tool-card rounded-xl border border-[#e5e5ea] bg-white p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center text-[#e5322d]">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#383e45]">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">{c.d}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.t} className="flex items-start gap-4 rounded-xl border border-[#e5e5ea] bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5322d] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#383e45]">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#383e45]">
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
