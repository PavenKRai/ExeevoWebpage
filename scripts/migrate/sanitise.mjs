// Turns scripts/migrate/.raw/<type>.raw.json into content/resources/<type>.json:
// clean semantic HTML bodies, links rewritten to new URLs, images downloaded to public/resources/img.
// Run: node scripts/migrate/sanitise.mjs
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { mapOldPath } from "./urlmap.mjs";

const RAW = new URL("./.raw/", import.meta.url);
const OUT = new URL("../../content/resources/", import.meta.url);
const PUB = new URL("../../public/resources/img/", import.meta.url);
const TYPES = ["blog", "white-papers", "webinars", "press-releases", "case-studies", "analyst-reports", "events", "glossary"];

const EMOJI = /[✅✔✨⭐⚡❗❌➡\u{1F300}-\u{1FAFF}\u{FE0F}‍]/gu;
const isOld = (h) => /(^|\.)exeevo\.com$/.test(h);
const videoHost = /^(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)$/;

const images = new Map(); // original url -> local path
const uploads = new Set(); // non-image uploaded files linked from bodies (PDFs etc.)
const log = { shortcodes: [], iframesDropped: [], imageFail: [], unmappedLinks: new Set() };

function localImage(src) {
  let u;
  try { u = new URL(src, "https://exeevo.com"); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const m = u.pathname.match(/\/wp-content\/uploads\/(.+)$/);
  const rel = m ? m[1] : `ext/${u.host}${u.pathname}`;
  const clean = decodeURIComponent(rel).replace(/[^a-zA-Z0-9._/-]+/g, "-");
  const local = `/resources/img/${clean}`;
  images.set(u.href, { local, file: clean });
  return local;
}

function rewriteHref(href) {
  if (href.startsWith("#")) return href;
  let u;
  try { u = new URL(href, "https://exeevo.com"); } catch { return null; }
  if (u.protocol === "mailto:" || u.protocol === "tel:") return href;
  if (!/^https?:$/.test(u.protocol)) return null;
  if (isOld(u.hostname)) {
    if (/\/wp-content\/uploads\//.test(u.pathname)) {
      uploads.add(u.pathname);
      return u.pathname; // served from public/ (downloaded by fetch-uploads.mjs)
    }
    const to = mapOldPath(u.pathname);
    if (to) return to + (to.includes("?") ? "" : u.search) + u.hash;
    log.unmappedLinks.add(u.pathname);
    return "/";
  }
  return u.href;
}

const unwrap = new Set(["div", "span", "section", "article", "main", "header", "footer", "aside", "font", "u", "center"]);
const keep = new Set(["p", "h2", "h3", "h4", "h5", "ul", "ol", "li", "strong", "em", "b", "i", "a", "img", "figure", "figcaption", "blockquote", "cite", "table", "thead", "tbody", "tr", "th", "td", "br", "hr", "sup", "sub", "iframe"]);
const drop = /<(script|style|svg|form|button|select|textarea|nav|noscript|video|audio|object|embed)\b[\s\S]*?<\/\1>/gi;

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:-][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g)) out[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? "";
  return out;
}
const esc = (s) => s.replace(/&(?!(?:[a-z]+|#\d+|#x[\da-f]+);)/gi, "&amp;").replace(/"/g, "&quot;");

export function sanitise(html, ctx) {
  let h = html.replace(/<!--[\s\S]*?-->/g, "").replace(drop, "").replace(/<input\b[^>]*>/gi, "").replace(/<\/?label\b[^>]*>/gi, "");
  h = h.replace(/<div[^>]*wp-block-spacer[^>]*>\s*<\/div>/gi, "");
  for (const m of h.matchAll(/\[(\w+)[^\]]*\]/g)) if (/^(caption|gallery|embed|video|audio|contact|hubspot|wpforms|button|vc_\w+)$/i.test(m[1])) log.shortcodes.push(`${ctx}: ${m[0].slice(0, 60)}`);
  h = h.replace(/\[\/?(caption|gallery|embed|vc_\w+|hubspot[^\]]*|wpforms[^\]]*)[^\]]*\]/gi, "");
  let firstVideo = null;
  h = h.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (all, close, name, rest) => {
    const t = name.toLowerCase();
    if (unwrap.has(t)) return "";
    if (t === "h1") return close ? "</h2>" : "<h2>";
    if (t === "h6") return close ? "</h5>" : "<h5>";
    if (!keep.has(t)) return "";
    if (close) return t === "iframe" ? "</iframe>" : `</${t}>`;
    const a = attrs(rest);
    if (t === "a") {
      const href = a.href ? rewriteHref(a.href) : null;
      if (!href) return "<a>";
      const external = /^https?:/.test(href) && !isOld(new URL(href).hostname);
      return `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>`;
    }
    if (t === "img") {
      const src = a.src || a["data-src"] || "";
      const local = src && localImage(src);
      if (!local) return "";
      const w = parseInt(a.width, 10), hh = parseInt(a.height, 10);
      return `<img src="${esc(local)}" alt="${esc(decodeEntities(a.alt ?? ""))}"${w > 0 && hh > 0 ? ` width="${w}" height="${hh}"` : ""} loading="lazy" decoding="async">`;
    }
    if (t === "iframe") {
      let u;
      try { u = new URL(a.src?.startsWith("//") ? `https:${a.src}` : a.src); } catch { u = null; }
      if (!u || !videoHost.test(u.hostname)) { log.iframesDropped.push(`${ctx}: ${a.src}`); return "<iframe data-drop>"; }
      const id = u.pathname.split("/").pop();
      const clean = /youtube/.test(u.hostname) ? `https://www.youtube-nocookie.com/embed/${id}` : `https://player.vimeo.com/video/${id}`;
      firstVideo ??= clean;
      return `<iframe src="${esc(clean)}" title="${esc(decodeEntities(a.title || "Video"))}" loading="lazy" allowfullscreen>`;
    }
    if (t === "td" || t === "th") return `<${t}${a.colspan ? ` colspan="${parseInt(a.colspan, 10) || 1}"` : ""}>`;
    return `<${t}${/^h[2-5]$/.test(t) && a.id ? ` id="${esc(a.id)}"` : ""}>`;
  });
  h = h.replace(/<iframe data-drop>\s*<\/iframe>/g, "").replace(/<iframe data-drop>/g, "");
  // WordPress "Related blogs/posts" query-loop blocks at the end of a body: the site builds its own related list.
  h = h.replace(/<h[2-5]>\s*Related (?:blogs?|posts?|articles?|resources?|reading)\s*<\/h[2-5]>[\s\S]*$/i, "");
  h = h.replace(EMOJI, "");
  // strip bullets typed by hand
  h = h.replace(/(<p>|<li>|<br>)\s*[•▪●]\s*/g, "$1");
  // empty blocks and nbsp-only paragraphs
  for (let i = 0; i < 3; i++) h = h.replace(/<(p|li|strong|em|b|i|h[2-5]|figure|blockquote|td)>(\s|&nbsp;|<br>)*<\/\1>/gi, (m, t) => (t === "td" ? m : ""));
  // normalise heading levels so the smallest used is h2
  const levels = [...h.matchAll(/<h([2-5])[ >]/g)].map((m) => +m[1]);
  if (levels.length) {
    const shift = Math.min(...levels) - 2;
    if (shift > 0) h = h.replace(/<(\/?)h([2-5])([^>]*)>/g, (m, c, n, rest) => `<${c}h${Math.max(2, +n - shift)}${rest}>`);
  }
  h = h.replace(/\n{2,}/g, "\n").replace(/[ \t]+\n/g, "\n").trim();
  return { html: h, video: firstVideo };
}

