import type { Category } from "@/content/modules";
import { resourceConfig } from "@/content/resources/config";
import type { Resource, ResourceType } from "@/content/resources";

export const resourceHref = (type: ResourceType, slug: string) => `${resourceConfig(type).path}/${slug}`;

const fmt = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
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
