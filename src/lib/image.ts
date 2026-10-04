/**
 * Shared client-side image processing engine.
 *
 * Everything here runs 100% in the browser via Canvas / File / Blob APIs.
 * No uploads, no servers, no user images ever leave the device.
 */

export type ImageFormat = "jpeg" | "png" | "webp";

export interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
  /** Quality used for lossy encodes (0..1). Undefined for lossless PNG. */
  quality?: number;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const units = ["KB", "MB", "GB"];
  let v = bytes / 1024;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u++;
  }
  return `${v >= 100 ? Math.round(v).toString() : v.toFixed(1)} ${units[u]}`;
}

export function mimeOf(format: ImageFormat): string {
  return format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
}

export function extOf(format: ImageFormat): string {
  return format === "jpeg" ? "jpg" : format;
}

export function downloadName(originalName: string, suffix: string, format: ImageFormat): string {
  const base = originalName.replace(/\.[a-z0-9]+$/i, "") || "image";
  return `${base}-${suffix}.${extOf(format)}`;
}

export function loadImage(source: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(source);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image file. Try a JPG, PNG, or WebP image."));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Your browser could not encode this image."))),
      mimeOf(format),
      format === "png" ? undefined : quality
    );
  });
}

/**
 * Encode an image at the given dimensions. JPEG gets a white matte painted
 * behind transparent pixels (JPEG has no alpha channel). PNG/WebP keep alpha.
 */
export async function encodeImage(
  img: HTMLImageElement,
  width: number,
  height: number,
  format: ImageFormat,
  quality?: number
): Promise<ProcessedImage> {
  const w = Math.max(1, Math.min(12000, Math.round(width)));
  const h = Math.max(1, Math.min(12000, Math.round(height)));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  if (format === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await canvasToBlob(canvas, format, quality);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h,
    sizeBytes: blob.size,
    quality: format === "png" ? undefined : quality,
  };
}

