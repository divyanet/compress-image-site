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
      <div className="border-b border-[#e5e5ea] bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="pt-5">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: page.category, href: `/${page.slug.split("/")[0]}/` },
                { label: c.h1 },
              ]}
            />
          </div>

          {/* Tool-first hero — iLovePDF style */}
          <section className="pb-10 pt-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#383e45] sm:text-4xl">
              {c.h1}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500">{c.intro}</p>
            <div className="mt-8 rounded-xl bg-[#f6f6f9] p-4 text-left sm:p-6">
              <ToolWidget page={page} />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-gray-500">
              {["100% free", "No signup", "Private — no uploads"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <AdSlot slot="tool-mid" />

        {/* Content body */}
        <div className="space-y-12 py-10">
          <section>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#383e45]">{c.freeTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{c.freeBody}</p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#383e45]">{c.whyTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{c.whyBody}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.cards.map((card, i) => (
                <div
                  key={card.title}
                  className="tool-card rounded-xl border border-[#e5e5ea] bg-white p-5"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-sm font-extrabold text-[#e5322d]"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-[#383e45]">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    <RichText text={card.body} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <AdSlot slot="tool-content" />

          <section>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#383e45]">{c.howTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{c.howIntro}</p>
            <ol className="mt-6 space-y-3">
              {c.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-xl border border-[#e5e5ea] bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5322d] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#383e45]">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#383e45]">
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
