// One-off export of exeevo.com (WordPress REST) into content/resources/<type>.json. Run: node scripts/migrate/export.mjs
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://exeevo.com/wp-json/wp/v2";
const OUT = new URL("./.raw/", import.meta.url);
const TYPES = {
  blog: "posts",
  "white-papers": "white-paper",
  webinars: "webinar",
  "press-releases": "press-release",
  "case-studies": "case-study",
  "analyst-reports": "analyst-report",
  events: "event",
  glossary: "glossary",
};

const get = async (url) => {
  const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};
const all = async (rest, extra = "") => {
  const out = [];
  for (let page = 1; ; page++) {
    const r = await fetch(`${BASE}/${rest}?per_page=100&page=${page}${extra}`, { headers: { "user-agent": "Mozilla/5.0" } });
    if (r.status === 400) break;
    if (!r.ok) throw new Error(`${r.status} ${rest}`);
    const rows = await r.json();
    out.push(...rows);
    if (page >= Number(r.headers.get("x-wp-totalpages") ?? 1)) break;
  }
  return out;
};

const decode = (s = "") =>
  s.replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, "&").replace(/&#038;/g, "&").replace(/&nbsp;/g, " ").replace(/&hellip;/g, "…");
const text = (html = "") => decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

const cats = Object.fromEntries((await all("categories")).map((c) => [c.id, c.name]));
console.log("categories", Object.keys(cats).length);
const mediaCache = new Map();
const media = async (id) => {
  if (!id) return null;
  if (!mediaCache.has(id)) {
    try {
      const m = await get(`${BASE}/media/${id}?_fields=source_url,alt_text,media_details`);
      mediaCache.set(id, { url: m.source_url, alt: m.alt_text || "", width: m.media_details?.width, height: m.media_details?.height });
    } catch { mediaCache.set(id, null); }
  }
  return mediaCache.get(id);
};

await mkdir(OUT, { recursive: true });
const report = {};
for (const [type, rest] of Object.entries(TYPES)) {
  const rows = await all(rest);
  console.log(type, "fetched", rows.length);
  const published = rows.filter((r) => r.status === "publish");
  const images = [];
  for (let i = 0; i < published.length; i += 10) {
    images.push(...(await Promise.all(published.slice(i, i + 10).map((r) => media(r.featured_media)))));
  }
  const items = [];
  for (const [i, r] of published.entries()) {
    const y = r.yoast_head_json ?? {};
    items.push({
      id: r.id,
      slug: r.slug,
      oldUrl: r.link,
      title: decode(r.title.rendered),
      date: r.date,
      modified: r.modified,
      summary: text(r.excerpt?.rendered ?? ""),
      categories: (r.categories ?? []).map((id) => cats[id]).filter(Boolean),
      image: images[i],
      seo: { title: decode(y.title ?? ""), description: decode(y.description ?? "") },
      bodyHtml: r.content.rendered,
    });
  }
  items.sort((a, b) => b.date.localeCompare(a.date));
  await writeFile(new URL(`${type}.raw.json`, OUT), JSON.stringify(items, null, 1));
  report[type] = items.length;
  console.log(type, items.length);
}
await writeFile(new URL("export-summary.json", OUT), JSON.stringify(report, null, 1));