/** True if any pixel in a downscaled sample is meaningfully transparent. */
async function detectAlpha(img: HTMLImageElement): Promise<boolean> {
  const w = Math.min(64, img.naturalWidth);
  const h = Math.min(64, img.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  for (let i = 3; i < data.length; i += 32) {
    if (data[i] < 248) return true;
  }
  return false;
}

/**
 * Compress an image to a fixed quality level at its natural dimensions.
 * PNG is re-encoded losslessly (quality is ignored and reported as undefined).
 */
export async function compressToQuality(
  file: File,
  quality: number,
  format: ImageFormat
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  return encodeImage(img, img.naturalWidth, img.naturalHeight, format, quality);
}

export interface TargetSizeResult {
  result: ProcessedImage;
  targetBytes: number;
  reached: boolean;
  quality: number;
  attempts: number;
  /** Honest human-readable note. Empty string when the target was reached cleanly. */
  note: string;
}

/**
 * Iteratively squeeze an image at or under `targetBytes`:
 *  1. Try progressively lower quality at full dimensions.
 *  2. If that is not enough, shrink dimensions step by step.
 * Never goes below a safe minimum (160px on the short side) — if the target
 * cannot be reached without wrecking the image, it returns the smallest
 * reasonable result with `reached: false` and an honest note.
 */
export async function compressToTargetSize(
  file: File,
  targetBytes: number,
  onStep?: (message: string) => void,
  forceFormat?: ImageFormat
): Promise<TargetSizeResult> {
  const img = await loadImage(file);
  const w0 = img.naturalWidth;
  const h0 = img.naturalHeight;
  const hasAlpha = await detectAlpha(img);
  // WebP keeps transparency; JPEG is smaller for opaque photos.
  // forceFormat lets format-specific pages (e.g. /compress-jpeg-to-20kb/) pin the output.
  const format: ImageFormat = forceFormat ?? (hasAlpha ? "webp" : "jpeg");

  if (file.size <= targetBytes) {
    return {
      result: {
        blob: file,
        url: URL.createObjectURL(file),
        width: w0,
        height: h0,
        sizeBytes: file.size,
        quality: 1,
      },
      targetBytes,
      reached: true,
      quality: 1,
      attempts: 0,
      note: `Your image is already ${formatBytes(file.size)}, which is under the ${formatBytes(
        targetBytes
      )} target — no compression was needed.`,
    };
  }

  let best: ProcessedImage | null = null;
  let bestQuality = 0.9;
  let attempts = 0;

  const qualities = [0.92, 0.85, 0.78, 0.7, 0.62, 0.54, 0.46, 0.38, 0.3, 0.22];
  for (const q of qualities) {
    attempts++;
    onStep?.(`Trying quality ${Math.round(q * 100)}%…`);
    const info = await encodeImage(img, w0, h0, format, q);
    if (!best || info.sizeBytes < best.sizeBytes) {
      best = info;
      bestQuality = q;
    }
    if (info.sizeBytes <= targetBytes) {
      return { result: info, targetBytes, reached: true, quality: q, attempts, note: "" };
    }
  }

  const scales = [0.85, 0.7, 0.55, 0.42, 0.32, 0.24];
  for (const s of scales) {
    const w = Math.round(w0 * s);
    const h = Math.round(h0 * s);
    if (Math.min(w, h) < 160) break; // safe minimum dimensions
    attempts++;
    onStep?.(`Reducing dimensions to ${w} × ${h}px…`);
    const info = await encodeImage(img, w, h, format, 0.6);
    if (!best || info.sizeBytes < best.sizeBytes) {
      best = info;
      bestQuality = 0.6;
    }
    if (info.sizeBytes <= targetBytes) {
      return { result: info, targetBytes, reached: true, quality: 0.6, attempts, note: "" };
    }
  }

  const final = best as ProcessedImage;
  return {
    result: final,
    targetBytes,
    reached: false,
    quality: bestQuality,
    attempts,
    note: `Could not reach ${formatBytes(
      targetBytes
    )} without shrinking below ${final.width} × ${final.height}px. This is the smallest reasonable result — going further would visibly wreck the image.`,
  };
}

export interface ResizeOptions {
  mode: "width" | "height" | "dimensions" | "percent";
  width?: number;
  height?: number;
  percent?: number;
  lockAspect: boolean;
  format: ImageFormat;
  quality: number; // 0..1, used for jpeg/webp
}

export async function resizeImage(file: File, opts: ResizeOptions): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const w0 = img.naturalWidth;
  const h0 = img.naturalHeight;
  let w = w0;
  let h = h0;

  if (opts.mode === "percent" && opts.percent && opts.percent > 0) {
    w = (w0 * opts.percent) / 100;
    h = (h0 * opts.percent) / 100;
  } else if (opts.mode === "width" && opts.width && opts.width > 0) {
    w = opts.width;
    h = opts.lockAspect ? (h0 * opts.width) / w0 : opts.height && opts.height > 0 ? opts.height : h0;
  } else if (opts.mode === "height" && opts.height && opts.height > 0) {
    h = opts.height;
    w = opts.lockAspect ? (w0 * opts.height) / h0 : opts.width && opts.width > 0 ? opts.width : w0;
  } else if (opts.mode === "dimensions" && opts.width && opts.height && opts.width > 0 && opts.height > 0) {
    w = opts.width;
    h = opts.height;
  }

  return encodeImage(img, w, h, opts.format, opts.quality);
}

/** Convert an image to another format at natural dimensions. */
export async function convertFormat(
  file: File,
  toFormat: ImageFormat,
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  return encodeImage(img, img.naturalWidth, img.naturalHeight, toFormat, quality);
}

export type RGB = [number, number, number];

/**
 * Average the color of the four corner regions — a good guess for a
 * solid/plain background.
 */
