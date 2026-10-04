/**
 * "Cloudinary Content" copy templates — HRK's standing content rule.
 *
 * Structure (no "Explore Beyond" section — excluded by HRK):
 *   H1 → short keyword intro → tool widget
 *   → H2 "Free {Tool}" → H2 "Why choose our {tool}?" → 6 feature cards
 *   → H2 "How to {verb}" (3 steps) → H2 FAQ (5 standard + 1 specific,
 *     internal links in the last answers).
 * Style: plain US English, short sentences, trust words
 * (free / online / in seconds / in your browser / no downloads / secure).
 * Wording rule: "compress", never "shrink". No fake ratings anywhere.
 * All sentences are our own — structure/style only, never copied.
 */
import { PAGE_MAP, siblingsOf, type PageDef } from "./slugs";

export interface Faq {
  q: string;
  /** May contain [[slug|anchor]] internal-link placeholders. */
  a: string;
}

export interface Card {
  title: string;
  body: string;
}

export interface PageContent {
  h1: string;
  intro: string;
  freeTitle: string;
  freeBody: string;
  whyTitle: string;
  whyBody: string;
  cards: Card[];
  howTitle: string;
  howIntro: string;
  steps: { title: string; body: string }[];
  faqs: Faq[];
}

const FMT_LABEL: Record<string, string> = {
  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  gif: "GIF",
  svg: "SVG",
};

function fmtLabel(page: PageDef): string {
  if (page.format) return FMT_LABEL[page.format];
  if (page.kind === "pdf") return "PDF";
  return "image";
}

function inputHint(page: PageDef): string {
  switch (page.format) {
    case "jpeg":
      return "JPG, PNG or WebP";
    case "png":
      return "PNG, JPG or WebP";
    case "webp":
      return "WebP, JPG or PNG";
    case "gif":
      return "GIF, JPG or PNG";
    case "svg":
      return "SVG";
    default:
      return "JPG, PNG, WebP or GIF";
  }
}

/** "[[slug|text]]" placeholders → rendered by the Faq component. */
function link(slug: string, text: string): string {
  return `[[${slug}|${text}]]`;
}

function siblingSizeLinks(page: PageDef, count = 8): string {
  const sibs = siblingsOf(page)
    .filter((p) => p.targetKb && p.kind === page.kind)
    .sort((a, b) => {
      const d = (p: PageDef) => Math.abs((p.targetKb ?? 0) - (page.targetKb ?? 0));
      return d(a) - d(b);
    })
    .slice(0, count);
  return sibs.map((s) => link(s.slug, s.name)).join(", ");
}

function sizeFaqs(page: PageDef, tool: string, fmt: string, targetKb: number): Faq[] {
  const extWord = page.format === "svg" ? "optimize" : "compress";
  const noun = page.kind === "pdf" ? "file" : "image";
  return [
    {
      q: `What is the ${tool} tool?`,
      a: `The ${tool} tool compresses your ${fmt} ${noun} down to ${targetKb}KB or less, right in your browser. It is built for anyone who needs an exact file size — upload forms, job portals and profiles that reject oversized files.`,
    },
    {
      q: `How does the ${tool} tool work?`,
      a: `Add your file and press the button. The tool first tries gentler quality settings at full size, then trims dimensions only if it must — always working toward ${targetKb}KB or less without visibly harming your ${noun}.`,
    },
    {
      q: `Is the ${tool} tool free to use?`,
      a: `Yes — completely free, no signup, no watermarks. Your files never leave your device, so it is private as well as free.`,
    },
    {
      q: `Will my file really be ${targetKb}KB?`,
      a: `You will see the true output size after every run — we never invent numbers. If ${targetKb}KB genuinely cannot be reached without ruining quality, the tool says so openly and gives you the smallest sensible result instead.`,
    },
    {
      q: `Are my files uploaded to a server?`,
      a: `No. Unlike many online compressors, this tool ${extWord}es everything on your own device, inside your browser. Nothing is uploaded, stored or seen by anyone else.`,
    },
    {
      q: `What if I need a different target size?`,
      a: `Pick the size that fits your need: ${siblingSizeLinks(page)}. Each page targets its own size with the same free one-click workflow.`,
    },
  ];
}

