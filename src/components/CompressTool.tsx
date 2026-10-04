"use client";

import { useState } from "react";
import {
  checkPixelBudget,
  detectKind,
  formatBytes,
  loadImage,
  messageForKind,
  type TargetSizeResult,
} from "@/lib/image";
import {
  FORMAT_LABEL,
  compressQualityAs,
  compressToTargetSizeAs,
  downloadNameFor,
  type OutputFormat,
} from "@/lib/exact";
import {
  ActionButton,
  FileCard,
  ProcessingNote,
  ResultView,
  ToolError,
  UploadDrop,
} from "@/components/tool-ui";

interface Props {
  /** Output format. null = auto (JPEG/WebP by transparency). */
  format: OutputFormat | null;
  /** Exact KB target. null = hub mode (quality slider). */
  targetKb: number | null;
  pageName: string;
}

const RASTER_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/bmp";

export function CompressTool({ format, targetKb, pageName }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [quality, setQuality] = useState(80);
  const [outcome, setOutcome] = useState<TargetSizeResult | null>(null);
  const [working, setWorking] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isSvg = format === "svg";
  const accept = isSvg ? "image/svg+xml,.svg" : RASTER_ACCEPT;
  const fmtLabel = format ? FORMAT_LABEL[format] : "image";
  const targetBytes = targetKb ? targetKb * 1024 : 0;

  const onFiles = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setOutcome(null);
    setLog([]);
    try {
      if (isSvg) {
        const text = await f.text();
        if (!/<svg[\s>]/i.test(text.slice(0, 2000))) {
          throw new Error("That file doesn't look like a real SVG. Please choose a genuine .svg file.");
        }
        setDims({ w: 0, h: 0 });
      } else {
        const kind = await detectKind(f);
        if (!["jpeg", "png", "webp", "gif", "bmp"].includes(kind)) {
          throw new Error(messageForKind(kind));
        }
        const img = await loadImage(f);
        checkPixelBudget(img.naturalWidth, img.naturalHeight);
        setDims({ w: img.naturalWidth, h: img.naturalHeight });
      }
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      if (outcome) URL.revokeObjectURL(outcome.result.url);
      setOutcome(null);
      setFileUrl(URL.createObjectURL(f));
      setFile(f);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that file. Please try another file.");
    }
  };

  const reset = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    if (outcome) URL.revokeObjectURL(outcome.result.url);
    setFile(null);
    setFileUrl("");
    setOutcome(null);
    setError(null);
    setWorking(false);
    setLog([]);
  };

  const run = async () => {
    if (!file || working) return;
    setWorking(true);
    setOutcome(null);
    setError(null);
    const effFormat: OutputFormat = format ?? "jpeg";
    setLog([targetKb ? `Target: ${formatBytes(targetBytes)} — starting…` : `Compressing ${fmtLabel} at ${quality}% quality…`]);
    const started = performance.now();
    try {
      const res = targetKb
        ? await compressToTargetSizeAs(file, targetBytes, effFormat, (m) =>
            setLog((prev) => [...prev.slice(-4), m])
          )
        : await compressQualityAs(file, effFormat, quality / 100, (m) =>
            setLog((prev) => [...prev.slice(-4), m])
          );
      setOutcome(res);
      void started;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed. Please try another file.");
    } finally {
      setWorking(false);
    }
  };

  const resultFormat: OutputFormat = format ?? "jpeg";

  if (!file) {
    return (
      <div>
        <UploadDrop
          accept={accept}
          onFiles={onFiles}
          title="Select images"
          description={
            targetKb
              ? `or drag and drop — we'll squeeze it under ${targetKb}KB`
              : `or drag and drop your ${fmtLabel} files`
          }
        />
        {error && (
          <div className="mt-4">
            <ToolError message={error} onDismiss={() => setError(null)} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <ToolError message={error} onDismiss={() => setError(null)} />}

      <FileCard
        url={isSvg ? "" : fileUrl}
        name={file.name}
        meta={
          dims.w > 0
            ? `${formatBytes(file.size)} · ${dims.w} × ${dims.h}px${targetKb ? ` → target ${targetKb}KB` : ""}`
            : `${formatBytes(file.size)}${targetKb ? ` → target ${targetKb}KB` : ""}`
        }
        onRemove={reset}
      />

      {!outcome && !targetKb && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <label htmlFor="quality" className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Quality</span>
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-bold text-blue-700">{quality}%</span>
          </label>
          <input
            id="quality"
            type="range"
            min={1}
            max={99}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="mt-3 w-full accent-blue-600"
          />
          <p className="mt-2 text-xs text-slate-500">Lower quality = smaller file. 80% is a good balance for most images.</p>
        </div>
      )}

      {!outcome && (
        <div className="flex justify-center pt-1">
          <ActionButton onClick={run} loading={working}>
            {targetKb ? `Compress to ${targetKb}KB` : `Compress ${fmtLabel}`}
          </ActionButton>
        </div>
      )}

      {working && (
        <div>
          <ProcessingNote message={log[log.length - 1] ?? "Working…"} />
          {log.length > 1 && (
            <ul className="mt-3 space-y-1.5 text-xs font-medium text-slate-500" aria-label="Compression attempts">
              {log.slice(0, -1).map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-700" aria-hidden="true">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {outcome && !working && (
        <ResultView
          originalName={file.name}
          originalSize={file.size}
          originalWidth={dims.w}
          originalHeight={dims.h}
          originalUrl={fileUrl}
          result={outcome.result}
          downloadName={downloadNameFor(
            file.name,
            targetKb ? `${targetKb}kb` : "compressed",
            outcome.result.blob.type === "image/webp"
              ? "webp"
              : outcome.result.blob.type === "image/png"
                ? "png"
                : outcome.result.blob.type === "image/gif"
                  ? "gif"
                  : outcome.result.blob.type === "image/svg+xml"
                    ? "svg"
                    : resultFormat === "svg"
                      ? "svg"
                      : "jpeg"
          )}
          stats={[
            ...(targetKb ? [{ label: "Target", value: `${targetKb} KB` }] : []),
            {
              label: "Result",
              value: `${formatBytes(outcome.result.sizeBytes)}${outcome.reached ? "" : " (missed)"}`,
            },
            ...(outcome.result.width > 0
              ? [{ label: "Dimensions", value: `${outcome.result.width} × ${outcome.result.height}` }]
              : []),
            { label: "Saved", value: file.size > outcome.result.sizeBytes ? `${Math.round((1 - outcome.result.sizeBytes / file.size) * 100)}%` : "—" },
          ]}
          note={outcome.note || (targetKb && outcome.reached ? `Done — your file is ${formatBytes(outcome.result.sizeBytes)}, at or under the ${targetKb}KB target.` : "")}
          onReset={reset}
        />
      )}
    </div>
  );
}
