"use client";

import { useState } from "react";
import {
  checkPixelBudget,
  detectKind,
  downloadName,
  encodeImage,
  formatBytes,
  loadImage,
  messageForKind,
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
  pageName: string;
  presetLabel?: string;
  presetW?: number;
  presetH?: number;
  /** iLoveIMG-style chaining shown on the result screen. */
  nextTools?: { label: string; href: string }[];
}

type Mode = "width" | "height" | "percent" | "dimensions";

export function ResizeTool({ pageName, presetLabel, presetW, presetH, nextTools }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [mode, setMode] = useState<Mode>(presetW && presetH ? "dimensions" : "width");
  const [width, setWidth] = useState(presetW?.toString() ?? "800");
  const [height, setHeight] = useState(presetH?.toString() ?? "600");
  const [percent, setPercent] = useState("50");
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [quality, setQuality] = useState(85);
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
      if (!["jpeg", "png", "webp"].includes(kind)) throw new Error(messageForKind(kind));
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
      let w = dims.w;
      let h = dims.h;
      if (mode === "percent") {
        const p = Math.max(1, Math.min(1000, Number(percent) || 50));
        w = (dims.w * p) / 100;
        h = (dims.h * p) / 100;
      } else if (mode === "width") {
        w = Math.max(1, Number(width) || dims.w);
        h = lock ? (dims.h * w) / dims.w : Math.max(1, Number(height) || dims.h);
      } else if (mode === "height") {
        h = Math.max(1, Number(height) || dims.h);
        w = lock ? (dims.w * h) / dims.h : Math.max(1, Number(width) || dims.w);
      } else {
        w = Math.max(1, Number(width) || dims.w);
        h = Math.max(1, Number(height) || dims.h);
        if (lock) h = (dims.h * w) / dims.w;
      }
      const res = await encodeImage(img, w, h, format, quality / 100);
      setOutcome(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resize failed. Please try another image.");
    } finally {
      setWorking(false);
    }
  };

  const tabs: { id: Mode; label: string }[] = [
    { id: "width", label: "Width" },
    { id: "height", label: "Height" },
    { id: "dimensions", label: "W × H" },
    { id: "percent", label: "%" },
  ];

  if (!file) {
    return (
      <div>
        <UploadDrop accept="image/jpeg,image/png,image/webp" onFiles={onFiles} title="Select images" description="or drag and drop your image" />
        {error && <div className="mt-4"><ToolError message={error} onDismiss={() => setError(null)} /></div>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <ToolError message={error} onDismiss={() => setError(null)} />}
      <FileCard url={fileUrl} name={file.name} meta={`${formatBytes(file.size)} · ${dims.w} × ${dims.h}px`} onRemove={reset} />

      {!outcome && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          {presetLabel && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-#7a1a17">
              Preset: {presetLabel} — adjust below if needed.
            </p>
          )}
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={mode === t.id}
                onClick={() => setMode(t.id)}
                className={`flex-1 rounded-lg px-2 py-2 text-sm font-semibold ${mode === t.id ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {(mode === "width" || mode === "dimensions") && (
            <label className="block text-sm font-semibold text-slate-700">
              Width (px)
              <input type="number" min={1} value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5" />
            </label>
          )}
          {(mode === "height" || mode === "dimensions") && (
            <label className="block text-sm font-semibold text-slate-700">
              Height (px)
              <input type="number" min={1} value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5" />
            </label>
          )}
          {mode === "percent" && (
            <label className="block text-sm font-semibold text-slate-700">
              Percent of original (%)
              <input type="number" min={1} max={1000} value={percent} onChange={(e) => setPercent(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5" />
            </label>
          )}
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="h-4 w-4 accent-#e5322d" />
            Lock aspect ratio
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-semibold text-slate-700">
              Format
              <select value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5">
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Quality ({quality}%)
              <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="mt-3 w-full accent-#e5322d" />
            </label>
          </div>
        </div>
      )}

      {!outcome && (
        <div className="flex justify-center pt-1">
          <ActionButton onClick={run} loading={working}>Resize Image</ActionButton>
        </div>
      )}
      {working && <ProcessingNote message="Resizing…" />}

      {outcome && !working && (
        <ResultView
          originalName={file.name}
          originalSize={file.size}
          originalWidth={dims.w}
          originalHeight={dims.h}
          originalUrl={fileUrl}
          result={outcome}
          downloadName={downloadName(file.name, "resized", format)}
          stats={[
            { label: "Before", value: `${dims.w} × ${dims.h}` },
            { label: "After", value: `${outcome.width} × ${outcome.height}` },
            { label: "Size", value: formatBytes(outcome.sizeBytes) },
          ]}
          onReset={reset}
          nextTools={nextTools}
        />
      )}
    </div>
  );
}