function decodeEntities(s) {
  return s.replace(/&#8217;|&rsquo;/g, "’").replace(/&#8211;/g, "–").replace(/&amp;/g, "&").replace(/&#038;/g, "&").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}
const plain = (h) => decodeEntities(h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[,;:.\s]+$/, "") + "…");

// Language detection: the old site mixes fr/es/de/ja/ar translations into the same content types. Only English is
// migrated for now; translated items are redirected to their English equivalent (see redirects.mjs).
const STOP = {
  fr: /\b(le|la|les|des|une|est|pour|avec|dans|sur|du|et|au|aux|que|qui)\b/g,
  es: /\b(el|los|las|una|para|con|por|del|y|en|que|se)\b/g,
  de: /\b(der|die|das|und|nicht|mit|für|von|ist|auf|zu|den|dem|ein|eine)\b/g,
  en: /\b(the|and|of|to|in|is|for|with|that|are|on)\b/g,
};
function detectLang(title, html) {
  const t = `${title} ${html.replace(/<[^>]+>/g, " ").slice(0, 1500)}`.toLowerCase();
  if ((t.match(/[\u0600-\u06FF]/g) ?? []).length > 5) return "ar";
  if ((t.match(/[\u3040-\u30ff\u4e00-\u9fff]/g) ?? []).length > 5) return "ja";
  const c = Object.fromEntries(Object.entries(STOP).map(([k, re]) => [k, (t.match(re) ?? []).length]));
  const best = Object.keys(c).reduce((a, b) => (c[b] > c[a] ? b : a));
  return best !== "en" && c[best] >= c.en + 3 ? best : "en";
}
const langs = JSON.parse(await readFile(new URL("langs.json", RAW), "utf8"));
const translated = {}; // type -> { oldSlug: englishSlug | null }

const result = {};
for (const type of TYPES) {
  const rawAll = JSON.parse(await readFile(new URL(`${type}.raw.json`, RAW), "utf8"));
  // The export contains one row per language for the same slug; keep the original (lowest id).
  const deduped = [...new Map(rawAll.sort((a, b) => b.id - a.id).map((r) => [r.slug, r])).values()];
  const withLang = deduped.map((r) => ({ r, lang: detectLang(r.title, r.bodyHtml) }));
  const raw = withLang.filter((x) => x.lang === "en").map((x) => x.r);
  const english = raw.map((r) => ({ slug: r.slug, media: langs[type]?.[r.id]?.media, date: r.date.slice(0, 10) }));
  translated[type] = {};
  for (const { r, lang } of withLang) {
    if (lang === "en") continue;
    const meta = langs[type]?.[r.id];
    const twin = english.find((e) => meta?.media && e.media === meta.media) ?? english.find((e) => e.date === r.date.slice(0, 10));
    translated[type][decodeURIComponent(r.slug)] = twin?.slug ?? null;
  }
  const items = raw.map((r) => {
    const { html, video } = sanitise(r.bodyHtml, `${type}/${r.slug}`);
    const img = r.image ? { ...r.image, local: localImage(r.image.url) } : null;
    const text = plain(html);
    const summary = clip(r.summary || plain((html.match(/<p>[\s\S]*?<\/p>/) ?? [""])[0]), 220);
    const seoTitle = r.seo.title.replace(/\s*[|–-]\s*Exeevo\s*$/i, "").trim();
    return {
      slug: r.slug,
      title: r.title,
      date: r.date.slice(0, 10),
      updated: r.modified.slice(0, 10),
      summary,
      categories: r.categories.filter((c) => c !== "Uncategorized"),
      image: img?.local ? { src: img.local, alt: img.alt || "", width: img.width ?? 1200, height: img.height ?? 630 } : null,
      seo: { title: clip(seoTitle || r.title, 60), description: clip(decodeEntities(r.seo.description) || summary, 155) },
      ...(video ? { videoUrl: video } : {}),
      words: text.split(" ").length,
      bodyHtml: html,
    };
  });
  result[type] = items;
  console.log(type, items.length);
}

await writeFile(new URL("./translated-map.json", import.meta.url), JSON.stringify(translated, null, 1) + "\n");

// Standalone pages (legal, about, partners, careers): same sanitiser, one content file.
const pagesRaw = JSON.parse(await readFile(new URL("pages.raw.json", RAW), "utf8"));
const pages = {};
for (const [key, parts] of Object.entries(pagesRaw)) {
  pages[key] = {
    title: decodeEntities(parts[0].title),
    description: clip(decodeEntities(parts[0].seoDescription) || plain(sanitise(parts[0].bodyHtml, `page/${key}`).html), 155),
    updated: parts[0].modified.slice(0, 10),
    sections: parts.map((p) => ({ slug: p.slug, title: decodeEntities(p.title), bodyHtml: sanitise(p.bodyHtml, `page/${p.slug}`).html })),
  };
}
await writeFile(new URL("../../content/pages.json", import.meta.url), JSON.stringify(pages, null, 1) + "\n");

// Download images (and report non-image uploads).
await mkdir(PUB, { recursive: true });
const queue = [...images.entries()];
let done = 0, bytes = 0;
async function worker() {
  while (queue.length) {
    const [url, { file }] = queue.shift();
    const dest = new URL(file, PUB);
    try { await stat(dest); continue; } catch { /* download */ }
    try {
      const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
      if (!r.ok) throw new Error(String(r.status));
      const buf = Buffer.from(await r.arrayBuffer());
      await mkdir(dirname(dest.pathname), { recursive: true });
      await writeFile(dest, buf);
      bytes += buf.length;
    } catch (e) { log.imageFail.push(`${url} ${e.message}`); }
    if (++done % 50 === 0) console.log("images", done, "/", images.size);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
// Drop images that could not be downloaded, then write the content files.
const failed = new Set(log.imageFail.filter((l) => l.startsWith("http")).map((l) => new URL(l.split(" ")[0]).href));
const deadLocal = [...failed].map((u) => images.get(u)?.local).filter(Boolean);
for (const [type, items] of Object.entries(result)) {
  for (const it of items) {
    for (const l of deadLocal) it.bodyHtml = it.bodyHtml.replace(new RegExp(`<img src="${l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`, "g"), "");
    if (it.image && deadLocal.includes(it.image.src)) it.image = null;
    it.pdfUrl = (it.bodyHtml.match(/href="(\/wp-content\/uploads\/[^"]+\.pdf)"/i) ?? [])[1];
    if (!it.pdfUrl) delete it.pdfUrl;
  }
  await writeFile(new URL(`${type}.json`, OUT), JSON.stringify(items, null, 1) + "\n");
}
// Linked uploads (PDFs etc.) are kept at their original path so old links and backlinks keep working.
const PUBROOT = new URL("../../public/", import.meta.url);
let pdfBytes = 0;
for (const p of uploads) {
  const dest = new URL(decodeURIComponent(p).replace(/^\//, ""), PUBROOT);
  try { await stat(dest); continue; } catch { /* download */ }
  try {
    const r = await fetch(`https://exeevo.com${p}`, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(String(r.status));
    const buf = Buffer.from(await r.arrayBuffer());
    await mkdir(dirname(dest.pathname), { recursive: true });
    await writeFile(dest, buf);
    pdfBytes += buf.length;
  } catch (e) { log.imageFail.push(`${p} ${e.message}`); }
}
console.log("uploads MB", (pdfBytes / 1e6).toFixed(1));
await writeFile(new URL("./.raw/sanitise-log.json", import.meta.url), JSON.stringify({ ...log, unmappedLinks: [...log.unmappedLinks], uploads: [...uploads], images: images.size, bytes }, null, 1));
console.log("images total", images.size, "downloaded MB", (bytes / 1e6).toFixed(1), "failed", log.imageFail.length, "uploads linked", uploads.size, "unmapped links", log.unmappedLinks.size);