export async function sampleCornerColor(file: File): Promise<RGB> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(img, 0, 0);
  const s = Math.max(4, Math.min(24, Math.floor(Math.min(canvas.width, canvas.height) / 25)));
  const patches: Array<[number, number]> = [
    [0, 0],
    [canvas.width - s, 0],
    [0, canvas.height - s],
    [canvas.width - s, canvas.height - s],
  ];
  let r = 0,
    g = 0,
    b = 0,
    n = 0;
  for (const [x, y] of patches) {
    const d = ctx.getImageData(x, y, s, s).data;
    for (let i = 0; i < d.length; i += 4) {
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
      n++;
    }
  }
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
}

/**
 * Real solid-background remover. Pixels whose color is within `tolerance`
 * (0..1) of `bg` become transparent; a feather band softens the edge.
 * Works on plain/solid backgrounds — it is NOT AI subject segmentation and
 * is labeled honestly as such in the UI.
 */
export async function removeSolidBackground(
  file: File,
  bg: RGB,
  tolerance: number
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const scale = Math.min(1, 2000 / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  const maxDist = Math.sqrt(3 * 255 * 255);
  const t = Math.max(0, Math.min(1, tolerance));

  for (let i = 0; i < d.length; i += 4) {
    const dr = d[i] - bg[0];
    const dg = d[i + 1] - bg[1];
    const db = d[i + 2] - bg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db) / maxDist;
    if (dist <= t) {
      d[i + 3] = 0;
    } else if (dist <= t * 1.4 + 0.02) {
      // feather the edge
      const k = (dist - t) / (t * 0.4 + 0.02);
      d[i + 3] = Math.round(d[i + 3] * Math.max(0, Math.min(1, k)));
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas, "png");
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h,
    sizeBytes: blob.size,
  };
}

