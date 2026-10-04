import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Contact</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
        Questions, feedback, or a tool request? We'd love to hear from you.
      </p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold text-slate-700">Email us at</p>
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="mt-1 inline-block text-lg font-bold text-blue-600 hover:underline"
        >
          {SITE.contactEmail}
        </a>
        <p className="mt-3 text-sm text-slate-500">
          We read every message and usually reply within a couple of days.
        </p>
      </div>
    </div>
  );
}
