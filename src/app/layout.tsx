import type { Metadata } from "next";
import { SITE, siteUrl } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `Free Image Compressor — Compress Images Online | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Free online image compressor. Compress JPG, PNG, WebP, GIF, SVG and PDF to any exact KB size in your browser — no signup, no watermark. Try now!",
  alternates: { canonical: siteUrl("/") },
  openGraph: {
    type: "website",
    url: siteUrl("/"),
    siteName: SITE.name,
    title: `Free Image Compressor — Compress Images Online | ${SITE.name}`,
    description:
      "Compress images to any exact KB size. Free, private, no uploads — everything runs in your browser.",
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
