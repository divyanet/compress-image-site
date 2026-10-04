/**
 * Format-specific exact-size compression engines.
 *
 * Every page on this site promises an exact target size (e.g. "Compress PNG to
 * 20KB"), so every engine below either genuinely reaches the target or returns
 * `reached: false` with an honest note — we never claim a size we didn't hit.
 */
"use client";

import { GIFEncoder, quantize, applyPalette } from "gifenc";
import {
  compressPngPalette,
  compressToTargetSize,
  encodeImage,
  formatBytes,
  loadImage,
  type ProcessedImage,
  type TargetSizeResult,
} from "./image";

export type OutputFormat = "jpeg" | "png" | "webp" | "gif" | "svg";

export const FORMAT_LABEL: Record<OutputFormat, string> = {
  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  gif: "GIF",
  svg: "SVG",
};

export const FORMAT_EXT: Record<OutputFormat, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
  gif: "gif",
  svg: "svg",
};

export const FORMAT_MIME: Record<OutputFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export function downloadNameFor(originalName: string, suffix: string, format: OutputFormat): string {
  const base = originalName.replace(/\.[a-z0-9]+$/i, "") || "image";
  return `${base}-${suffix}.${FORMAT_EXT[format]}`;
}

function untouchedResult(file: File, targetBytes: number, w: number, h: number): TargetSizeResult {
  return {
    result: {
      blob: file,
      url: URL.createObjectURL(file),
      width: w,
      height: h,
      sizeBytes: file.size,
      quality: 1,
    },
    targetBytes,
    reached: true,
    quality: 1,
    attempts: 0,
    note: `Your file is already ${formatBytes(file.size)}, which is under the ${formatBytes(
      targetBytes
    )} target — no compression was needed.`,
  };
}

/* ------------------------------------------------------------------ */
/* PNG: palette-quantize loop, then dimension loop                     */
/* ------------------------------------------------------------------ */

async function pngToTarget(
  file: File,
  targetBytes: number,
  onStep?: (message: string) => void
): Promise<TargetSizeResult> {
  const img = await loadImage(file);
  const w0 = img.naturalWidth;
  const h0 = img.naturalHeight;
  if (file.size <= targetBytes) return untouchedResult(file, targetBytes, w0, h0);

  let attempts = 0;
  let best: ProcessedImage | null = null;

  const tryColors = async (src: File, colors: number, label: string) => {
    attempts++;
    onStep?.(label);
    const info = await compressPngPalette(src, { colors });
    if (!best || info.sizeBytes < best.sizeBytes) best = info;
    return info.sizeBytes <= targetBytes ? info : null;
  };

  // 1) fewer colors at full dimensions
  for (const colors of [256, 128, 64, 32, 16, 8, 4, 2]) {
    const hit = await tryColors(file, colors, `Trying ${colors} colors…`);
    if (hit) return { result: hit, targetBytes, reached: true, quality: colors / 256, attempts, note: "" };
  }

  // 2) shrink dimensions, keep squeezing colors
  for (const s of [0.75, 0.5, 0.35, 0.25]) {
    const w = Math.round(w0 * s);
    const h = Math.round(h0 * s);
    if (Math.min(w, h) < 160) break;
    const small = await encodeImage(img, w, h, "png");
    const smallFile = new File([small.blob], "resized.png", { type: "image/png" });
    for (const colors of [32, 16, 8, 4, 2]) {
      const hit = await tryColors(smallFile, colors, `Trying ${w}×${h}px, ${colors} colors…`);
      if (hit) return { result: hit, targetBytes, reached: true, quality: colors / 256, attempts, note: "" };
    }
  }

  if (!best) throw new Error("Compression failed unexpectedly. Please try another image.");
  const final: ProcessedImage = best;
  return {
    result: final,
    targetBytes,
    reached: false,
    quality: 0,
    attempts,
    note: `Could not reach ${formatBytes(targetBytes)} without shrinking below ${final.width} × ${final.height}px or dropping under 2 colors. This is the smallest reasonable PNG — going further would visibly wreck the image.`,
  };
}

/* ------------------------------------------------------------------ */
/* GIF: decode frames, re-encode with gifenc, quantize loop            */
/* ------------------------------------------------------------------ */

interface GifFrame {
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
  delayMs: number;
}

