import type { Metadata } from "next";
import type { PageSeo } from "@/content/seo";
import { siteUrl } from "./siteUrl";

/** Metadata for one page: title, description, canonical, Open Graph and Twitter all from one source. */
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo: life sciences CRM built natively on Microsoft" };

export function pageMetadata(p: PageSeo): Metadata {
  const title = p.absoluteTitle ? { absolute: p.title } : p.title;
  const shownTitle = p.absoluteTitle ? p.title : `${p.title} | Exeevo`;
  return {
    title,
    description: p.description,
    alternates: { canonical: p.path },
    // A page-level openGraph object replaces the layout's (including its file-based image), so the image is repeated here.
    openGraph: { title: shownTitle, description: p.description, url: p.path, siteName: "Exeevo", type: "website", locale: "en_US", images: [ogImage] },
    twitter: { card: "summary_large_image", title: shownTitle, description: p.description, images: ["/twitter-image"] },
  };
}

/** AI crawlers we explicitly welcome (search/answer bots decide whether assistants can cite us; training bots feed models). */
export const aiBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;
