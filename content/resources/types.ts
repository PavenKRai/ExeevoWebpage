import type { PortableTextBlock } from "@portabletext/react";

/**
 * Content migrated from the old exeevo.com (WordPress) by scripts/migrate. Bodies are sanitised HTML.
 * Facts the old site did not hold (speakers, durations, event dates, customer logos) are simply absent: never invented.
 */
export type ResourceType = "blog" | "white-papers" | "webinars" | "press-releases" | "case-studies" | "analyst-reports" | "events" | "glossary";

export type Resource = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) the item was first published on the old site. */
  date: string;
  updated: string;
  /** Date of the last change in the CMS (sitemap lastmod); falls back to `updated`. */
  modified?: string;
  summary: string;
  categories: string[];
  image: { src: string; alt: string; width: number; height: number } | null;
  seo: { title: string; description: string };
  videoUrl?: string;
  pdfUrl?: string;
  /** Events only (Sanity fields): ISO date-times, a place such as "Dublin, Clayton Hotel" or "Online", and the sign-up link. Absent when not filled in. */
  startDate?: string;
  endDate?: string;
  location?: string;
  registerUrl?: string;
  words: number;
  /** Sanitised HTML (bundled JSON fallback and imported legacy items). */
  bodyHtml?: string;
  /** Portable Text from Sanity. */
  body?: PortableTextBlock[];
};