export function rgbToHex([r, g, b]: RGB): string {
  const to = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function hexToRgb(hex: string): RGB {
  const m = hex.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* ------------------------------------------------------------------ */
/* File validation — magic bytes, never trust the extension            */
/* ------------------------------------------------------------------ */

export type DetectedKind =
  | "jpeg"
  | "png"
  | "webp"
  | "gif"
  | "bmp"
  | "avif"
  | "heic"
  | "unknown";

/** Sniff the real file type from magic bytes. */
export async function detectKind(file: File): Promise<DetectedKind> {
  const buf = await file.slice(0, 24).arrayBuffer();
  const b = new Uint8Array(buf);
  if (b.length < 4) return "unknown";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
  if (
    b[0] === 0x52 &&
    b[1] === 0x49 &&
    b[2] === 0x46 &&
    b[3] === 0x46 &&
    b.length >= 12 &&
    b[8] === 0x57 &&
    b[9] === 0x45 &&
    b[10] === 0x42 &&
    b[11] === 0x50
  )
    return "webp";
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return "gif";
  if (b[0] === 0x42 && b[1] === 0x4d) return "bmp";
  if (b.length >= 12 && b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (["heic", "heix", "hevc", "hevx", "heim", "heis", "heim", "mif1", "msf1"].includes(brand))
      return "heic";
    if (brand === "avif") return "avif";
  }
  return "unknown";
}

const KIND_ERRORS: Record<DetectedKind, string> = {
  jpeg: "",
  png: "",
  webp: "",
  gif: "GIF images aren't supported by this tool. Convert it to JPG, PNG, or WebP first, then try again.",
  bmp: "BMP files aren't supported by this tool. Convert it to JPG, PNG, or WebP first, then try again.",
  avif: "AVIF isn't supported by this tool yet. Please use a JPG, PNG, or WebP file instead.",
  heic: "This looks like an iPhone HEIC photo, which web browsers can't open. On your iPhone, convert it first (Photos → Share → Save as JPG) and upload the JPG.",
  unknown:
    "That file doesn't look like a supported image. Please choose a real JPG, PNG, or WebP file.",
};

/**
 * Throw a human-readable error unless the file is genuinely one of the
 * allowed formats (checked via magic bytes, not the file extension).
 */
export async function ensureSupportedImage(file: File, allowed: ImageFormat[]): Promise<void> {
  const kind = await detectKind(file);
  if ((allowed as string[]).includes(kind)) return;
  throw new Error(messageForKind(kind));
}

/** Human-readable message for an unsupported/unknown file kind. */
export function messageForKind(kind: DetectedKind): string {
  return KIND_ERRORS[kind] || KIND_ERRORS.unknown;
}

/** Short display name for a detected kind, e.g. "JPG". */
export function friendlyKindName(kind: DetectedKind): string {
  return kind === "jpeg" ? "JPG" : kind.toUpperCase();
}

/** Refuse absurdly large images before they can OOM the tab. */
export const MAX_PIXELS = 40_000_000;

export function checkPixelBudget(w: number, h: number): void {
  if (w * h > MAX_PIXELS) {
    throw new Error(
      `This image is ${w.toLocaleString()} × ${h.toLocaleString()}px — too large to process safely in a browser tab. Please resize it below ~40 megapixels first.`
    );
  }
}

/* ------------------------------------------------------------------ */
/* Solid-background removal as a canvas helper (reused by tools)       */
/* ------------------------------------------------------------------ */

/**
 * Turn near-background pixels transparent, in place, on an existing canvas.
 * Same honest scope as removeSolidBackground: plain/solid backgrounds only.
 */
export function applyBgRemovalToCanvas(
  canvas: HTMLCanvasElement,
  bg: RGB,
  tolerance: number
): void {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  const maxDist = Math.sqrt(3 * 255 * 255);
  const t = Math.max(0, Math.min(1, tolerance));
  for (let i = 0; i < d.length; i += 4) {
    const dr = d[i] - bg[0];
    const dg = d[i + 1] - bg[1];
    const db = d[i + 2] - bg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db) / maxDist;
    if (dist <= t) {
      d[i + 3] = 0;
    } else if (dist <= t * 1.4 + 0.02) {
      const k = (dist - t) / (t * 0.4 + 0.02);
      d[i + 3] = Math.round(d[i + 3] * Math.max(0, Math.min(1, k)));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

/** Composite a transparent cutout canvas over a solid color. Returns a new canvas. */
export function compositeOverColor(
  cutout: HTMLCanvasElement,
  hex: string
): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = cutout.width;
  out.height = cutout.height;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(cutout, 0, 0);
  return out;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Your browser could not encode this image."))),
      "image/png"
    );
  });
}

/* ------------------------------------------------------------------ */
/* PNG palette quantization + encoding — real PNG compression that     */
/* preserves transparency (no dependencies, no uploads).              */
/* ------------------------------------------------------------------ */

const CRC_TABLE: Uint32Array = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export function pngChunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

export async function deflateRaw(data: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream("deflate");
  const writer = cs.writable.getWriter();
  const reader = cs.readable.getReader();
  const chunks: Uint8Array[] = [];
  const pump = (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  })();
  await writer.write(data as unknown as ArrayBuffer);
  await writer.close();
  await pump;
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) {
    out.set(c, o);
    o += c.length;
  }
  return out;
}

interface ColorBucket {
  r: number;
  g: number;
  b: number;
  n: number;
}