async function decodeGifFrames(file: File): Promise<{ frames: GifFrame[]; flat: boolean }> {
  // Prefer WebCodecs ImageDecoder so animated GIFs keep their frames.
  interface ImageDecoderLike {
    tracks: { ready: Promise<void>; selectedTrack?: { frameCount: number } };
    decode(opts: { frameIndex: number }): Promise<{ image: VideoFrame }>;
    close(): void;
  }
  interface ImageDecoderCtor {
    new (opts: { data: ArrayBuffer; type: string }): ImageDecoderLike;
  }
  const ID = (window as unknown as { ImageDecoder?: ImageDecoderCtor }).ImageDecoder;
  if (typeof ID !== "undefined") {
    try {
      const data = await file.arrayBuffer();
      const decoder = new ID({ data, type: "image/gif" });
      await decoder.tracks.ready;
      const frameCount = Math.min(decoder.tracks.selectedTrack?.frameCount || 1, 24);
      const frames: GifFrame[] = [];
      const canvas = document.createElement("canvas");
      for (let i = 0; i < frameCount; i++) {
        const { image } = await decoder.decode({ frameIndex: i });
        const w = image.displayWidth;
        const h = image.displayHeight;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const d = ctx.getImageData(0, 0, w, h).data;
          const dur = (image as unknown as { duration?: number }).duration;
          frames.push({
            rgba: d,
            width: w,
            height: h,
            delayMs: Math.min(2000, Math.max(20, Math.round((dur ?? 100000) / 1000))),
          });
        }
        image.close();
      }
      decoder.close();
      if (frames.length > 0) return { frames, flat: false };
    } catch {
      /* fall through to first-frame fallback */
    }
  }
  // Fallback: first frame only (older browsers).
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  return {
    frames: [{ rgba: d, width: canvas.width, height: canvas.height, delayMs: 100 }],
    flat: true,
  };
}

function scaleFrame(f: GifFrame, scale: number): GifFrame {
  if (scale >= 1) return f;
  const w = Math.max(1, Math.round(f.width * scale));
  const h = Math.max(1, Math.round(f.height * scale));
  const src = document.createElement("canvas");
  src.width = f.width;
  src.height = f.height;
  const sctx = src.getContext("2d")!;
  const imgData = new ImageData(f.width, f.height);
  imgData.data.set(f.rgba);
  sctx.putImageData(imgData, 0, 0);
  const dst = document.createElement("canvas");
  dst.width = w;
  dst.height = h;
  const dctx = dst.getContext("2d", { willReadFrequently: true })!;
  dctx.drawImage(src, 0, 0, w, h);
  return { rgba: dctx.getImageData(0, 0, w, h).data, width: w, height: h, delayMs: f.delayMs };
}

function encodeGifBytes(frames: GifFrame[], colors: number): Uint8Array {
  const gif = GIFEncoder();
  const palette = quantize(frames[0].rgba, colors, { format: "rgba4444" });
  for (const f of frames) {
    const index = applyPalette(f.rgba, palette, "rgba4444");
    gif.writeFrame(index, f.width, f.height, { palette, delay: f.delayMs });
  }
  gif.finish();
  return gif.bytes();
}

async function gifToTarget(
  file: File,
  targetBytes: number,
  onStep?: (message: string) => void
): Promise<TargetSizeResult> {
  const { frames: decoded, flat } = await decodeGifFrames(file);
  const w0 = decoded[0].width;
  const h0 = decoded[0].height;
  if (file.size <= targetBytes) return untouchedResult(file, targetBytes, w0, h0);

  let attempts = 0;
  let best: { bytes: Uint8Array; w: number; h: number } | null = null;

  const scales = [1, 0.7, 0.5, 0.35, 0.25];
  const colorSteps = [256, 128, 64, 32, 16, 8];
  for (const s of scales) {
    const w = Math.round(w0 * s);
    const h = Math.round(h0 * s);
    if (Math.min(w, h) < 160 && s !== 1) break;
    const frames = decoded.map((f) => scaleFrame(f, s));
    for (const colors of colorSteps) {
      attempts++;
      onStep?.(s === 1 ? `Trying ${colors} colors…` : `Trying ${w}×${h}px, ${colors} colors…`);
      const bytes = encodeGifBytes(frames, colors);
      if (!best || bytes.length < best.bytes.length) best = { bytes, w, h };
      if (bytes.length <= targetBytes) {
        const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "image/gif" });
        return {
          result: { blob, url: URL.createObjectURL(blob), width: w, height: h, sizeBytes: blob.size, quality: colors / 256 },
          targetBytes,
          reached: true,
          quality: colors / 256,
          attempts,
          note: flat ? "Note: your browser flattened this animated GIF to its first frame." : "",
        };
      }
    }
  }

  const b = best as { bytes: Uint8Array; w: number; h: number };
  const blob = new Blob([b.bytes.buffer as ArrayBuffer], { type: "image/gif" });
  return {
    result: { blob, url: URL.createObjectURL(blob), width: b.w, height: b.h, sizeBytes: blob.size },
    targetBytes,
    reached: false,
    quality: 0,
    attempts,
    note: `Could not reach ${formatBytes(targetBytes)} without shrinking below ${b.w} × ${b.h}px. This is the smallest reasonable GIF — going further would visibly wreck it.${flat ? " Your browser flattened the animation to the first frame." : ""}`,
  };
}

