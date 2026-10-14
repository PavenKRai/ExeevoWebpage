// Tags every exported item with its language (Yoast og_locale) and featured image id, so translated items can be
// redirected to their English equivalent. Run: node scripts/migrate/export-langs.mjs
import { writeFile } from "node:fs/promises";

const TYPES = { blog: "posts", "white-papers": "white-paper", webinars: "webinar", "press-releases": "press-release", "case-studies": "case-study", "analyst-reports": "analyst-report", events: "event", glossary: "glossary" };
const out = {};
for (const [type, rest] of Object.entries(TYPES)) {
  out[type] = {};
  for (let page = 1; ; page++) {
    const r = await fetch(`https://exeevo.com/wp-json/wp/v2/${rest}?per_page=100&page=${page}&_fields=id,slug,featured_media,date,link,yoast_head_json`, { headers: { "user-agent": "Mozilla/5.0" } });
    if (r.status === 400) break;
    for (const x of await r.json()) out[type][x.id] = { slug: x.slug, locale: x.yoast_head_json?.og_locale ?? "", media: x.featured_media, date: x.date.slice(0, 10), link: x.link };
    if (page >= Number(r.headers.get("x-wp-totalpages") ?? 1)) break;
  }
  const locales = {};
  for (const v of Object.values(out[type])) locales[v.locale] = (locales[v.locale] ?? 0) + 1;
  console.log(type, JSON.stringify(locales));
}
await writeFile(new URL("./.raw/langs.json", import.meta.url), JSON.stringify(out));
