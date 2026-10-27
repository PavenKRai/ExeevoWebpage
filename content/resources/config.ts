import type { ResourceType } from "./index";

export type ResourceTypeConfig = {
  type: ResourceType;
  /** Tab / breadcrumb label */
  label: string;
  /** Singular noun for links, e.g. "Read article" */
  cta: string;
  path: string;
  h1: string;
  intro: string;
  perPage: number;
  /** Dot colour on tabs and chips. */
  color: string;
  /** The two glows of the card artwork when an item has no image (hex, from the design). */
  art: [string, string];
  /** Singular label on cards ("White paper"). */
  single: string;
};

/** Page headings and intros come from the Resources design; list order is the order shown in the sub-navigation. */
export const resourceTypes: ResourceTypeConfig[] = [
  { type: "blog", label: "Blog", cta: "Read article", path: "/resources/blog", h1: "Blog", intro: "Practical thinking for commercial, medical, marketing and IT teams in life sciences.", perPage: 12, color: "var(--ex-blue)", art: ["#0762C8", "#7A3FC0"], single: "Blog" },
  { type: "white-papers", label: "White papers", cta: "Read the white paper", path: "/resources/white-papers", h1: "White papers", intro: "In-depth guides for teams evaluating, launching or scaling a life sciences CRM.", perPage: 12, color: "var(--ex-violet)", art: ["#7A3FC0", "#DF1995"], single: "White paper" },
  { type: "events", label: "Events", cta: "View event", path: "/events", h1: "Events", intro: "Conferences, roundtables and workshops where you can meet the Exeevo team.", perPage: 12, color: "var(--ex-magenta)", art: ["#DF1995", "#0762C8"], single: "Event" },
  { type: "webinars", label: "Webinars", cta: "Watch webinar", path: "/resources/webinars", h1: "Webinars", intro: "Live sessions and an on-demand library from our product and industry teams.", perPage: 12, color: "var(--ex-sky)", art: ["#00A4EF", "#0762C8"], single: "Webinar" },
  { type: "case-studies", label: "Case studies", cta: "Read the case study", path: "/resources/case-studies", h1: "Case studies", intro: "How life sciences teams use Exeevo across commercial, medical and marketing work.", perPage: 12, color: "var(--ex-green)", art: ["#00C389", "#0762C8"], single: "Case study" },
  { type: "press-releases", label: "Press", cta: "Read release", path: "/resources/press-releases", h1: "Press", intro: "News, announcements and resources for journalists covering Exeevo.", perPage: 12, color: "var(--ex-muted)", art: ["#56636C", "#0762C8"], single: "Press" },
  { type: "analyst-reports", label: "Analyst reports", cta: "Read the report", path: "/resources/analyst-reports", h1: "Analyst reports", intro: "What industry analysts have said about Exeevo.", perPage: 12, color: "var(--ex-heading)", art: ["#1D262D", "#7A3FC0"], single: "Analyst report" },
  { type: "glossary", label: "Glossary", cta: "Read definition", path: "/glossary", h1: "Glossary", intro: "Plain-language definitions of the terms used across life sciences commercial, medical and compliance work.", perPage: 50, color: "var(--ex-muted)", art: ["#56636C", "#0762C8"], single: "Glossary" },
];

export const resourceConfig = (type: ResourceType) => resourceTypes.find((t) => t.type === type)!;

export const resourcesHub = {
  label: "Resources",
  h1: "Resources",
  intro: "Articles, guides, events and news for commercial, medical, marketing and IT teams in life sciences.",
};

export const newsletter = {
  title: "Get new resources in your inbox",
  body: "",
  field: "Work email",
  cta: "Subscribe",
  success: "Thanks. You're subscribed.",
};
