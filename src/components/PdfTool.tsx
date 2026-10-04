"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { formatBytes } from "@/lib/image";
import {
  ActionButton,
  FileCard,
  ProcessingNote,
  ResultView,
  ToolError,
  UploadDrop,
} from "@/components/tool-ui";

interface Props {
  targetKb: number | null;
}

interface PdfOutcome {
  blob: Blob;
  url: string;
  sizeBytes: number;
  reached: boolean;
  note: string;
}

async function optimizePdf(file: File, onStep: (m: string) => void): Promise<Blob> {
  onStep("Reading PDF…");
  const buf = await file.arrayBuffer();
  let doc;
  try {
    doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  } catch {
    throw new Error("That PDF couldn't be opened — it may be password-protected or corrupted.");
  }
  onStep("Stripping metadata…");
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");
  onStep("Recompressing…");
  const a = await doc.save({ useObjectStreams: true });
  const b = await doc.save({ useObjectStreams: false });
  const bytes = a.length <= b.length ? a : b;
  return new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

export function PdfTool({ targetKb }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [outcome, setOutcome] = useState<PdfOutcome | null>(null);
  const [working, setWorking] = useState(false);
  const [status, setStatus] = useState("Working…");
  const [error, setError] = useState<string | null>(null);

  const targetBytes = targetKb ? targetKb * 1024 : 0;

  const onFiles = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setOutcome(null);
    const head = new Uint8Array(await f.slice(0, 5).arrayBuffer());
    const sig = String.fromCharCode(...head);
    if (!sig.startsWith("%PDF")) {
      setError("That file doesn't look like a real PDF. Please choose a genuine .pdf file.");
      return;
    }
    if (f.size > 100 * 1024 * 1024) {
      setError("That PDF is over 100MB — too large to process safely in a browser tab.");
      return;
    }
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    if (outcome) URL.revokeObjectURL(outcome.url);
    setFileUrl(URL.createObjectURL(f));
    setFile(f);
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
    setOutcome(null);
    setError(null);
    try {
      const blob = await optimizePdf(file, setStatus);
      const reached = !targetKb || blob.size <= targetBytes;
      setOutcome({
        blob,
        url: URL.createObjectURL(blob),
        sizeBytes: blob.size,
        reached,
        note: targetKb
          ? reached
            ? `Done — your PDF is ${formatBytes(blob.size)}, at or under the ${targetKb}KB target.`
            : `Honest result: even after stripping metadata and recompressing, this PDF is ${formatBytes(blob.size)}. PDFs made of scanned images can only shrink so far without re-encoding the images themselves — ${formatBytes(targetBytes)} isn't reachable for this file.`
          : `Optimized from ${formatBytes(file.size)} to ${formatBytes(blob.size)} by stripping metadata and recompressing content.`,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF optimization failed. Please try another file.");
    } finally {
      setWorking(false);
    }
  };

  if (!file) {
    return (
      <div>
        <UploadDrop accept="application/pdf,.pdf" onFiles={onFiles} title="Select PDF" description={targetKb ? `or drag and drop — we'll shrink it toward ${targetKb}KB` : "or drag and drop your PDF"} />
        {error && <div className="mt-4"><ToolError message={error} onDismiss={() => setError(null)} /></div>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <ToolError message={error} onDismiss={() => setError(null)} />}
      <FileCard
        url=""
        name={file.name}
        meta={`${formatBytes(file.size)}${targetKb ? ` → target ${targetKb}KB` : ""}`}
        onRemove={reset}
      />
      {!outcome && (
        <div className="flex justify-center pt-1">
          <ActionButton onClick={run} loading={working}>
            {targetKb ? `Compress to ${targetKb}KB` : "Compress PDF"}
          </ActionButton>
        </div>
      )}
      {working && <ProcessingNote message={status} />}
      {outcome && !working && (
        <ResultView
          originalName={file.name}
          originalSize={file.size}
          originalWidth={0}
          originalHeight={0}
          originalUrl={fileUrl}
          result={{ blob: outcome.blob, url: outcome.url, width: 0, height: 0, sizeBytes: outcome.sizeBytes }}
          downloadName={(file.name.replace(/\.pdf$/i, "") || "document") + (targetKb ? `-${targetKb}kb.pdf` : "-compressed.pdf")}
          stats={[
            ...(targetKb ? [{ label: "Target", value: `${targetKb} KB` }] : []),
            { label: "Before", value: formatBytes(file.size) },
            { label: "After", value: `${formatBytes(outcome.sizeBytes)}${outcome.reached ? "" : " (missed)"}` },
          ]}
          note={outcome.note}
          onReset={reset}
        />
      )}
    </div>
  );
}
