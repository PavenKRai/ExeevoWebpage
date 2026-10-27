import { sanityConfigured, sanityFetch } from "@/lib/sanity";
import { localResources } from "./local";
import type { Resource, ResourceType } from "./types";

export type { Resource, ResourceType } from "./types";

/** Sanity document type for each resource type (see studio/schemaTypes). */
const SANITY_TYPE: Record<ResourceType, string> = {
  blog: "blogPost",
  "white-papers": "whitePaper",
  webinars: "webinar",
  "press-releases": "pressRelease",
  "case-studies": "caseStudy",
  "analyst-reports": "analystReport",
  events: "event",
  glossary: "glossaryTerm",
};

// Fields shared by list and detail reads. Lists leave the body out (it is large); `words` still drives "n min read".
const BASE = `
  "slug": slug.current,
  title,
  date,
  "updated": coalesce(updatedOn, date),
  "modified": string::split(_updatedAt, "T")[0],
  summary,
  "categories": coalesce(categories[]->title, []),
  "image": select(defined(image.asset) => {
    "src": image.asset->url,
    "alt": coalesce(image.alt, title),
    "width": coalesce(image.asset->metadata.dimensions.width, 1200),
    "height": coalesce(image.asset->metadata.dimensions.height, 630)
  }),
  "seo": { "title": coalesce(seo.title, title), "description": coalesce(seo.description, summary) },
  videoUrl,
  "pdfUrl": coalesce(pdf.asset->url, pdfUrl),
  startDate,
  endDate,
  location,
  registerUrl,
  "words": select(
    defined(legacyHtml) => length(string::split(legacyHtml, " ")),
    length(string::split(pt::text(body), " "))
  )
`;
const BODY = `
  "bodyHtml": legacyHtml,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

type Raw = Omit<Resource, "image" | "videoUrl" | "pdfUrl" | "bodyHtml" | "startDate" | "endDate" | "location" | "registerUrl"> & {
  image: Resource["image"] | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  bodyHtml?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  registerUrl?: string | null;
};

/** Watch/share links are stored in Sanity; the page embeds the privacy-friendly player. */
export function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return vm ? `https://player.vimeo.com/video/${vm[1]}` : url;
}

const normalise = (r: Raw): Resource => ({
  ...r,
  image: r.image ?? null,
  videoUrl: r.videoUrl ? toEmbedUrl(r.videoUrl) : undefined,
  pdfUrl: r.pdfUrl ?? undefined,
  startDate: r.startDate ?? undefined,
  endDate: r.endDate ?? undefined,
  location: r.location ?? undefined,
  registerUrl: r.registerUrl ?? undefined,
  bodyHtml: r.bodyHtml ?? undefined,
  words: r.words || 0,
});

/** All items of a type, newest first (without bodies when read from Sanity). */
export async function getResources(type: ResourceType): Promise<Resource[]> {
  if (!sanityConfigured) return localResources(type);
  const rows = await sanityFetch<Raw[]>(`*[_type == $t && defined(slug.current)] | order(date desc) { ${BASE} }`, { t: SANITY_TYPE[type] });
  return rows.map(normalise);
}

/** One item with its full body, or undefined. */
export async function getResource(type: ResourceType, slug: string): Promise<Resource | undefined> {
  if (!sanityConfigured) return localResources(type).find((r) => r.slug === slug);
  const row = await sanityFetch<Raw | null>(`*[_type == $t && slug.current == $slug][0] { ${BASE}, ${BODY} }`, { t: SANITY_TYPE[type], slug });
  return row ? normalise(row) : undefined;
}