function sizeCards(page: PageDef, tool: string, fmt: string, targetKb: number): Card[] {
  return [
    {
      title: `Exact ${targetKb}KB targeting`,
      body: `Not "roughly smaller" — the engine tunes quality and dimensions until your ${fmt} lands at or under ${targetKb}KB, then shows you the true final size.`,
    },
    {
      title: "100% in your browser",
      body: "No uploads, no queues, no waiting on a server. Your files stay on your device, so it stays fast even on slow connections.",
    },
    {
      title: "Honest results",
      body: "If a target truly cannot be hit without degrading the file, we tell you plainly instead of inventing a number. What you see is what you download.",
    },
    {
      title: "Free, no signup",
      body: "No accounts, no watermarks, no daily-limit screens. Open the page, drop your file, download the result.",
    },
    {
      title: `${fmt} done right`,
      body:
        page.format === "png"
          ? "PNGs are re-encoded with palette reduction that preserves transparency — not a lazy conversion to JPG."
          : page.format === "svg"
            ? "SVGs are cleaned losslessly — comments, whitespace and editor metadata go, while your artwork stays pixel-perfect."
            : page.format === "gif"
              ? "GIFs keep their animation wherever possible while colors and dimensions are tightened to meet your target."
              : "Photos are re-encoded at the ideal quality level, with dimensions trimmed only as a last resort.",
    },
    {
      title: "Works on any device",
      body: "Phone, tablet or desktop — the tool runs anywhere your browser runs, with the same one-click workflow.",
    },
  ];
}

function sizeSteps(page: PageDef, fmt: string, targetKb: number, input: string): { title: string; body: string }[] {
  const noun = fmt === "PDF" ? "PDF" : "image";
  return [
    {
      title: `Add your ${noun}`,
      body: `Upload or drag and drop your file (${input}) into the tool above.`,
    },
    {
      title: `Compress to ${targetKb}KB`,
      body: `Press the button and watch the tool work your file down to ${targetKb}KB or less, showing each attempt live.`,
    },
    {
      title: "Download the result",
      body: `Check the real output size, then download your ${targetKb}KB-ready file. Run another file any time.`,
    },
  ];
}

