import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/slugs";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/privacy/"), changeFrequency: "yearly", priority: 0.3 },
    { url: siteUrl("/terms/"), changeFrequency: "yearly", priority: 0.3 },
    { url: siteUrl("/contact/"), changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const p of PAGES) {
    urls.push({
      url: siteUrl(`/${p.slug}/`),
      changeFrequency: "monthly",
      priority: p.hub ? 0.9 : p.kind === "home" ? 1 : 0.8,
    });
  }
  return urls;
}
