export const SITE = {
  name: "CompressImage",
  tagline: "Free online image compressor",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://compressimage.app",
  contactEmail: "hello@compressimage.app",
};

export function siteUrl(path = ""): string {
  const base = SITE.domain.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