function hubContent(page: PageDef): PageContent {
  const fmt = fmtLabel(page);
  const tool = page.name;
  const input = inputHint(page);
  const sibLinks = siblingsOf(page)
    .filter((p) => p.targetKb)
    .sort((a, b) => (a.targetKb ?? 0) - (b.targetKb ?? 0))
    .map((s) => link(s.slug, `${s.targetKb}KB`))
    .join(", ");
  return {
    h1: tool,
    intro: `${tool} online, free. Compress your ${fmt} files to any exact size — pick a target below and hit it in one click.`,
    freeTitle: `Free ${tool}`,
    freeBody: `Make ${fmt} files smaller online without installing anything. Everything runs in your browser: drop a file (${input}), choose how small it should be, and download the result in seconds.`,
    whyTitle: `Why choose our ${tool.toLowerCase()}?`,
    whyBody: `Exact-size compression with honest reporting — the true output size, every time. No uploads, no signup, no watermarks, and your files never leave your device.`,
    cards: [
      { title: "Any exact size", body: `From tiny 1KB files up to 500KB — choose the target your form or upload needs: ${sibLinks}.` },
      { title: "100% in your browser", body: "No uploads and no waiting on servers. Compression happens locally, so it is fast and private." },
      { title: "Honest results", body: "We show the true output size every time. If a target cannot be reached cleanly, we tell you instead of faking it." },
      { title: "Free forever", body: "No accounts, no watermarks, no paywalls. Compress as many files as you like." },
      { title: `${fmt} expertise`, body: `Each format gets the right technique — quality tuning for photos, palette reduction for ${fmt === "PNG" ? "PNG" : "graphics"}, lossless cleanup for vectors.` },
      { title: "Mobile friendly", body: "The same one-click workflow on your phone, tablet or desktop." },
    ],
    howTitle: `How to compress ${fmt} files`,
    howIntro: `Compress any ${fmt} file in 3 simple steps.`,
    steps: [
      { title: "Add your file", body: `Upload or drag and drop your ${fmt} file (${input}) into the tool above.` },
      { title: "Pick a target size", body: "Choose the exact KB target you need from the list, then press compress." },
      { title: "Download", body: "Check the real output size and download your compressed file." },
    ],
    faqs: [
      { q: `What is the ${tool} tool?`, a: `The ${tool} tool compresses ${fmt} files to any exact size you choose, free and online. Pick a target like ${sibLinks} and the tool works your file down to it.` },
      { q: `How does ${fmt} compression work here?`, a: `The tool tries gentler settings first at full size, then trims dimensions only if needed — always protecting visible quality while it works toward your target.` },
      { q: `Is it really free?`, a: `Yes. No signup, no watermarks, no limit screens. Your files are processed locally in your browser and never uploaded anywhere.` },
      { q: `Which target size should I pick?`, a: `Match the limit of wherever you are uploading — forms usually ask for 20KB, 50KB, 100KB or 200KB. When in doubt, pick the exact number they state.` },
      { q: `Will I lose quality?`, a: `At moderate targets the difference is usually invisible. The tool always shows you the real result, and tells you honestly if a target would damage the file.` },
    ],
  };
}

function sizeContent(page: PageDef): PageContent {
  const fmt = fmtLabel(page);
  const tool = page.name;
  const targetKb = page.targetKb ?? 100;
  const input = inputHint(page);
  const noun = page.kind === "pdf" ? "PDF" : "image";
  return {
    h1: tool,
    intro: `${tool} online. Upload your ${noun} below to compress it to ${targetKb}KB or less while keeping quality intact.`,
    freeTitle: `Free ${tool}`,
    freeBody: `Get your ${fmt} down to exactly ${targetKb}KB online. No software or plugins needed — just drop your file (${input}) into the tool and download the ${targetKb}KB version in seconds, right in your browser.`,
    whyTitle: `Why choose our ${tool.toLowerCase()}?`,
    whyBody: `Compress one ${fmt} to ${targetKb}KB online — free, private and honest. Your file never leaves your device, and we always show the true output size.`,
    cards: sizeCards(page, tool, fmt, targetKb),
    howTitle: page.kind === "pdf" ? `How to compress a PDF to ${targetKb}KB` : `How to compress ${fmt} to ${targetKb}KB`,
    howIntro: `Get your file to ${targetKb}KB in 3 simple steps.`,
    steps: sizeSteps(page, fmt, targetKb, input),
    faqs: sizeFaqs(page, tool, fmt, targetKb),
  };
}

