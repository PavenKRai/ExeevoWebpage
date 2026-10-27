import type { Metadata } from "next";
import { resourceConfig } from "@/content/resources/config";
import type { Resource, ResourceType } from "@/content/resources";
import { resourceHref } from "./resources";
import { siteUrl } from "./siteUrl";

const fallbackImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo: life sciences CRM built natively on Microsoft" };

export function resourceMetadata(type: ResourceType, item: Resource): Metadata {
  const path = resourceHref(type, item.slug);
  const img = item.image ? { url: item.image.src, width: item.image.width, height: item.image.height, alt: item.image.alt || item.title } : fallbackImage;
  const title = item.seo.title || item.title;
  const description = item.seo.description || item.summary;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Exeevo`, description, url: path, siteName: "Exeevo", type: "article", locale: "en_US", publishedTime: item.date, modifiedTime: item.updated, images: [img] },
    twitter: { card: "summary_large_image", title: `${title} | Exeevo`, description, images: [img.url] },
  };
}

/** Metadata for a hub/list page (the page-level openGraph replaces the layout's, so the image is repeated). */
export function listMetadata(type: ResourceType, extra?: { page?: number; category?: string }): Metadata {
  const c = resourceConfig(type);
  const suffix = extra?.category ? `${extra.category}: ` : "";
  const page = extra?.page && extra.page > 1 ? ` (page ${extra.page})` : "";
  const title = `${suffix}${c.h1}${page}`;
  return {
    title,
    description: c.intro,
    alternates: { canonical: c.path },
    openGraph: { title: `${title} | Exeevo`, description: c.intro, url: c.path, siteName: "Exeevo", type: "website", locale: "en_US", images: [fallbackImage] },
    twitter: { card: "summary_large_image", title: `${title} | Exeevo`, description: c.intro, images: ["/twitter-image"] },
  };
}

const abs = (p: string) => (p.startsWith("http") ? p : `${siteUrl}${p}`);

/** JSON-LD for one detail page: only facts that are on the page (title, dates, image, summary). */
export function resourceJsonLd(type: ResourceType, item: Resource) {
  const c = resourceConfig(type);
  const url = abs(resourceHref(type, item.slug));
  const crumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Resources", item: abs("/resources") },
      { "@type": "ListItem", position: 2, name: c.label, item: abs(c.path) },
      { "@type": "ListItem", position: 3, name: item.title, item: url },
    ],
  };
  const common = { "@id": `${url}#page`, mainEntityOfPage: url, url, headline: item.title, description: item.summary || item.seo.description, datePublished: item.date, dateModified: item.updated, inLanguage: "en", publisher: { "@id": `${siteUrl}/#organization` }, ...(item.image ? { image: abs(item.image.src) } : {}) };
  let main: Record<string, unknown>;
  if (type === "webinars" && item.videoUrl)
    main = { "@type": "VideoObject", ...common, name: item.title, uploadDate: item.date, embedUrl: item.videoUrl, ...(item.image ? { thumbnailUrl: abs(item.image.src) } : { thumbnailUrl: abs("/opengraph-image") }) };
  else if (type === "events" && item.startDate)
    main = {
      "@type": "Event",
      ...common,
      name: item.title,
      startDate: item.startDate,
      ...(item.endDate ? { endDate: item.endDate } : {}),
      ...(item.location ? { location: /^online$/i.test(item.location) ? { "@type": "VirtualLocation", url } : { "@type": "Place", name: item.location } } : {}),
      ...(item.registerUrl ? { offers: { "@type": "Offer", url: item.registerUrl } } : {}),
    };
  else main = { "@type": type === "blog" ? "BlogPosting" : type === "press-releases" ? "NewsArticle" : "Article", ...common };
  return { "@context": "https://schema.org", "@graph": [main, crumbs] };
}
