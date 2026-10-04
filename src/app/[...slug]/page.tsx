import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_MAP, PAGES, type PageDef } from "@/lib/slugs";
import { contentFor } from "@/lib/content";
import { SITE, siteUrl } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CompressTool } from "@/components/CompressTool";
import { ResizeTool } from "@/components/ResizeTool";
import { ConverterTool } from "@/components/ConverterTool";
import { PdfTool } from "@/components/PdfTool";
import { RichText } from "@/components/RichText";
import type { ImageFormat } from "@/lib/image";

export const dynamic = "force-static";

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug.split("/") }));
}

function getPage(slugParts: string[]): PageDef | undefined {
  return PAGE_MAP[slugParts.join("/")];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const c = contentFor(page);
  const url = siteUrl(`/${page.slug}/`);
  return {
    title: c.h1,
    description: c.intro,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: c.h1,
      description: c.intro,
    },
    robots: { index: true, follow: true },
  };
}

const RESIZE_PRESETS: Record<string, { label: string; w?: number; h?: number }> = {
  "resize-image-to-3.5cmX4.5cm": { label: "3.5cm × 4.5cm (passport photo, 300 DPI)", w: 413, h: 531 },
  "resize-image-to-3x4": { label: "3×4 ratio", w: 900, h: 1200 },
  "resize-image-to-600x600-pixel": { label: "600 × 600 pixels", w: 600, h: 600 },
  "resize-image-to-2x2": { label: "2 × 2 inch (600 × 600 px at 300 DPI)", w: 600, h: 600 },
  "resize-image-to-4x6": { label: "4 × 6 inch (1200 × 1800 px at 300 DPI)", w: 1200, h: 1800 },
};

const CONV_TO: Record<string, ImageFormat> = {
  JPG: "jpeg",
  WebP: "webp",
  PNG: "png",
};

function ToolWidget({ page }: { page: PageDef }) {
  const resizeNext = [
    { label: "Compress image", href: "/compress-image/" },
    { label: "JPG to WebP", href: "/jpg-to-webp/" },
  ];
  switch (page.kind) {
    case "size":
    case "reduce":
    case "hub": {
      const next =
        page.format === "svg"
          ? [{ label: "Resize image", href: "/resize-image/" }]
          : [
              { label: "Resize image", href: "/resize-image/" },
              { label: "JPG to WebP", href: "/jpg-to-webp/" },
            ];
      return (
        <CompressTool
          format={page.format}
          targetKb={page.targetKb}
          pageName={page.name}
          sample={{ url: "/samples/sample-1.jpg", name: "sample-photo.jpg" }}
          nextTools={next}
        />
      );
    }
    case "resize": {
      const preset = RESIZE_PRESETS[page.slug];
      return (
        <ResizeTool
          pageName={page.name}
          presetLabel={preset?.label}
          presetW={preset?.w}
          presetH={preset?.h}
          nextTools={resizeNext}
        />
      );
    }
    case "converter": {
      const m = page.name.match(/^(.*) to (.*)$/);
      const from = m ? m[1] : "Image";
      const toLabel = m ? m[2] : "JPG";
      const toFormat = CONV_TO[toLabel] ?? "jpeg";
      return (
        <ConverterTool
          fromLabel={from}
          toFormat={toFormat}
          toLabel={toLabel}
          nextTools={[
            { label: "Compress image", href: "/compress-image/" },
            { label: "Resize image", href: "/resize-image/" },
          ]}
        />
      );
    }
    case "pdf":
      return (
        <PdfTool
          targetKb={page.targetKb}
          nextTools={[{ label: "Resize image", href: "/resize-image/" }]}
        />
      );
    default:
      return <CompressTool format={page.format} targetKb={page.targetKb} pageName={page.name} />;
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  const c = contentFor(page);
  const url = siteUrl(`/${page.slug}/`);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[\[(.*?)\|/g, "").replace(/\]\]/g, "") },
    })),
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.h1,
    url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.category, item: siteUrl(`/${page.slug.split("/")[0]}/`) },
      { "@type": "ListItem", position: 3, name: c.h1, item: url },
    ],
  };

  return (
    <div>
      <div className="dot-grid border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="pt-5">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: page.category, href: `/${page.slug.split("/")[0]}/` },
                { label: c.h1 },
              ]}
            />
          </div>

          {/* Tool-first hero */}
          <section className="pb-10 pt-6 text-center">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              {c.h1}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">{c.intro}</p>
            <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-4 text-left shadow-xl shadow-blue-600/5 md:p-6">
              <ToolWidget page={page} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {["100% free", "No signup", "Private — no uploads"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200"
                >
                  <svg className="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdSlot slot="tool-mid" />

        {/* Content body */}
        <div className="space-y-12 py-10">
          <section>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{c.freeTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.freeBody}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{c.whyTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.whyBody}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.cards.map((card, i) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white ${
                      ["bg-blue-600", "bg-violet-600", "bg-emerald-600", "bg-amber-600", "bg-rose-600", "bg-cyan-600"][i % 6]
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    <RichText text={card.body} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <AdSlot slot="tool-content" />

          <section>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{c.howTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.howIntro}</p>
            <ol className="mt-6 space-y-3">
              {c.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FaqSection faqs={c.faqs} />
            </div>
          </section>
        </div>
      </div>

      <JsonLd data={webAppJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
    </div>
  );
}
