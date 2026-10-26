import type { PortableTextBlock } from "@portabletext/react";
import { sanityConfigured, sanityFetch } from "@/lib/sanity";
import pagesJson from "./pages.json";

/** Standalone pages (legal pages): from Sanity when configured, else the bundled JSON. */
export type PageKey = "privacy" | "cookies";
export type PageSection = { slug: string; title: string; bodyHtml?: string; body?: PortableTextBlock[] };
export type MigratedPage = { title: string; description: string; updated: string; sections: PageSection[] };

export const pagePaths: Record<PageKey, string> = { privacy: "/privacy", cookies: "/cookies" };

type Raw = { title: string; description?: string | null; updated: string; sections?: { title: string; body?: PortableTextBlock[]; legacyHtml?: string }[] };

export async function getPage(key: PageKey): Promise<MigratedPage> {
  if (!sanityConfigured) return (pagesJson as Record<PageKey, MigratedPage>)[key];
  const raw = await sanityFetch<Raw | null>(
    `*[_type == "page" && _id == $id][0]{ title, "description": seo.description, "updated": string::split(_updatedAt, "T")[0], sections[]{ title, legacyHtml, body[]{ ..., _type == "image" => { ..., "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height } } } }`,
    { id: key },
  );
  if (!raw) return (pagesJson as Record<PageKey, MigratedPage>)[key];
  return {
    title: raw.title,
    description: raw.description ?? "",
    updated: raw.updated,
    sections: (raw.sections ?? []).map((s, i) => ({ slug: `${key}-${i}`, title: s.title, bodyHtml: s.legacyHtml, body: s.body })),
  };
}
