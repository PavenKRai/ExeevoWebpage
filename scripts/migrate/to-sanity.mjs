// Converts content/resources/*.json + content/pages.json into a Sanity NDJSON import (scripts/migrate/.raw/sanity-import.ndjson).
// Bodies become Portable Text (headings, lists, links, images, video, tables); anything that cannot be represented
// faithfully (e.g. in-page anchors on legal pages) is kept as `legacyHtml`, which the site renders until edited.
// Run: node scripts/migrate/to-sanity.mjs   then   cd studio && npx sanity dataset import ../scripts/migrate/.raw/sanity-import.ndjson <dataset> --replace
import { readFile, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { parseDocument } from "htmlparser2";

const ROOT = new URL("../../", import.meta.url).pathname;
const TYPES = { blog: "blogPost", "white-papers": "whitePaper", webinars: "webinar", "press-releases": "pressRelease", "case-studies": "caseStudy", "analyst-reports": "analystReport", events: "event", glossary: "glossaryTerm" };
const CATEGORY_FIXES = { "Artifical Intelligence": "Artificial Intelligence", "Commercial OPerations": "Commercial Operations" };
const log = { legacy: [], warnings: [], docs: 0, images: 0 };

let n = 0;
const k = () => `k${(n++).toString(36)}`;
const safeId = (s) => s.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
const decode = (s) => s.replace(/&#8217;/g, "’").replace(/&amp;/g, "&");

async function exists(p) { try { await access(p); return true; } catch { return false; } }
const fileUrl = (p) => `file://${resolve(ROOT, "public", p.replace(/^\//, ""))}`;
const imageNode = async (src, alt, ctx) => {
  const path = decodeURIComponent(src.replace(/^\//, ""));
  if (!(await exists(resolve(ROOT, "public", path)))) { log.warnings.push(`${ctx}: missing image ${src}`); return null; }
  log.images++;
  return { _type: "image", _key: k(), asset: { _type: "reference", _ref: "" }, _sanityAsset: `image@${fileUrl(src)}`, alt: alt || "" };
};

const text = (node) => (node.type === "text" ? node.data : node.children ? node.children.map(text).join("") : "");

/** Inline children -> spans with marks. */
function inline(children, marks, defs, out) {
  for (const c of children) {
    if (c.type === "text") {
      if (!c.data) continue;
      const last = out[out.length - 1];
      if (last && last.marks.join() === marks.join()) last.text += c.data;
      else out.push({ _type: "span", _key: k(), text: c.data, marks: [...marks] });
    } else if (c.type === "tag") {
      if (c.name === "strong" || c.name === "b") inline(c.children, [...marks, "strong"], defs, out);
      else if (c.name === "em" || c.name === "i") inline(c.children, [...marks, "em"], defs, out);
      else if (c.name === "a" && c.attribs.href && !c.attribs.href.startsWith("#")) {
        const id = k();
        defs.push({ _type: "link", _key: id, href: c.attribs.href });
        inline(c.children, [...marks, id], defs, out);
      } else if (c.name === "br") inline([{ type: "text", data: "\n" }], marks, defs, out);
      else if (c.name === "img" || c.name === "iframe") continue; // handled at block level
      else inline(c.children ?? [], marks, defs, out);
    }
  }
}

function block(children, style, extra = {}) {
  const spans = [], defs = [];
  inline(children, [], defs, spans);
  const trimmed = spans.filter((s, i) => s.text.trim() || spans.length === 1 || i === 0);
  if (!spans.some((s) => s.text.trim())) return null;
  // trim leading/trailing whitespace of the block
  trimmed[0].text = trimmed[0].text.replace(/^\s+/, "");
  trimmed[trimmed.length - 1].text = trimmed[trimmed.length - 1].text.replace(/\s+$/, "");
  return { _type: "block", _key: k(), style, markDefs: defs, children: trimmed, ...extra };
}

const youtube = (u) => {
  const m = u.match(/(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/|v=)([\w-]{6,})/);
  return m ? `https://www.youtube.com/watch?v=${m[1]}` : u;
};

async function blocks(nodes, ctx, out = [], list = null) {
  for (const c of nodes) {
    if (c.type === "text") {
      if (c.data.trim()) { const b = block([c], "normal"); if (b) out.push(b); }
      continue;
    }
    if (c.type !== "tag") continue;
    const name = c.name;
    if (name === "p") {
      const imgs = c.children.filter((x) => x.type === "tag" && x.name === "img");
      const b = block(c.children, "normal");
      if (b) out.push(b);
      for (const im of imgs) { const i = await imageNode(im.attribs.src, im.attribs.alt, ctx); if (i) out.push(i); }
    } else if (/^h[2-5]$/.test(name)) {
      const b = block(c.children, name === "h2" ? "h2" : "h3");
      if (b) out.push(b);
    } else if (name === "blockquote") {
      const inner = [];
      await blocks(c.children, ctx, inner);
      for (const b of inner) out.push(b.style === "normal" ? { ...b, style: "blockquote" } : b);
    } else if (name === "ul" || name === "ol") {
      for (const li of c.children.filter((x) => x.type === "tag" && x.name === "li")) {
        const own = li.children.filter((x) => !(x.type === "tag" && (x.name === "ul" || x.name === "ol")));
        const nested = li.children.filter((x) => x.type === "tag" && (x.name === "ul" || x.name === "ol"));
        const b = block(own, "normal", { listItem: name === "ul" ? "bullet" : "number", level: (list?.level ?? 0) + 1 });
        if (b) out.push(b);
        for (const nl of nested) await blocks([nl], ctx, out, { level: (list?.level ?? 0) + 1 });
      }
    } else if (name === "figure") {
      const img = find(c, "img");
      const table = find(c, "table");
      if (table) await blocks([table], ctx, out);
      else if (img) {
        const i = await imageNode(img.attribs.src, img.attribs.alt, ctx);
        const cap = find(c, "figcaption");
        if (i) out.push(cap ? { ...i, caption: text(cap).trim() } : i);
      } else await blocks(c.children, ctx, out);
    } else if (name === "img") {
      const i = await imageNode(c.attribs.src, c.attribs.alt, ctx);
      if (i) out.push(i);
    } else if (name === "iframe") {
      out.push({ _type: "videoEmbed", _key: k(), url: youtube(c.attribs.src), title: c.attribs.title || "Video" });
    } else if (name === "table") {
      const rows = findAll(c, "tr").map((tr) => ({ _type: "tableRow", _key: k(), cells: tr.children.filter((x) => x.type === "tag" && (x.name === "td" || x.name === "th")).map((td) => text(td).replace(/\s+/g, " ").trim()) }));
      out.push({ _type: "table", _key: k(), rows });
    } else if (name === "hr") continue;
    else await blocks(c.children ?? [], ctx, out, list);
  }
  return out;
}
const find = (node, name) => findAll(node, name)[0];
function findAll(node, name, acc = []) {
  for (const c of node.children ?? []) { if (c.type === "tag" && c.name === name) acc.push(c); findAll(c, name, acc); }
  return acc;
}

async function convert(html, ctx, keepExact = false) {
  // Legal pages have a table of contents linking to heading ids: Portable Text cannot carry those, so keep exact HTML.
  // Elsewhere in-page links are dropped (their text stays) and heading ids are ignored.
  if (keepExact) { log.legacy.push(`${ctx}: legal page kept as exact HTML`); return { legacyHtml: html }; }
  const doc = parseDocument(html);
  const body = await blocks(doc.children, ctx);
  return { body };
}

const docs = [];
const categories = new Map();
const catRef = (name) => {
  const title = CATEGORY_FIXES[name] ?? name;
  const _id = `category-${safeId(title.toLowerCase())}`;
  categories.set(_id, { _id, _type: "category", title });
  return { _type: "reference", _ref: _id, _key: k() };
};

for (const [dir, type] of Object.entries(TYPES)) {
  const items = JSON.parse(await readFile(resolve(ROOT, `content/resources/${dir}.json`), "utf8"));
  for (const it of items) {
    const ctx = `${type}/${it.slug}`;
    const doc = {
      _id: `${type}-${safeId(it.slug)}`,
      _type: type,
      _createdAt: `${it.date}T09:00:00Z`,
      _updatedAt: `${it.updated}T09:00:00Z`,
      title: decode(it.title),
      slug: { _type: "slug", current: it.slug },
      date: it.date,
      ...(it.updated > it.date ? { updatedOn: it.updated } : {}),
      summary: it.summary,
      categories: it.categories.map(catRef),
      seo: { _type: "seo", title: it.seo.title, description: it.seo.description },
    };
    if (it.image) { const im = await imageNode(it.image.src, it.image.alt || it.title, ctx); if (im) { delete im._key; delete im._type; doc.image = { _type: "image", _sanityAsset: im._sanityAsset, asset: im.asset, alt: im.alt }; delete doc.image.asset; } }
    Object.assign(doc, await convert(it.bodyHtml, ctx));
    if (type === "webinar" && it.videoUrl) doc.videoUrl = youtube(it.videoUrl);
    if (type === "whitePaper" && it.pdfUrl) {
      if (await exists(resolve(ROOT, "public", decodeURIComponent(it.pdfUrl.replace(/^\//, ""))))) doc.pdf = { _type: "file", _sanityAsset: `file@${fileUrl(it.pdfUrl)}` };
      else doc.pdfUrl = it.pdfUrl;
    }
    docs.push(doc);
  }
}

// Fixed company pages
const pages = JSON.parse(await readFile(resolve(ROOT, "content/pages.json"), "utf8"));
for (const [id, p] of Object.entries(pages)) {
  const sections = [];
  for (const s of p.sections) {
    const conv = await convert(s.bodyHtml, `page/${id}/${s.slug}`, id === "privacy" || id === "cookies");
    sections.push({ _type: "section", _key: k(), title: decode(s.title), ...conv });
  }
  docs.push({ _id: id, _type: "page", _updatedAt: `${p.updated}T09:00:00Z`, title: decode(p.title), sections, seo: { _type: "seo", description: p.description } });
}

// Images in the Sanity import format: {_type:'image', _sanityAsset:'image@file://...'} (no asset ref).
const clean = (v) => {
  if (Array.isArray(v)) return v.map(clean);
  if (v && typeof v === "object") {
    const o = {};
    for (const [kk, vv] of Object.entries(v)) { if (kk === "asset" && vv && vv._ref === "") continue; o[kk] = clean(vv); }
    return o;
  }
  return v;
};
const all = [...categories.values(), ...docs].map(clean);
log.docs = all.length;
await writeFile(resolve(ROOT, "scripts/migrate/.raw/sanity-import.ndjson"), all.map((d) => JSON.stringify(d)).join("\n") + "\n");
await writeFile(resolve(ROOT, "scripts/migrate/.raw/sanity-import-log.json"), JSON.stringify(log, null, 1));
console.log(`documents ${all.length} (categories ${categories.size}), images ${log.images}, legacyHtml ${log.legacy.length}, warnings ${log.warnings.length}`);
