import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { absoluteUrl } from "@/lib/seo";

// Date of the last substantive content change; bump when copy changes so crawlers see freshness.
const LAST_MODIFIED = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(seo).map((p) => ({
    url: absoluteUrl(p.path) || absoluteUrl("/"),
    lastModified: LAST_MODIFIED,
    changeFrequency: p.path === "/" ? "weekly" : "monthly",
    priority: p.path === "/" ? 1 : 0.8,
  }));
}
