import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Terms of Service</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          By using {SITE.name}, you agree to these terms. The tools are provided free of
          charge, "as is", without warranties of any kind.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">Acceptable use</h2>
        <p>
          You may use the tools for any lawful purpose. You are responsible for ensuring
          you have the rights to any images you process.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">No guarantees</h2>
        <p>
          While our tools aim for exact target sizes, results depend on the source file.
          The tool always reports honest, real output sizes — please verify results before
          relying on them for critical submissions.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">Changes</h2>
        <p>We may update these terms at any time. Continued use of the site means you accept the current terms.</p>
      </div>
    </div>
  );
}
