import type { MetadataRoute } from "next";
import { getPage, pagePaths, type PageKey } from "@/content/pages";
import { getResources, type ResourceType } from "@/content/resources";
import { resourceTypes } from "@/content/resources/config";
import { seo } from "@/content/seo";
import { resourceHref } from "@/lib/resources";
import { absoluteUrl } from "@/lib/seo";

// Date of the last substantive content change; bump when copy changes so crawlers see freshness.
const LAST_MODIFIED = new Date("2026-10-30");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core: MetadataRoute.Sitemap = Object.values(seo).map((p) => ({
    url: absoluteUrl(p.path) || absoluteUrl("/"),
    lastModified: LAST_MODIFIED,
    changeFrequency: p.path === "/" ? "weekly" : "monthly",
    priority: p.path === "/" ? 1 : 0.8,
  }));
  const hubs: MetadataRoute.Sitemap = [{ path: "/resources" }, ...resourceTypes.map((t) => ({ path: t.path }))].map((h) => ({
    url: absoluteUrl(h.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const items: MetadataRoute.Sitemap = (
    await Promise.all(
      (resourceTypes.map((t) => t.type) as ResourceType[]).map(async (type) =>
        (await getResources(type)).map((r) => ({ url: absoluteUrl(resourceHref(type, r.slug)), lastModified: new Date(r.modified ?? r.updated), changeFrequency: "yearly" as const, priority: 0.5 })),
      ),
    )
  ).flat();
  const standalone: MetadataRoute.Sitemap = await Promise.all(
    (Object.keys(pagePaths) as PageKey[]).map(async (k) => ({
      url: absoluteUrl(pagePaths[k]),
      lastModified: new Date((await getPage(k)).updated),
      changeFrequency: "yearly" as const,
      priority: k === "privacy" || k === "cookies" ? 0.3 : 0.5,
    })),
  );
  return [...core, ...hubs, ...items, ...standalone, { url: absoluteUrl("/site-map"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 }];
}
