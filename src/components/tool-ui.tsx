"use client";

import { useCallback, useRef, useState } from "react";
import { formatBytes, type ProcessedImage } from "@/lib/image";

/* ------------------------------------------------------------------ */
/* UploadDrop — big iLoveIMG-style dropzone                            */
/* ------------------------------------------------------------------ */

interface UploadDropProps {
  accept: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title?: string;
  description?: string;
}

export function UploadDrop({
  accept,
  maxSizeMB = 25,
  multiple = false,
  onFiles,
  title = "Select images",
  description = "or drag and drop your files here",
}: UploadDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (list: FileList | File[]) => {
      const files = Array.from(list);
      if (files.length === 0) return;
      const valid: File[] = [];
      for (const f of files) {
        if (!f.type.startsWith("image/")) {
          setError(`"${f.name}" is not an image file.`);
          continue;
        }
        if (f.size > maxSizeMB * 1024 * 1024) {
          setError(`"${f.name}" is larger than ${maxSizeMB} MB.`);
          continue;
        }
        valid.push(f);
      }
      if (valid.length > 0) {
        setError(null);
        onFiles(multiple ? valid : [valid[0]]);
      }
    },
    [maxSizeMB, multiple, onFiles]
  );

  const formats = accept
    .split(",")
    .map((s) => s.replace("image/", "").trim().toUpperCase())
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-[28px] border-[3px] border-dashed bg-white px-6 py-14 text-center transition-all sm:py-20 ${
          dragging
            ? "scale-[1.01] border-blue-600 bg-blue-50 shadow-xl shadow-blue-100"
            : "border-slate-300 shadow-sm hover:border-blue-400 hover:shadow-md"
        }`}
      >
        <span
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-colors ${
            dragging ? "bg-blue-700 shadow-blue-200" : "bg-blue-600 shadow-blue-600/25"
          }`}
          aria-hidden="true"
        >
          <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
        <p className="mt-5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</p>
        <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{description}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {formats && (
            <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
              {formats}
            </span>
          )}
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
            Max {maxSizeMB} MB
          </span>
          <span className="rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-semibold text-green-700">
            100% private
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FileCard — selected file thumbnail with remove button               */
/* ------------------------------------------------------------------ */

interface FileCardProps {
  url: string;
  name: string;
  meta: string;
  onRemove?: () => void;
}

export function FileCard({ url, name, meta, onRemove }: FileCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="h-full w-full object-contain" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
        <p className="mt-0.5 text-xs text-slate-500">{meta}</p>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ActionButton — the one big CTA, iLoveIMG style                      */
/* ------------------------------------------------------------------ */

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
}

export function ActionButton({ children, onClick, disabled, loading, type = "button" }: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-700/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-auto sm:min-w-72"
    >
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" aria-hidden="true" />
          <span>Working…</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* SectionCard — clean white settings card                             */
/* ------------------------------------------------------------------ */

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-label={title}>
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ResultView — before/after comparison, stats, download               */
/* ------------------------------------------------------------------ */

export interface ResultStat {
  label: string;
  value: string;
}

interface ResultViewProps {
  originalName: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalUrl: string;
  result: ProcessedImage;
  downloadName: string;
  stats?: ResultStat[];
  note?: string;
  onReset: () => void;
}

export function ResultView({
  originalName,
  originalSize,
  originalWidth,
  originalHeight,
  originalUrl,
  result,
  downloadName,
  stats = [],
  note,
  onReset,
}: ResultViewProps) {
  const reduction =
    originalSize > 0 ? Math.max(0, ((originalSize - result.sizeBytes) / originalSize) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-green-50 px-5 py-4 sm:px-7">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600" aria-hidden="true">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <div>
          <p className="font-bold text-green-900">Done! Your image is ready.</p>
          <p className="text-xs text-green-700">Processed privately in your browser — nothing was uploaded.</p>
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2">
        <figure className="border-b border-slate-100 sm:border-b-0 sm:border-r">
          <div className="flex h-52 items-center justify-center bg-slate-50 p-4 sm:h-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={originalUrl}
              alt={`Original: ${originalName}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
            />
          </div>
          <figcaption className="px-5 py-4 sm:px-7">
            <p className="text-sm font-bold text-slate-800">Original</p>
            <p className="mt-0.5 text-sm text-slate-500">
              {formatBytes(originalSize)} · {originalWidth} × {originalHeight}px
            </p>
          </figcaption>
        </figure>
        <figure>
          <div
            className="flex h-52 items-center justify-center p-4 sm:h-60"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%), linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
              backgroundColor: "#f8fafc",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.url}
              alt="Processed result"
              className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
            />
          </div>
          <figcaption className="px-5 py-4 sm:px-7">
            <p className="text-sm font-bold text-slate-800">Result</p>
            <p className="mt-0.5 text-sm text-slate-500">
              {formatBytes(result.sizeBytes)} · {result.width} × {result.height}px
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Saved</p>
            <p className="text-3xl font-extrabold text-green-700">{reduction.toFixed(1)}%</p>
          </div>
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold text-slate-800">{s.value}</p>
            </div>
          ))}
        </div>

        {note && (
          <p role="status" className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {note}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={result.url}
            download={downloadName}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] sm:flex-none sm:px-12"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download image
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Process another
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared bits                                                   */
/* ------------------------------------------------------------------ */

export function ProcessingNote({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-blue-50 px-5 py-4" role="status" aria-live="polite">
      <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-blue-600 border-t-transparent" aria-hidden="true" />
      <p className="text-sm font-semibold text-blue-900">{message}</p>
    </div>
  );
}

export function ToolError({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-red-50 px-5 py-4" role="alert">
      <p className="text-sm font-medium text-red-800">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-sm font-bold text-red-700 underline"
      >
        Dismiss
      </button>
    </div>
  );
}
