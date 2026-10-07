// Exports the standalone WordPress pages we migrate (legal, about, partners, careers). Run: node scripts/migrate/export-pages.mjs
import { writeFile } from "node:fs/promises";

const PAGES = {
  about: ["about-us", "our-people"],
  partners: ["partners", "technology-partners"],
  careers: ["careers"],
  privacy: ["privacy-policy"],
  cookies: ["cookie-policy"],
};
const out = {};
for (const [key, slugs] of Object.entries(PAGES)) {
  out[key] = [];
  for (const slug of slugs) {
    const r = await fetch(`https://exeevo.com/wp-json/wp/v2/pages?slug=${slug}&_fields=id,slug,link,title,content,modified,yoast_head_json`, { headers: { "user-agent": "Mozilla/5.0" } });
    const [p] = await r.json();
    if (!p) throw new Error(`missing page ${slug}`);
    out[key].push({ slug, title: p.title.rendered, modified: p.modified, seoDescription: p.yoast_head_json?.description ?? "", bodyHtml: p.content.rendered });
  }
}
await writeFile(new URL("./.raw/pages.raw.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(Object.keys(out).join(", "));