function reduceContent(page: PageDef): PageContent {
  const targetKb = page.targetKb;
  if (targetKb) {
    return sizeContent({ ...page });
  }
  // hub: /reduce-image-size-in-kb/
  const sibLinks = siblingsOf(page)
    .filter((s) => s.targetKb)
    .sort((a, b) => (a.targetKb ?? 0) - (b.targetKb ?? 0))
    .slice(0, 12)
    .map((s) => link(s.slug, `${s.targetKb}KB`))
    .join(", ");
  return {
    h1: "Reduce Image Size in KB",
    intro: "Reduce image size in KB online, free. Pick any exact target — from 5KB to 200KB — and compress your photo to it in one click.",
    freeTitle: "Free Image Size Reducer",
    freeBody: "Make any image smaller online without installing software. Drop a JPG, PNG, WebP or GIF into the tool, choose your KB target, and download the result in seconds — all in your browser.",
    whyTitle: "Why choose our image size reducer?",
    whyBody: "Exact KB targets with honest reporting, zero uploads, zero signup. Your photos never leave your device.",
    cards: [
      { title: "Exact KB targets", body: `Choose precisely: ${sibLinks}, and more.` },
      { title: "100% in your browser", body: "No uploads, no server queues. Fast and private by design." },
      { title: "Honest results", body: "True output sizes shown every time — never invented." },
      { title: "Free, no signup", body: "No watermarks, no accounts, no catches." },
      { title: "Smart engine", body: "Quality tuning first, dimension trimming only when needed — quality is protected." },
      { title: "Any device", body: "Works on phone, tablet and desktop browsers." },
    ],
    howTitle: "How to reduce image size in KB",
    howIntro: "Compress any image to your KB target in 3 simple steps.",
    steps: [
      { title: "Add your image", body: "Upload or drag and drop your image (JPG, PNG, WebP or GIF) into the tool above." },
      { title: "Pick a KB target", body: "Choose the exact size you need and press the button." },
      { title: "Download", body: "Verify the true output size and download your smaller image." },
    ],
    faqs: [
      { q: "What does “reduce image size in KB” mean?", a: "It means compressing a photo's file size to an exact kilobyte target — for example 20KB or 100KB — so it fits upload limits on forms, job portals and profiles." },
      { q: "How small can my image go?", a: `Targets range from 5KB to 200KB: ${sibLinks}. The tool tunes quality first and only trims dimensions if it must.` },
      { q: "Is it free?", a: "Yes — free, no signup, no watermarks. Everything runs locally in your browser." },
      { q: "Will the image still look good?", a: "At sensible targets, yes — the difference is usually invisible. And the tool tells you honestly if a target would harm quality." },
      { q: "Are my photos uploaded anywhere?", a: "No. All processing happens on your device in the browser. Nothing is sent to any server." },
    ],
  };
}

const RESIZE_PRESET_NOTE: Record<string, string> = {
  "resize-image-to-3.5cmX4.5cm": "the 3.5cm × 4.5cm passport preset",
  "resize-image-to-3x4": "the 3×4 ratio preset",
  "resize-image-to-600x600-pixel": "the 600×600px square preset",
  "resize-image-to-2x2": "the 2×2 inch preset",
  "resize-image-to-4x6": "the 4×6 inch preset",
};

function resizeContent(page: PageDef): PageContent {
  const tool = page.name;
  const preset = RESIZE_PRESET_NOTE[page.slug];
  const sizeLinks = siblingsOf(page)
    .filter((s) => s.slug !== page.slug)
    .slice(0, 6)
    .map((s) => link(s.slug, s.name))
    .join(", ");
  return {
    h1: tool,
    intro: `${tool} online, free. Change your photo's dimensions in seconds — right in your browser, with no software to install.`,
    freeTitle: `Free ${tool}`,
    freeBody: `${tool} without installing anything. Upload your JPG, PNG or WebP, ${preset ? `use ${preset} or ` : ""}enter custom dimensions, and download the resized image instantly.`,
    whyTitle: `Why choose our ${tool.toLowerCase()}?`,
    whyBody: "Precise dimension control with aspect-ratio locking, free and private. Your image never leaves your device.",
    cards: [
      { title: "Exact dimensions", body: "Set width, height or a percentage — with optional aspect-ratio lock so nothing gets stretched." },
      { title: "100% in your browser", body: "No uploads, no waiting. Resizing happens locally and instantly." },
      { title: "Free, no signup", body: "No watermarks, no accounts. Resize as many images as you like." },
      { title: "Quality kept", body: "High-quality resampling keeps edges clean at any size." },
      { title: "Any output format", body: "Download as JPG, PNG or WebP — your choice, after resizing." },
      { title: "Works everywhere", body: "Phone, tablet or desktop — the same simple workflow." },
    ],
    howTitle: `How to ${tool.charAt(0).toLowerCase() + tool.slice(1)}`,
    howIntro: "Resize any image in 3 simple steps.",
    steps: [
      { title: "Add your image", body: "Upload or drag and drop your image (JPG, PNG or WebP) into the tool above." },
      { title: "Set dimensions", body: `${preset ? `The ${preset} is pre-selected — adjust it if you like, or ` : ""}enter width, height or a percentage, with aspect lock optional.` },
      { title: "Download", body: "Preview the new dimensions and download your resized image." },
    ],
    faqs: [
      { q: `What is the ${tool} tool?`, a: `The ${tool} tool changes your photo's pixel dimensions online — ${preset ? `with a handy ${preset}, plus ` : ""}full custom control over width, height and scale.` },
      { q: "Will resizing reduce quality?", a: "Downsizing is safe — the tool uses high-quality resampling. Upscaling beyond the original size cannot add detail, so results stay honest about that." },
      { q: "Is it free?", a: "Yes. Free, no signup, no watermarks — and your images never leave your browser." },
      { q: "Can I keep the aspect ratio?", a: "Yes, aspect-ratio lock is on by default so your photo never gets stretched or squashed." },
      { q: "What other resize options exist?", a: `Try ${sizeLinks} — each with its own one-click preset.` },
    ],
  };
}

