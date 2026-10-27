import type { Category } from "@/content/modules";
import { resourceConfig } from "@/content/resources/config";
import type { Resource, ResourceType } from "@/content/resources";

export const resourceHref = (type: ResourceType, slug: string) => `${resourceConfig(type).path}/${slug}`;

const fmt = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
/** Read time makes sense for written pieces only (not events or webinars). */
export const showsReadTime = (type: ResourceType) => type === "blog" || type === "white-papers" || type === "case-studies" || type === "press-releases" || type === "analyst-reports";
export const readMinutes = (r: Resource) => Math.max(1, Math.round(r.words / 220));

/** Old WordPress categories -> design category colours (Commercial blue, Medical magenta, AI gradient, Platform green). */
export function categoryTone(name?: string): Category {
  const n = (name ?? "").toLowerCase();
  if (/\bai\b|nova|copilot|intelligen/.test(n)) return "ai";
  if (/medical|msl|scientific/.test(n)) return "medical";
  if (/market|sales|commercial|event|omnichannel|field|customer|engagement/.test(n)) return "commercial";
  return "platform";
}

export const pageParam = (v: string | string[] | undefined) => {
  const n = parseInt(Array.isArray(v) ? v[0] : (v ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};
export const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function paginate<T>(items: T[], page: number, perPage: number) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(page, pages);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, pages, total: items.length };
}

/** Counts per category, most used first. */
export function categoriesOf(items: Resource[], max = 8) {
  const counts = new Map<string, number>();
  for (const r of items) for (const c of r.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]).slice(0, max).map(([name]) => name);
}

export function listHref(basePath: string, params: { category?: string; page?: number }) {
  const q = new URLSearchParams();
  if (params.category) q.set("category", params.category);
  if (params.page && params.page > 1) q.set("page", String(params.page));
  const s = q.toString();
  return s ? `${basePath}?${s}` : basePath;
}

/* ---- Fields that only some types have (events, white papers, webinars) ---- */
const dt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });
const mon = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
/** "Mar 5, 2025, 10:00 UTC": Sanity stores date-times in UTC, so it is shown as such. */
export const formatDateTime = (iso: string) => `${dt.format(new Date(iso))} UTC`;
/** Month (MAR) and day (05) for the date badge. */
export const eventParts = (iso: string) => ({ month: mon.format(new Date(iso)).toUpperCase(), day: String(new Date(iso).getUTCDate()).padStart(2, "0") });

/* ---- "On this page": H2 headings of the body, with ids ---- */
export type Heading = { id: string; text: string };
const slugify = (t: string) => t.toLowerCase().replace(/&amp;/g, "and").replace(/&[a-z#0-9]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
const unique = (base: string, seen: Map<string, number>) => {
  const n = (seen.get(base) ?? 0) + 1;
  seen.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
};
const plain = (h: string) => h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#8217;|&#x27;/g, "’").replace(/&nbsp;/g, " ").replace(/&[a-z#0-9]+;/g, "").replace(/\s+/g, " ").trim();

/** Legacy HTML body: give every <h2> an id and list them. */
export function headingsFromHtml(html: string): { html: string; headings: Heading[] } {
  const seen = new Map<string, number>();
  const headings: Heading[] = [];
  const out = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (_m, attrs: string | undefined, inner: string) => {
    const text = plain(inner);
    if (!text) return _m;
    const id = unique(slugify(text), seen);
    headings.push({ id, text });
    return `<h2${(attrs ?? "").replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

type Block = { _type?: string; _key?: string; style?: string; children?: { text?: string }[] };
/** Portable Text body: the H2 blocks, keyed by block `_key` so the renderer can put the same id on each. */
export function headingsFromBody(body: Block[] | undefined): (Heading & { key: string })[] {
  const seen = new Map<string, number>();
  const out: (Heading & { key: string })[] = [];
  (body ?? []).forEach((b, i) => {
    if (b._type !== "block" || b.style !== "h2") return;
    const text = (b.children ?? []).map((c) => c.text ?? "").join("").trim();
    if (!text) return;
    out.push({ key: b._key ?? String(i), id: unique(slugify(text), seen), text });
  });
  return out;
}

export const headingsOf = (r: Pick<Resource, "body" | "bodyHtml">): Heading[] => {
  if (r.bodyHtml && !(r.body && r.body.length)) return headingsFromHtml(r.bodyHtml).headings;
  return headingsFromBody(r.body as Block[] | undefined).map(({ id, text }) => ({ id, text }));
};