/* ------------------------------------------------------------------ */
/* SVG: lossless minification                                          */
/* ------------------------------------------------------------------ */

export function minifySvg(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

async function svgToTarget(file: File, targetBytes: number): Promise<TargetSizeResult> {
  const text = await file.text();
  if (!/<svg[\s>]/i.test(text.slice(0, 2000))) {
    throw new Error("That file doesn't look like a real SVG. Please choose a genuine .svg file.");
  }
  const min = minifySvg(text);
  const blob = new Blob([min], { type: "image/svg+xml" });
  const reached = blob.size <= targetBytes;
  // Measure rendered dimensions for display (best effort).
  let w = 0;
  let h = 0;
  try {
    const img = await loadImage(new File([blob], "img.svg", { type: "image/svg+xml" }));
    w = img.naturalWidth;
    h = img.naturalHeight;
  } catch {
    /* dimensions unknown — fine */
  }
  return {
    result: { blob, url: URL.createObjectURL(blob), width: w, height: h, sizeBytes: blob.size, quality: 1 },
    targetBytes,
    reached,
    quality: 1,
    attempts: 1,
    note: reached
      ? `SVG optimized losslessly (whitespace, comments and metadata removed). Final size ${formatBytes(blob.size)} is under your ${formatBytes(targetBytes)} target — vectors can't be quality-reduced like photos, so this is the smallest honest result.`
      : `Even after removing all whitespace, comments and metadata, this SVG is ${formatBytes(blob.size)} — vectors can't be quality-reduced like photos, so ${formatBytes(targetBytes)} isn't reachable without editing the artwork itself.`,
  };
}

/* ------------------------------------------------------------------ */
/* Dispatcher                                                          */
/* ------------------------------------------------------------------ */

export async function compressToTargetSizeAs(
  file: File,
  targetBytes: number,
  format: OutputFormat,
  onStep?: (message: string) => void
): Promise<TargetSizeResult> {
  switch (format) {
    case "jpeg":
      return compressToTargetSize(file, targetBytes, onStep, "jpeg");
    case "webp":
      return compressToTargetSize(file, targetBytes, onStep, "webp");
    case "png":
      return pngToTarget(file, targetBytes, onStep);
    case "gif":
      return gifToTarget(file, targetBytes, onStep);
    case "svg":
      return svgToTarget(file, targetBytes);
  }
}

/** Quality-based (non-target) compression for hub pages. */
export async function compressQualityAs(
  file: File,
  format: OutputFormat,
  quality: number, // 0..1 (or 0..1 mapped to palette for png)
  onStep?: (message: string) => void
): Promise<TargetSizeResult> {
  if (format === "svg") {
    const text = await file.text();
    if (!/<svg[\s>]/i.test(text.slice(0, 2000))) {
      throw new Error("That file doesn't look like a real SVG.");
    }
    const blob = new Blob([minifySvg(text)], { type: "image/svg+xml" });
    return {
      result: { blob, url: URL.createObjectURL(blob), width: 0, height: 0, sizeBytes: blob.size, quality: 1 },
      targetBytes: blob.size,
      reached: true,
      quality: 1,
      attempts: 1,
      note: "SVG optimized losslessly — whitespace, comments and metadata removed.",
    };
  }
  if (format === "gif") {
    // Quality slider maps to a generous target (50% of original, min 64KB).
    const target = Math.max(64 * 1024, Math.floor(file.size * (1 - quality * 0.9)));
    return gifToTarget(file, target, onStep);
  }
  if (format === "png") {
    onStep?.("Reducing colors…");
    const colors = Math.max(2, Math.round(2 + quality * 254));
    const result = await compressPngPalette(file, { colors });
    return {
      result,
      targetBytes: result.sizeBytes,
      reached: true,
      quality,
      attempts: 1,
      note: "",
    };
  }
  const img = await loadImage(file);
  const result = await encodeImage(img, img.naturalWidth, img.naturalHeight, format, quality);
  return { result, targetBytes: result.sizeBytes, reached: true, quality, attempts: 1, note: "" };
}