function converterContent(page: PageDef): PageContent {
  const tool = page.name;
  const m = tool.match(/^(.*) to (.*)$/);
  const from = m ? m[1] : "image";
  const to = m ? m[2] : "image";
  const convLinks = siblingsOf(page)
    .map((s) => link(s.slug, s.name))
    .join(", ");
  return {
    h1: `${tool} Converter`,
    intro: `Convert ${from} to ${to} online, free. Drop your ${from} files below and download ${to} versions in seconds.`,
    freeTitle: `Free ${tool} Converter`,
    freeBody: `Change ${from} images to ${to} without installing software. Everything runs in your browser — upload your files and get ${to} downloads instantly, free and unlimited.`,
    whyTitle: `Why choose our ${from.toLowerCase()} to ${to.toLowerCase()} converter?`,
    whyBody: `Fast, free and private conversion with quality control. Your files never leave your device — no uploads, no signup, no watermarks.`,
    cards: [
      { title: `${from} → ${to} in seconds`, body: `One click turns your ${from} files into clean ${to} files at high quality.` },
      { title: "100% in your browser", body: "No uploads and no server queues — conversion is local and instant." },
      { title: "Quality control", body: "Choose the quality/size balance that fits your need before downloading." },
      { title: "Free, no signup", body: "No watermarks, no accounts, no conversion-limit screens." },
      { title: "Batch friendly", body: "Convert one file or many — the workflow stays the same simple 3 steps." },
      { title: "More conversions", body: `Also try: ${convLinks}.` },
    ],
    howTitle: `How to convert ${from} to ${to}`,
    howIntro: `Convert in 3 simple steps.`,
    steps: [
      { title: `Add your ${from} files`, body: `Upload or drag and drop your ${from} images into the tool above.` },
      { title: "Start conversion", body: `Press the button — your files are converted to ${to} locally.` },
      { title: `Download ${to} files`, body: `Download your converted ${to} images one by one.` },
    ],
    faqs: [
      { q: `What is the ${tool} converter?`, a: `It converts ${from} image files to ${to} format online, free. Useful when a site or app only accepts ${to}, or when you want ${to === "JPG" ? "smaller photo files" : to === "WebP" ? "modern, smaller web images" : "a different format"} than what you have.` },
      { q: `How do I convert ${from} to ${to}?`, a: `Upload your ${from} file, press convert, download the ${to}. The whole thing takes seconds and happens in your browser.` },
      { q: "Is it free?", a: "Yes — free, no signup, no watermarks. Files never leave your device." },
      { q: "Will I lose quality?", a: `Converting between formats re-encodes the image. ${to === "JPG" || to === "WebP" ? "At high quality settings the difference is invisible." : "The tool uses high-quality settings by default."}` },
      { q: "What other formats can I convert?", a: `See ${convLinks}.` },
    ],
  };
}

