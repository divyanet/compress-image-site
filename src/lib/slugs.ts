/**
 * Programmatic page config — generated from the URL plan CSV.
 * 353 slugs: hubs + exact-size pages + reduce/resize/converter/pdf pages.
 */
export type PageKind = "home" | "hub" | "size" | "reduce" | "resize" | "converter" | "pdf";
export type PageFormat = "jpeg" | "png" | "webp" | "gif" | "svg" | null;

export interface PageDef {
  slug: string;
  category: string;
  name: string;
  kind: PageKind;
  format: PageFormat;
  targetKb: number | null;
  hub: boolean;
}

export const PAGES: PageDef[] = [
 {
  "slug": "compress-jpeg",
  "category": "Compress JPEG",
  "name": "Compress JPEG",
  "kind": "hub",
  "format": "jpeg",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-jpeg-to-100kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 100KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-1kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 1KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-10kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 10KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-50kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 50KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-500kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 500KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-5kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 5KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-15kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 15KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-20kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 20KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-25kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 25KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-30kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 30KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-35kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 35KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-40kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 40KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-45kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 45KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-55kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 55KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-60kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 60KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-65kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 65KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-70kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 70KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-75kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 75KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-80kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 80KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-85kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 85KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-90kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 90KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-95kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 95KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-110kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 110KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-120kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 120KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-130kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 130KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-140kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 140KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-150kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 150KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-160kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 160KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-170kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 170KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-180kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 180KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-190kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 190KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-200kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 200KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-250kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 250KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-300kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 300KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-350kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 350KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-400kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 400KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-jpeg-to-450kb",
  "category": "Compress JPEG",
  "name": "Compress JPEG to 450KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-image",
  "category": "Compress Image",
  "name": "Compress Image",
  "kind": "hub",
  "format": null,
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-image-to-20kb",
  "category": "Compress Image",
  "name": "Compress Image to 20KB",
  "kind": "size",
  "format": null,
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-image-to-5kb",
  "category": "Compress Image",
  "name": "Compress Image to 5KB",
  "kind": "size",
  "format": null,
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-image-to-10kb",
  "category": "Compress Image",
  "name": "Compress Image to 10KB",
  "kind": "size",
  "format": null,
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-image-to-15kb",
  "category": "Compress Image",
  "name": "Compress Image to 15KB",
  "kind": "size",
  "format": null,
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-image-to-25kb",
  "category": "Compress Image",
  "name": "Compress Image to 25KB",
  "kind": "size",
  "format": null,
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-image-to-30kb",
  "category": "Compress Image",
  "name": "Compress Image to 30KB",
  "kind": "size",
  "format": null,
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-image-to-35kb",
  "category": "Compress Image",
  "name": "Compress Image to 35KB",
  "kind": "size",
  "format": null,
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-image-to-40kb",
  "category": "Compress Image",
  "name": "Compress Image to 40KB",
  "kind": "size",
  "format": null,
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-image-to-45kb",
  "category": "Compress Image",
  "name": "Compress Image to 45KB",
  "kind": "size",
  "format": null,
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-image-to-50kb",
  "category": "Compress Image",
  "name": "Compress Image to 50KB",
  "kind": "size",
  "format": null,
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-image-to-55kb",
  "category": "Compress Image",
  "name": "Compress Image to 55KB",
  "kind": "size",
  "format": null,
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-image-to-60kb",
  "category": "Compress Image",
  "name": "Compress Image to 60KB",
  "kind": "size",
  "format": null,
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-image-to-65kb",
  "category": "Compress Image",
  "name": "Compress Image to 65KB",
  "kind": "size",
  "format": null,
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-image-to-70kb",
  "category": "Compress Image",
  "name": "Compress Image to 70KB",
  "kind": "size",
  "format": null,
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-image-to-75kb",
  "category": "Compress Image",
  "name": "Compress Image to 75KB",
  "kind": "size",
  "format": null,
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-image-to-80kb",
  "category": "Compress Image",
  "name": "Compress Image to 80KB",
  "kind": "size",
  "format": null,
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-image-to-85kb",
  "category": "Compress Image",
  "name": "Compress Image to 85KB",
  "kind": "size",
  "format": null,
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-image-to-90kb",
  "category": "Compress Image",
  "name": "Compress Image to 90KB",
  "kind": "size",
  "format": null,
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-image-to-95kb",
  "category": "Compress Image",
  "name": "Compress Image to 95KB",
  "kind": "size",
  "format": null,
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-image-to-100kb",
  "category": "Compress Image",
  "name": "Compress Image to 100KB",
  "kind": "size",
  "format": null,
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-image-to-110kb",
  "category": "Compress Image",
  "name": "Compress Image to 110KB",
  "kind": "size",
  "format": null,
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-image-to-120kb",
  "category": "Compress Image",
  "name": "Compress Image to 120KB",
  "kind": "size",
  "format": null,
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-image-to-130kb",
  "category": "Compress Image",
  "name": "Compress Image to 130KB",
  "kind": "size",
  "format": null,
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-image-to-140kb",
  "category": "Compress Image",
  "name": "Compress Image to 140KB",
  "kind": "size",
  "format": null,
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-image-to-150kb",
  "category": "Compress Image",
  "name": "Compress Image to 150KB",
  "kind": "size",
  "format": null,
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-image-to-160kb",
  "category": "Compress Image",
  "name": "Compress Image to 160KB",
  "kind": "size",
  "format": null,
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-image-to-170kb",
  "category": "Compress Image",
  "name": "Compress Image to 170KB",
  "kind": "size",
  "format": null,
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-image-to-180kb",
  "category": "Compress Image",
  "name": "Compress Image to 180KB",
  "kind": "size",
  "format": null,
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-image-to-190kb",
  "category": "Compress Image",
  "name": "Compress Image to 190KB",
  "kind": "size",
  "format": null,
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-image-to-200kb",
  "category": "Compress Image",
  "name": "Compress Image to 200KB",
  "kind": "size",
  "format": null,
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-image-to-250kb",
  "category": "Compress Image",
  "name": "Compress Image to 250KB",
  "kind": "size",
  "format": null,
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-image-to-300kb",
  "category": "Compress Image",
  "name": "Compress Image to 300KB",
  "kind": "size",
  "format": null,
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-image-to-350kb",
  "category": "Compress Image",
  "name": "Compress Image to 350KB",
  "kind": "size",
  "format": null,
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-image-to-400kb",
  "category": "Compress Image",
  "name": "Compress Image to 400KB",
  "kind": "size",
  "format": null,
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-image-to-450kb",
  "category": "Compress Image",
  "name": "Compress Image to 450KB",
  "kind": "size",
  "format": null,
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-image-to-500kb",
  "category": "Compress Image",
  "name": "Compress Image to 500KB",
  "kind": "size",
  "format": null,
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-image-to-1kb",
  "category": "Compress Image",
  "name": "Compress Image to 1KB",
  "kind": "size",
  "format": null,
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-pdf/100kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 100KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-pdf/200kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 200KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-pdf/300kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 300KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-pdf/500kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 500KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-pdf",
  "category": "Compress PDF",
  "name": "Compress PDF",
  "kind": "pdf",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "compress-pdf/5kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 5KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-pdf/10kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 10KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-pdf/15kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 15KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-pdf/20kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 20KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-pdf/25kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 25KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-pdf/30kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 30KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-pdf/35kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 35KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-pdf/40kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 40KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-pdf/45kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 45KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-pdf/50kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 50KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-pdf/55kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 55KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-pdf/60kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 60KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-pdf/65kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 65KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-pdf/70kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 70KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-pdf/75kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 75KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-pdf/80kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 80KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-pdf/85kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 85KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-pdf/90kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 90KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-pdf/95kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 95KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-pdf/110kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 110KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-pdf/120kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 120KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-pdf/130kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 130KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-pdf/140kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 140KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-pdf/150kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 150KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-pdf/160kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 160KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-pdf/170kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 170KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-pdf/180kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 180KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-pdf/190kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 190KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-pdf/250kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 250KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-pdf/350kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 350KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-pdf/400kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 400KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-pdf/450kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 450KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-pdf/1kb",
  "category": "Compress PDF",
  "name": "Compress PDF to 1KB",
  "kind": "pdf",
  "format": null,
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in KB",
  "kind": "reduce",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-5kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 5KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-10kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 10KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-15kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 15KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-20kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 20KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-25kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 25KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-30kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 30KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-35kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 35KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-40kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 40KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-45kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 45KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-50kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 50KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-55kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 55KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-60kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 60KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-65kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 65KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-70kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 70KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-75kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 75KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-80kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 80KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-85kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 85KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-90kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 90KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-95kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 95KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-100kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 100KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-110kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 110KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-120kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 120KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-130kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 130KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-140kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 140KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-150kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 150KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-160kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 160KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-170kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 170KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-180kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 180KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-190kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 190KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "reduce-image-size-in-200kb",
  "category": "Reduce Image Size",
  "name": "Reduce Image Size in 200KB",
  "kind": "reduce",
  "format": null,
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "resize-image",
  "category": "Resize Image",
  "name": "Resize Image",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-pixel-online",
  "category": "Resize Image",
  "name": "Resize Image Pixel Online",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-in-cm",
  "category": "Resize Image",
  "name": "Resize Image in cm",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-in-mm",
  "category": "Resize Image",
  "name": "Resize Image in mm",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-in-inch",
  "category": "Resize Image",
  "name": "Resize Image in Inch",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-3.5cmX4.5cm",
  "category": "Resize Image",
  "name": "Resize Image to 3.5cm x 4.5cm",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-3x4",
  "category": "Resize Image",
  "name": "Resize Image to 3x4",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-600x600-pixel",
  "category": "Resize Image",
  "name": "Resize Image to 600x600 Pixel",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-2x2",
  "category": "Resize Image",
  "name": "Resize Image to 2x2",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-4x6",
  "category": "Resize Image",
  "name": "Resize Image to 4x6",
  "kind": "resize",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "resize-image-to-20kb",
  "category": "Resize Image",
  "name": "Resize Image to 20KB",
  "kind": "resize",
  "format": null,
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "heic-to-jpg",
  "category": "Image Converter",
  "name": "HEIC to JPG",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "avif-to-jpg",
  "category": "Image Converter",
  "name": "AVIF to JPG",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "jpg-to-webp",
  "category": "Image Converter",
  "name": "JPG to WebP",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "bmp-to-jpg",
  "category": "Image Converter",
  "name": "BMP to JPG",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "tiff-to-jpg",
  "category": "Image Converter",
  "name": "TIFF to JPG",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "gif-to-jpg",
  "category": "Image Converter",
  "name": "GIF to JPG",
  "kind": "converter",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "",
  "category": "Home",
  "name": "Home",
  "kind": "home",
  "format": null,
  "targetKb": null,
  "hub": false
 },
 {
  "slug": "compress-jpg",
  "category": "Compress JPG",
  "name": "Compress JPG",
  "kind": "hub",
  "format": "jpeg",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-jpg-to-1kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 1KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-5kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 5KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-10kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 10KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-15kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 15KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-20kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 20KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-25kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 25KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-30kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 30KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-35kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 35KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-40kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 40KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-45kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 45KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-50kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 50KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-55kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 55KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-60kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 60KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-65kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 65KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-70kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 70KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-75kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 75KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-80kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 80KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-85kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 85KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-90kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 90KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-95kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 95KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-100kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 100KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-110kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 110KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-120kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 120KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-130kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 130KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-140kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 140KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-150kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 150KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-160kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 160KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-170kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 170KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-180kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 180KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-190kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 190KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-200kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 200KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-250kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 250KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-300kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 300KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-350kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 350KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-400kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 400KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-450kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 450KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-jpg-to-500kb",
  "category": "Compress JPG",
  "name": "Compress JPG to 500KB",
  "kind": "size",
  "format": "jpeg",
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-png",
  "category": "Compress PNG",
  "name": "Compress PNG",
  "kind": "hub",
  "format": "png",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-png-to-1kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 1KB",
  "kind": "size",
  "format": "png",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-png-to-5kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 5KB",
  "kind": "size",
  "format": "png",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-png-to-10kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 10KB",
  "kind": "size",
  "format": "png",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-png-to-15kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 15KB",
  "kind": "size",
  "format": "png",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-png-to-20kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 20KB",
  "kind": "size",
  "format": "png",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-png-to-25kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 25KB",
  "kind": "size",
  "format": "png",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-png-to-30kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 30KB",
  "kind": "size",
  "format": "png",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-png-to-35kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 35KB",
  "kind": "size",
  "format": "png",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-png-to-40kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 40KB",
  "kind": "size",
  "format": "png",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-png-to-45kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 45KB",
  "kind": "size",
  "format": "png",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-png-to-50kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 50KB",
  "kind": "size",
  "format": "png",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-png-to-55kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 55KB",
  "kind": "size",
  "format": "png",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-png-to-60kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 60KB",
  "kind": "size",
  "format": "png",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-png-to-65kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 65KB",
  "kind": "size",
  "format": "png",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-png-to-70kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 70KB",
  "kind": "size",
  "format": "png",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-png-to-75kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 75KB",
  "kind": "size",
  "format": "png",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-png-to-80kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 80KB",
  "kind": "size",
  "format": "png",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-png-to-85kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 85KB",
  "kind": "size",
  "format": "png",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-png-to-90kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 90KB",
  "kind": "size",
  "format": "png",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-png-to-95kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 95KB",
  "kind": "size",
  "format": "png",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-png-to-100kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 100KB",
  "kind": "size",
  "format": "png",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-png-to-110kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 110KB",
  "kind": "size",
  "format": "png",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-png-to-120kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 120KB",
  "kind": "size",
  "format": "png",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-png-to-130kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 130KB",
  "kind": "size",
  "format": "png",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-png-to-140kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 140KB",
  "kind": "size",
  "format": "png",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-png-to-150kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 150KB",
  "kind": "size",
  "format": "png",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-png-to-160kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 160KB",
  "kind": "size",
  "format": "png",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-png-to-170kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 170KB",
  "kind": "size",
  "format": "png",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-png-to-180kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 180KB",
  "kind": "size",
  "format": "png",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-png-to-190kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 190KB",
  "kind": "size",
  "format": "png",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-png-to-200kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 200KB",
  "kind": "size",
  "format": "png",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-png-to-250kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 250KB",
  "kind": "size",
  "format": "png",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-png-to-300kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 300KB",
  "kind": "size",
  "format": "png",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-png-to-350kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 350KB",
  "kind": "size",
  "format": "png",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-png-to-400kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 400KB",
  "kind": "size",
  "format": "png",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-png-to-450kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 450KB",
  "kind": "size",
  "format": "png",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-png-to-500kb",
  "category": "Compress PNG",
  "name": "Compress PNG to 500KB",
  "kind": "size",
  "format": "png",
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-svg",
  "category": "Compress SVG",
  "name": "Compress SVG",
  "kind": "hub",
  "format": "svg",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-svg-to-1kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 1KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-svg-to-5kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 5KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-svg-to-10kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 10KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-svg-to-15kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 15KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-svg-to-20kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 20KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-svg-to-25kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 25KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-svg-to-30kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 30KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-svg-to-35kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 35KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-svg-to-40kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 40KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-svg-to-45kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 45KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-svg-to-50kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 50KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-svg-to-55kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 55KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-svg-to-60kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 60KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-svg-to-65kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 65KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-svg-to-70kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 70KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-svg-to-75kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 75KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-svg-to-80kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 80KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-svg-to-85kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 85KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-svg-to-90kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 90KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-svg-to-95kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 95KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-svg-to-100kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 100KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-svg-to-110kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 110KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-svg-to-120kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 120KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-svg-to-130kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 130KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-svg-to-140kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 140KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-svg-to-150kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 150KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-svg-to-160kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 160KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-svg-to-170kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 170KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-svg-to-180kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 180KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-svg-to-190kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 190KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-svg-to-200kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 200KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-svg-to-250kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 250KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-svg-to-300kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 300KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-svg-to-350kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 350KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-svg-to-400kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 400KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-svg-to-450kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 450KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-svg-to-500kb",
  "category": "Compress SVG",
  "name": "Compress SVG to 500KB",
  "kind": "size",
  "format": "svg",
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-gif",
  "category": "Compress GIF",
  "name": "Compress GIF",
  "kind": "hub",
  "format": "gif",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-gif-to-1kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 1KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-gif-to-5kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 5KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-gif-to-10kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 10KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-gif-to-15kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 15KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-gif-to-20kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 20KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-gif-to-25kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 25KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-gif-to-30kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 30KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-gif-to-35kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 35KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-gif-to-40kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 40KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-gif-to-45kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 45KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-gif-to-50kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 50KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-gif-to-55kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 55KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-gif-to-60kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 60KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-gif-to-65kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 65KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-gif-to-70kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 70KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-gif-to-75kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 75KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-gif-to-80kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 80KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-gif-to-85kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 85KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-gif-to-90kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 90KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-gif-to-95kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 95KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-gif-to-100kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 100KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-gif-to-110kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 110KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-gif-to-120kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 120KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-gif-to-130kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 130KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-gif-to-140kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 140KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-gif-to-150kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 150KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-gif-to-160kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 160KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-gif-to-170kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 170KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-gif-to-180kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 180KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-gif-to-190kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 190KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-gif-to-200kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 200KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-gif-to-250kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 250KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-gif-to-300kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 300KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-gif-to-350kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 350KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-gif-to-400kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 400KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-gif-to-450kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 450KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-gif-to-500kb",
  "category": "Compress GIF",
  "name": "Compress GIF to 500KB",
  "kind": "size",
  "format": "gif",
  "targetKb": 500,
  "hub": false
 },
 {
  "slug": "compress-webp",
  "category": "Compress WEBP",
  "name": "Compress WEBP",
  "kind": "hub",
  "format": "webp",
  "targetKb": null,
  "hub": true
 },
 {
  "slug": "compress-webp-to-1kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 1KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 1,
  "hub": false
 },
 {
  "slug": "compress-webp-to-5kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 5KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 5,
  "hub": false
 },
 {
  "slug": "compress-webp-to-10kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 10KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 10,
  "hub": false
 },
 {
  "slug": "compress-webp-to-15kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 15KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 15,
  "hub": false
 },
 {
  "slug": "compress-webp-to-20kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 20KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 20,
  "hub": false
 },
 {
  "slug": "compress-webp-to-25kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 25KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 25,
  "hub": false
 },
 {
  "slug": "compress-webp-to-30kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 30KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 30,
  "hub": false
 },
 {
  "slug": "compress-webp-to-35kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 35KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 35,
  "hub": false
 },
 {
  "slug": "compress-webp-to-40kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 40KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 40,
  "hub": false
 },
 {
  "slug": "compress-webp-to-45kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 45KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 45,
  "hub": false
 },
 {
  "slug": "compress-webp-to-50kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 50KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 50,
  "hub": false
 },
 {
  "slug": "compress-webp-to-55kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 55KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 55,
  "hub": false
 },
 {
  "slug": "compress-webp-to-60kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 60KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 60,
  "hub": false
 },
 {
  "slug": "compress-webp-to-65kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 65KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 65,
  "hub": false
 },
 {
  "slug": "compress-webp-to-70kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 70KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 70,
  "hub": false
 },
 {
  "slug": "compress-webp-to-75kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 75KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 75,
  "hub": false
 },
 {
  "slug": "compress-webp-to-80kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 80KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 80,
  "hub": false
 },
 {
  "slug": "compress-webp-to-85kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 85KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 85,
  "hub": false
 },
 {
  "slug": "compress-webp-to-90kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 90KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 90,
  "hub": false
 },
 {
  "slug": "compress-webp-to-95kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 95KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 95,
  "hub": false
 },
 {
  "slug": "compress-webp-to-100kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 100KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 100,
  "hub": false
 },
 {
  "slug": "compress-webp-to-110kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 110KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 110,
  "hub": false
 },
 {
  "slug": "compress-webp-to-120kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 120KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 120,
  "hub": false
 },
 {
  "slug": "compress-webp-to-130kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 130KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 130,
  "hub": false
 },
 {
  "slug": "compress-webp-to-140kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 140KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 140,
  "hub": false
 },
 {
  "slug": "compress-webp-to-150kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 150KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 150,
  "hub": false
 },
 {
  "slug": "compress-webp-to-160kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 160KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 160,
  "hub": false
 },
 {
  "slug": "compress-webp-to-170kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 170KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 170,
  "hub": false
 },
 {
  "slug": "compress-webp-to-180kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 180KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 180,
  "hub": false
 },
 {
  "slug": "compress-webp-to-190kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 190KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 190,
  "hub": false
 },
 {
  "slug": "compress-webp-to-200kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 200KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 200,
  "hub": false
 },
 {
  "slug": "compress-webp-to-250kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 250KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 250,
  "hub": false
 },
 {
  "slug": "compress-webp-to-300kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 300KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 300,
  "hub": false
 },
 {
  "slug": "compress-webp-to-350kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 350KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 350,
  "hub": false
 },
 {
  "slug": "compress-webp-to-400kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 400KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 400,
  "hub": false
 },
 {
  "slug": "compress-webp-to-450kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 450KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 450,
  "hub": false
 },
 {
  "slug": "compress-webp-to-500kb",
  "category": "Compress WEBP",
  "name": "Compress WEBP to 500KB",
  "kind": "size",
  "format": "webp",
  "targetKb": 500,
  "hub": false
 }
];

export const PAGE_MAP: Record<string, PageDef> = Object.fromEntries(
  PAGES.map((p) => [p.slug, p])
);

export function siblingsOf(page: PageDef): PageDef[] {
  return PAGES.filter((p) => p.category === page.category && p.slug !== page.slug);
}
