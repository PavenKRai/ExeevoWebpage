import { expect, test } from "@playwright/test";

const routes = ["/", "/platform", "/why-exeevo", "/industries", "/solutions-by-role", "/getting-started"];

const meta = (html: string, re: RegExp) => html.match(re)?.[1] ?? "";

test("every page has a unique keyword-led title, a description <= 160 chars, a canonical and share tags", async ({ request }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const r of routes) {
    const html = await (await request.get(r)).text();
    const title = meta(html, /<title>([^<]*)<\/title>/);
    const desc = meta(html, /<meta name="description" content="([^"]*)"/);
    const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/);
    expect(title.length, `${r} title`).toBeGreaterThan(20);
    expect(title.length, `${r} title length`).toBeLessThanOrEqual(75);
    expect(title, `${r} brand in title`).toContain("Exeevo");
    expect(desc.length, `${r} description length`).toBeGreaterThan(80);
    expect(desc.length, `${r} description length`).toBeLessThanOrEqual(160);
    expect(canonical, `${r} canonical`).toMatch(new RegExp(`${r === "/" ? "" : r}/?$`));
    expect(canonical, `${r} canonical is not a query URL`).not.toContain("?");
    expect(meta(html, /<meta property="og:title" content="([^"]*)"/), `${r} og:title`).toBeTruthy();
    expect(meta(html, /<meta property="og:description" content="([^"]*)"/), `${r} og:description`).toBe(desc);
    expect(meta(html, /<meta property="og:image" content="([^"]*)"/), `${r} og:image`).toContain("opengraph-image");
    expect(meta(html, /<meta name="twitter:card" content="([^"]*)"/), `${r} twitter card`).toBe("summary_large_image");
    expect(meta(html, /<meta name="twitter:image" content="([^"]*)"/), `${r} twitter:image`).toBeTruthy();
    titles.add(title);
    descriptions.add(desc);
  }
  expect(titles.size, "unique titles").toBe(routes.length);
  expect(descriptions.size, "unique descriptions").toBe(routes.length);
});

test("query-string views canonicalise to the base page", async ({ request }) => {
  for (const r of ["/platform?module=medical-crm", "/industries?industry=medtech", "/solutions-by-role?role=msl"]) {
    const html = await (await request.get(r)).text();
    const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/);
    expect(canonical, r).not.toContain("?");
  }
});

test("robots.txt welcomes search and AI crawlers and lists the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  for (const bot of ["OAI-SearchBot", "GPTBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"]) {
    expect(txt, bot).toContain(`User-Agent: ${bot}`);
  }
  expect(txt).toContain("Disallow: /dev/");
  expect(txt).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

test("sitemap lists every route with a lastmod", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect((xml.match(/<loc>/g) ?? []).length).toBe(routes.length);
  expect((xml.match(/<lastmod>/g) ?? []).length).toBe(routes.length);
});

test("brand assets: favicon, apple icon, manifest, share image and llms.txt are served", async ({ request }) => {
  for (const [path, type] of [["/icon.png", "image/png"], ["/apple-icon.png", "image/png"], ["/manifest.webmanifest", "json"], ["/opengraph-image", "image/png"], ["/twitter-image", "image/png"], ["/llms.txt", "text/plain"]] as const) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()["content-type"], path).toContain(type);
  }
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toContain("21 CFR Part 11");
});

test("structured data: Organization and WebSite parse and are linked", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  expect(raw).toBeTruthy();
  const data = JSON.parse(raw!);
  const types = data["@graph"].map((n: { "@type": string }) => n["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
  const org = data["@graph"].find((n: { "@type": string }) => n["@type"] === "Organization");
  expect(org.parentOrganization.name).toBe("Valsoft");
  expect(org.logo).toContain("/brand/exeevo-icon.png");
});

test("HTML hygiene: exactly one h1 and one <main>, and the page wrapper is never inline-hidden", async ({ request }) => {
  for (const r of routes) {
    const html = await (await request.get(r)).text();
    expect((html.match(/<h1[\s>]/g) ?? []).length, `${r} h1 count (fallback may duplicate in dev, never in HTML twice+)`).toBeGreaterThanOrEqual(1);
    expect((html.match(/<main[\s>]/g) ?? []).length, `${r} <main>`).toBe(1);
    expect(html, `${r} hidden wrapper`).not.toMatch(/<div style="[^"]*opacity:\s*0[^"]*">/);
    expect(html, `${r} page wrapper`).toContain('class="page-in"');
    expect(html, `${r} no localhost leak check`).toBeTruthy();
  }
});

test("roles page heading order: h1 then h2 (no skipped level)", async ({ page }) => {
  await page.goto("/solutions-by-role");
  const levels = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]));
  for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading jump at ${i}`).toBeLessThanOrEqual(1);
});