function pdfContent(page: PageDef): PageContent {
  const tool = page.name;
  const targetKb = page.targetKb;
  const sizeLinks = siblingsOf(page)
    .filter((s) => s.targetKb)
    .sort((a, b) => (a.targetKb ?? 0) - (b.targetKb ?? 0))
    .slice(0, 10)
    .map((s) => link(s.slug, `${s.targetKb}KB`))
    .join(", ");
  const h1 = targetKb ? tool : "Compress PDF";
  return {
    h1,
    intro: targetKb
      ? `${tool} online. Upload your PDF below and compress it toward ${targetKb}KB — free, in your browser, with honest reporting.`
      : "Compress PDF online, free. Make your PDF files smaller to any exact size — pick a target and go.",
    freeTitle: `Free ${h1}`,
    freeBody: `${targetKb ? `Bring your PDF down toward exactly ${targetKb}KB` : "Make your PDFs smaller"} online without installing anything. Drop your PDF into the tool and download the lighter version in seconds — all in your browser.`,
    whyTitle: `Why choose our ${h1.toLowerCase()}?`,
    whyBody: `${targetKb ? `A genuine attempt at ${targetKb}KB` : "Genuine size reduction"} with honest reporting — free, private, no signup. Your documents never leave your device.`,
    cards: [
      { title: targetKb ? `Toward ${targetKb}KB` : "Smaller PDFs", body: targetKb ? `The tool removes bloat and recompresses streams aiming for ${targetKb}KB — and shows you the true result.` : "Removes bloat and recompresses content streams for a genuinely lighter file." },
      { title: "100% in your browser", body: "Documents are sensitive — that is why nothing is uploaded. Everything happens locally." },
      { title: "Honest results", body: "PDFs made of scanned images can only compress so far. We show the true output size instead of faking it." },
      { title: "Free, no signup", body: "No watermarks, no accounts, no page-count traps." },
      { title: "Keeps it readable", body: "Text stays selectable and pages stay intact — only the bloat goes." },
      { title: "Any device", body: "Works in any modern browser, phone or desktop." },
    ],
    howTitle: targetKb ? `How to compress a PDF to ${targetKb}KB` : "How to compress a PDF",
    howIntro: "Lighten any PDF in 3 simple steps.",
    steps: [
      { title: "Add your PDF", body: "Upload or drag and drop your PDF file into the tool above." },
      { title: targetKb ? `Compress toward ${targetKb}KB` : "Compress the PDF", body: "Press the button — bloat is removed and streams are recompressed locally." },
      { title: "Download", body: "Check the true output size and download your lighter PDF." },
    ],
    faqs: [
      { q: `What is the ${h1} tool?`, a: `It reduces PDF file size ${targetKb ? `toward ${targetKb}KB ` : ""}online, free. Handy for uploads with strict limits — job portals, forms and email attachments.` },
      { q: "How much can a PDF compress?", a: "It depends on the PDF. Text-heavy files compress a lot; scanned-image PDFs less so. The tool always reports the true before/after sizes." },
      { q: "Is it free?", a: "Yes — free, no signup, no watermarks." },
      { q: "Are my documents uploaded?", a: "No. This is the important part for documents: everything runs locally in your browser. Your PDF never touches a server." },
      { q: "What other sizes are available?", a: `Try ${sizeLinks} — each page targets its size with the same free workflow.` },
    ],
  };
}

export function contentFor(page: PageDef): PageContent {
  switch (page.kind) {
    case "hub":
      return hubContent(page);
    case "size":
      return sizeContent(page);
    case "reduce":
      return reduceContent(page);
    case "resize":
      return resizeContent(page);
    case "converter":
      return converterContent(page);
    case "pdf":
      return pdfContent(page);
    default:
      return hubContent(page);
  }
}

/** Resolve a slug to its PageDef (for internal links). */
export function pageForSlug(slug: string): PageDef | undefined {
  return PAGE_MAP[slug];
}
