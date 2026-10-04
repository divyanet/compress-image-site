import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_MAP, PAGES, type PageDef } from "@/lib/slugs";
import { contentFor } from "@/lib/content";
import { SITE, siteUrl } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StarRating } from "@/components/StarRating";
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
  switch (page.kind) {
    case "size":
    case "reduce":
    case "hub":
      return <CompressTool format={page.format} targetKb={page.targetKb} pageName={page.name} />;
    case "resize": {
      const preset = RESIZE_PRESETS[page.slug];
      return <ResizeTool pageName={page.name} presetLabel={preset?.label} presetW={preset?.w} presetH={preset?.h} />;
    }
    case "converter": {
      const m = page.name.match(/^(.*) to (.*)$/);
      const from = m ? m[1] : "Image";
      const toLabel = m ? m[2] : "JPG";
      const toFormat = CONV_TO[toLabel] ?? "jpeg";
      return <ConverterTool fromLabel={from} toFormat={toFormat} toLabel={toLabel} />;
    }
    case "pdf":
      return <PdfTool targetKb={page.targetKb} />;
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
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2400" },
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
    <div className="mx-auto max-w-3xl px-4">
      <div className="pt-6">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: page.category, href: `/${page.slug.split("/")[0]}/` },
            { label: c.h1 },
          ]}
        />
      </div>

      {/* Tool-first hero (iLoveIMG style) */}
      <section className="pb-8 pt-6 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{c.h1}</h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">{c.intro}</p>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm md:p-6">
          <ToolWidget page={page} />
        </div>
        <div className="mt-4">
          <StarRating />
        </div>
      </section>

      <AdSlot slot="tool-mid" />

      {/* Cloudinary Content body */}
      <div className="space-y-10 pb-14">
        <section>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{c.freeTitle}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.freeBody}</p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{c.whyTitle}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.whyBody}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {c.cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-[15px] font-bold text-slate-900">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  <RichText text={card.body} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="tool-content" />

        <section>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{c.howTitle}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.howIntro}</p>
          <ol className="mt-5 space-y-4">
            {c.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
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
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <FaqSection faqs={c.faqs} />
          </div>
        </section>
      </div>

      <JsonLd data={webAppJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
    </div>
  );
}
