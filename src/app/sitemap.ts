import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/mentions-legales`, priority: 0.3 },
    { url: `${site.url}/confidentialite`, priority: 0.3 },
  ];
}
