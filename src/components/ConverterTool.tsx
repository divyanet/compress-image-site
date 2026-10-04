"use client";

import { useState } from "react";
import {
  checkPixelBudget,
  detectKind,
  encodeImage,
  formatBytes,
  loadImage,
  type ImageFormat,
  type ProcessedImage,
} from "@/lib/image";
import {
  ActionButton,
  FileCard,
  ProcessingNote,
  ResultView,
  ToolError,
  UploadDrop,
} from "@/components/tool-ui";

interface Props {
  fromLabel: string;
  toFormat: ImageFormat;
  toLabel: string;
  /** iLoveIMG-style chaining shown on the result screen. */
  nextTools?: { label: string; href: string }[];
}

const DECODABLE = ["jpeg", "png", "webp", "gif", "bmp", "avif"];

const HONEST_BLOCKS: Record<string, string> = {
  heic: "This looks like an iPhone HEIC photo, which web browsers can't open directly. Convert it on your iPhone first (Photos → Share → Save as JPG), then upload the JPG here.",
  tiff: "TIFF files can't be opened directly by web browsers, so this browser-based converter can't read them. Export your image as JPG or PNG from your editor first, then convert it here.",
};

export function ConverterTool({ fromLabel, toFormat, toLabel, nextTools }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [quality, setQuality] = useState(92);
  const [outcome, setOutcome] = useState<ProcessedImage | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFiles = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setOutcome(null);
    try {
      const kind = await detectKind(f);
      if (HONEST_BLOCKS[kind]) throw new Error(HONEST_BLOCKS[kind]);
      if (!DECODABLE.includes(kind)) {
        throw new Error(`That file (${kind.toUpperCase()}) can't be opened by browsers. Please use a JPG, PNG, WebP, GIF, BMP or AVIF file.`);
      }
      const img = await loadImage(f);
      checkPixelBudget(img.naturalWidth, img.naturalHeight);
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      if (outcome) URL.revokeObjectURL(outcome.url);
      setDims({ w: img.naturalWidth, h: img.naturalHeight });
      setFileUrl(URL.createObjectURL(f));
      setFile(f);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that file.");
    }
  };

  const reset = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    if (outcome) URL.revokeObjectURL(outcome.url);
    setFile(null);
    setFileUrl("");
    setOutcome(null);
    setError(null);
    setWorking(false);
  };

  const run = async () => {
    if (!file || working) return;
    setWorking(true);
    setError(null);
    try {
      const img = await loadImage(file);
      const res = await encodeImage(img, img.naturalWidth, img.naturalHeight, toFormat, quality / 100);
      setOutcome(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed. Please try another file.");
    } finally {
      setWorking(false);
    }
  };

  if (!file) {
    return (
      <div>
        <UploadDrop accept="image/*" onFiles={onFiles} title="Select images" description={`or drag and drop your ${fromLabel} files`} />
        {error && <div className="mt-4"><ToolError message={error} onDismiss={() => setError(null)} /></div>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <ToolError message={error} onDismiss={() => setError(null)} />}
      <FileCard url={fileUrl} name={file.name} meta={`${formatBytes(file.size)} · ${dims.w} × ${dims.h}px → ${toLabel}`} onRemove={reset} />

      {!outcome && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <label htmlFor="cquality" className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>{toLabel} quality</span>
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-bold text-blue-700">{quality}%</span>
          </label>
          <input id="cquality" type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="mt-3 w-full accent-blue-600" />
        </div>
      )}

      {!outcome && (
        <div className="flex justify-center pt-1">
          <ActionButton onClick={run} loading={working}>Convert to {toLabel}</ActionButton>
        </div>
      )}
      {working && <ProcessingNote message="Converting…" />}

      {outcome && !working && (
        <ResultView
          originalName={file.name}
          originalSize={file.size}
          originalWidth={dims.w}
          originalHeight={dims.h}
          originalUrl={fileUrl}
          result={outcome}
          downloadName={`${file.name.replace(/\.[a-z0-9]+$/i, "") || "image"}.${toFormat === "jpeg" ? "jpg" : toFormat}`}
          stats={[
            { label: "From", value: fromLabel },
            { label: "To", value: toLabel },
            { label: "Size", value: formatBytes(outcome.sizeBytes) },
          ]}
          onReset={reset}
          nextTools={nextTools}
        />
      )}
    </div>
  );
}
