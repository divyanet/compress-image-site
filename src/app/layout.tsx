import type { Metadata } from "next";
import { SITE, siteUrl } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Free Online Image Compressor`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Compress images online for free. Shrink JPG, PNG, WebP, GIF and SVG to any exact KB size — 100% in your browser, no uploads, no signup.",
  alternates: { canonical: siteUrl("/") },
  openGraph: {
    type: "website",
    url: siteUrl("/"),
    siteName: SITE.name,
    title: `${SITE.name} — Free Online Image Compressor`,
    description:
      "Shrink images to any exact KB size. Free, private, no uploads — everything runs in your browser.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-slate-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
