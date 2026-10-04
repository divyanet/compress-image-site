import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          {SITE.name} is designed to be private by default. All image compression happens
          locally in your web browser, on your own device.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">What we don't collect</h2>
        <p>
          We never receive, store, or see your images. Files you compress are processed
          entirely on your device and are never uploaded to our servers.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">What we do collect</h2>
        <p>
          We may use privacy-friendly analytics to understand which tools are popular, and
          advertising partners (such as Google AdSense) may use cookies to serve ads. You
          can control cookies through your browser settings.
        </p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">Contact</h2>
        <p>
          Questions about privacy? Email us at{" "}
          <a className="text-blue-600 hover:underline" href={`mailto:${SITE.contactEmail}`}>
            {SITE.contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