/** Median-cut over pre-bucketed colors. Returns at most maxColors entries. */
export function medianCut(buckets: ColorBucket[], maxColors: number): RGB[] {
  let boxes: number[][] = [buckets.map((_, i) => i)];
  while (boxes.length < maxColors) {
    let bi = -1;
    let bestScore = -1;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (box.length < 2) continue;
      let rmin = 255,
        rmax = 0,
        gmin = 255,
        gmax = 0,
        bmin = 255,
        bmax = 0,
        pop = 0;
      for (const idx of box) {
        const c = buckets[idx];
        if (c.r < rmin) rmin = c.r;
        if (c.r > rmax) rmax = c.r;
        if (c.g < gmin) gmin = c.g;
        if (c.g > gmax) gmax = c.g;
        if (c.b < bmin) bmin = c.b;
        if (c.b > bmax) bmax = c.b;
        pop += c.n;
      }
      const range = Math.max(rmax - rmin, gmax - gmin, bmax - bmin);
      const score = range * Math.log1p(pop);
      if (score > bestScore) {
        bestScore = score;
        bi = i;
      }
    }
    if (bi < 0) break;
    const box = boxes[bi];
    let rmin = 255,
      rmax = 0,
      gmin = 255,
      gmax = 0,
      bmin = 255,
      bmax = 0;
    for (const idx of box) {
      const c = buckets[idx];
      if (c.r < rmin) rmin = c.r;
      if (c.r > rmax) rmax = c.r;
      if (c.g < gmin) gmin = c.g;
      if (c.g > gmax) gmax = c.g;
      if (c.b < bmin) bmin = c.b;
      if (c.b > bmax) bmax = c.b;
    }
    const rr = rmax - rmin;
    const gg = gmax - gmin;
    const bb = bmax - bmin;
    const ch: 0 | 1 | 2 = rr >= gg && rr >= bb ? 0 : gg >= bb ? 1 : 2;
    const sorted = [...box].sort((a, b2) => {
      const ca = buckets[a];
      const cb = buckets[b2];
      return (ch === 0 ? ca.r - cb.r : ch === 1 ? ca.g - cb.g : ca.b - cb.b);
    });
    let total = 0;
    for (const idx of sorted) total += buckets[idx].n;
    let acc = 0;
    let mid = 0;
    for (let i = 0; i < sorted.length; i++) {
      acc += buckets[sorted[i]].n;
      if (acc >= total / 2) {
        mid = i + 1;
        break;
      }
    }
    mid = Math.max(1, Math.min(sorted.length - 1, mid));
    boxes[bi] = sorted.slice(0, mid);
    boxes.push(sorted.slice(mid));
  }
  return boxes.map((box) => {
    let r = 0,
      g = 0,
      b = 0,
      n = 0;
    for (const idx of box) {
      const c = buckets[idx];
      r += c.r * c.n;
      g += c.g * c.n;
      b += c.b * c.n;
      n += c.n;
    }
    if (n === 0) n = 1;
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n)] as RGB;
  });
}

/**
 * Map every pixel to its palette index. Uses a 32^3 lookup grid so each
 * distinct quantized color is matched once, not once per pixel.
 * Palette index 0 is reserved for transparent pixels.
 */
export function buildIndexMap(data: Uint8ClampedArray, palette: RGB[]): Uint8Array {
  const GRID = 32;
  const grid = new Int16Array(GRID * GRID * GRID).fill(-1);
  const nearest = (r: number, g: number, b: number): number => {
    let best = 1;
    let bestD = Infinity;
    for (let i = 1; i < palette.length; i++) {
      const p = palette[i];
      const dr = r - p[0];
      const dg = g - p[1];
      const db = b - p[2];
      const d = dr * dr + dg * dg + db * db;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  };
  const count = data.length / 4;
  const idx = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const a = data[i * 4 + 3];
    if (a < 128) {
      idx[i] = 0;
      continue;
    }
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const key =
      (((r * GRID) / 256) | 0) * GRID * GRID +
      (((g * GRID) / 256) | 0) * GRID +
      (((b * GRID) / 256) | 0);
    let pi = grid[key];
    if (pi < 0) {
      pi = nearest(r, g, b);
      grid[key] = pi;
    }
    idx[i] = pi;
  }
  return idx;
}

export async function encodeIndexedPng(
  width: number,
  height: number,
  indices: Uint8Array,
  palette: RGB[],
  hasTransparency: boolean
): Promise<Blob> {
  // Filtered scanlines (Sub filter = 1) then deflate.
  const stride = width + 1;
  const raw = new Uint8Array(stride * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * stride;
    raw[rowStart] = 1; // Sub filter
    let prev = 0;
    for (let x = 0; x < width; x++) {
      const v = indices[y * width + x];
      raw[rowStart + 1 + x] = (v - prev) & 0xff;
      prev = v;
    }
  }
  const deflated = await deflateRaw(raw);

  const ihdr = new Uint8Array(13);
  const iv = new DataView(ihdr.buffer);
  iv.setUint32(0, width);
  iv.setUint32(4, height);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 3; // color type: palette
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const plte = new Uint8Array(palette.length * 3);
  palette.forEach((c, i) => {
    plte[i * 3] = c[0];
    plte[i * 3 + 1] = c[1];
    plte[i * 3 + 2] = c[2];
  });

  const parts: Uint8Array[] = [
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("PLTE", plte),
  ];
  if (hasTransparency) parts.push(pngChunk("tRNS", new Uint8Array([0])));
  parts.push(pngChunk("IDAT", deflated));
  parts.push(pngChunk("IEND", new Uint8Array(0)));

  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return new Blob([out.buffer as ArrayBuffer], { type: "image/png" });
}

export interface PngSmartOptions {
  /** 2..256 palette colors. Fewer = smaller, more banding. */
  colors: number;
}

/**
 * Genuinely compress a PNG: reduce to a small color palette (median-cut)
 * and re-encode as an indexed-color PNG. Transparency is preserved —
 * transparent pixels keep working transparency, unlike a JPG conversion.
 */
export async function compressPngPalette(
  file: File,
  options: PngSmartOptions,
  onStep?: (message: string) => void
): Promise<ProcessedImage> {
  const colors = Math.max(2, Math.min(256, Math.round(options.colors)));
  if (typeof CompressionStream === "undefined") {
    // Very old browser fallback: lossless re-encode (strips metadata).
    const img = await loadImage(file);
    checkPixelBudget(img.naturalWidth, img.naturalHeight);
    return encodeImage(img, img.naturalWidth, img.naturalHeight, "png");
  }
  onStep?.("Reading image…");
  const img = await loadImage(file);
  checkPixelBudget(img.naturalWidth, img.naturalHeight);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  onStep?.("Analyzing colors…");
  let transparentPixels = 0;
  const buckets = new Map<number, ColorBucket>();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) {
      transparentPixels++;
      continue;
    }
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { r: 0, g: 0, b: 0, n: 0 };
      buckets.set(key, bucket);
    }
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    bucket.n++;
  }
  const bucketList: ColorBucket[] = Array.from(buckets.values()).map((bk) => ({
    r: Math.round(bk.r / bk.n),
    g: Math.round(bk.g / bk.n),
    b: Math.round(bk.b / bk.n),
    n: bk.n,
  }));

  const hasTransparency = transparentPixels > 0;
  // Index 0 is reserved for transparency, so quantize to colors-1.
  const targetColors = hasTransparency ? Math.max(1, colors - 1) : colors;

  onStep?.("Reducing colors…");
  const quantized = medianCut(bucketList, targetColors);
  const palette: RGB[] = hasTransparency ? [[0, 0, 0], ...quantized] : quantized;

  onStep?.("Encoding PNG…");
  const indices = buildIndexMap(data, palette);
  const blob = await encodeIndexedPng(w, h, indices, palette, hasTransparency);

  return {
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h,
    sizeBytes: blob.size,
  };
}

/** Lossless PNG pass: re-encode via canvas (strips metadata chunks). */
export async function compressPngLossless(file: File): Promise<ProcessedImage> {
  const img = await loadImage(file);
  checkPixelBudget(img.naturalWidth, img.naturalHeight);
  return encodeImage(img, img.naturalWidth, img.naturalHeight, "png");
}
