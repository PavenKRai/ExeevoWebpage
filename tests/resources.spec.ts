import { expect, test } from "@playwright/test";
import { localResources as getResources } from "../content/resources/local";
import type { ResourceType } from "../content/resources/types";
import { resourceHref } from "../lib/resources";

const lists = ["/resources", "/resources/blog", "/resources/white-papers", "/resources/webinars", "/resources/case-studies", "/resources/press-releases", "/resources/analyst-reports", "/events", "/about", "/partners", "/privacy", "/cookies", "/site-map"];
const types: ResourceType[] = ["blog", "white-papers", "webinars", "case-studies", "press-releases", "analyst-reports", "events"];

for (const route of lists) {
  test(`resources route ${route} returns 200 with one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
}

test("a detail page per type renders its h1, canonical and clean article HTML", async ({ request }) => {
  for (const type of types) {
    const item = getResources(type)[0];
    const path = resourceHref(type, item.slug);
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    const html = await res.text();
    expect(html.match(/<h1[ >]/g)?.length, `${path} h1`).toBe(1);
    expect(html, `${path} canonical`).toContain(`<link rel="canonical" href="`);
    expect(html, path).not.toContain("wp-block");
    expect(html, path).toContain("application/ld+json");
  }
});

test("blog filters and pagination are URL-driven", async ({ page }) => {
  await page.goto("/resources/blog");
  const next = page.getByRole("link", { name: "Next" });
  await next.click();
  await expect(page).toHaveURL(/page=2/);
  await page.goto("/resources/blog");
  await page.getByRole("navigation", { name: "Filter by topic" }).getByRole("link").nth(1).click();
  await expect(page).toHaveURL(/category=/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("newsletter validates and shows success (API mocked)", async ({ page }) => {
  await page.route("**/api/newsletter", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await page.goto("/resources");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await expect(page.getByText("Enter your work email.")).toBeVisible();
  await page.getByLabel("Work email").fill("jo@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await expect(page.getByRole("status")).toContainText("subscribed");
});

test("old WordPress URLs redirect permanently to their new home", async ({ request }) => {
  const cases: [string, string][] = [
    ["/resources/publications/blog/why-cios-chose-exeevo-built-on-microsofts-1-low-code-platform", "/resources/blog/why-cios-chose-exeevo-built-on-microsofts-1-low-code-platform"],
    ["/products/medical-crm", "/platform?module=medical-crm"],
    ["/a-propos", "/about"],
    ["/politique-de-confidentialite", "/privacy"],
    ["/ressourcen/veroffentlichungen/weisse-papiere", "/resources/white-papers"],
    ["/getting-started", "/services"],
  ];
  for (const [from, to] of cases) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toContain(to);
  }
});

test("hub: tabs with counts, a featured article and a row per type that has content", async ({ page }) => {
  await page.goto("/resources", { waitUntil: "networkidle" });
  const tabs = page.getByRole("navigation", { name: "Resource types" });
  await expect(tabs.getByRole("link", { name: /^All$/ })).toHaveAttribute("aria-current", "page");
  await expect(tabs.getByRole("link", { name: /^Blog\s*\d+$/ })).toHaveAttribute("href", "/resources/blog");
  await expect(tabs.getByRole("link", { name: /^Events\s*\d+$/ })).toHaveAttribute("href", "/events");
  await expect(tabs.getByRole("link", { name: /Glossary/ })).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Featured" })).toBeVisible();
  for (const [type, label] of [["blog", "Blog"], ["white-papers", "White papers"], ["webinars", "Webinars"]] as const) {
    const group = page.locator(`section[aria-labelledby="grp-${type}"]`);
    await expect(group.getByRole("heading", { level: 2, name: label })).toBeVisible();
    await expect(group.locator("article")).toHaveCount(3);
  }
});

test("type page: item count, topic chips and the matching action on cards", async ({ page }) => {
  await page.goto("/resources/white-papers", { waitUntil: "networkidle" });
  await expect(page.getByRole("navigation", { name: "Resource types" }).getByRole("link", { name: /^White papers/ })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText(/^\d+ items?$/)).toBeVisible();
  const withPdf = getResources("white-papers").filter((r) => r.pdfUrl).length;
  if (withPdf) await expect(page.getByRole("link", { name: "Download PDF" }).first()).toBeVisible();
  await page.goto("/resources/webinars", { waitUntil: "networkidle" });
  const withVideo = getResources("webinars").filter((r) => r.videoUrl).length;
  if (withVideo) await expect(page.getByRole("link", { name: "Watch recording" }).first()).toBeVisible();
});

test("article: details only for fields that exist, On this page from H2s, demo card, Keep reading", async ({ page }) => {
  const blog = getResources("blog").find((r) => r.bodyHtml?.includes("<h2")) ?? getResources("blog")[0];
  await page.goto(resourceHref("blog", blog.slug), { waitUntil: "networkidle" });
  await expect(page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/resources/blog");
  await expect(page.getByRole("region", { name: "Details" })).toHaveCount(0);
  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc.getByRole("link").first()).toBeVisible();
  const first = toc.getByRole("link").first();
  const id = (await first.getAttribute("href"))!.slice(1);
  await expect(page.locator(`h2#${id}`)).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Get a demo" }).first()).toHaveAttribute("href", "/#demo");
  await expect(page.locator("section[aria-labelledby='keep-reading-title'] li")).toHaveCount(3);
  const wp = getResources("white-papers").find((r) => r.pdfUrl);
  if (wp) {
    await page.goto(resourceHref("white-papers", wp.slug), { waitUntil: "networkidle" });
    await expect(page.getByRole("region", { name: "Details" }).getByRole("link", { name: "Download PDF" })).toBeVisible();
  }
  const wb = getResources("webinars").find((r) => r.videoUrl);
  if (wb) {
    await page.goto(resourceHref("webinars", wb.slug), { waitUntil: "networkidle" });
    await expect(page.getByRole("region", { name: "Details" }).getByRole("link", { name: "Watch recording" })).toHaveAttribute("href", "#recording");
  }
});

test("no placeholder text on Resources pages (only what comes from the content)", async ({ request }) => {
  const paths = ["/resources", "/resources/blog", "/resources/white-papers", "/events", resourceHref("events", getResources("events")[0].slug), resourceHref("blog", getResources("blog")[0].slug)];
  for (const p of paths) {
    const html = await (await request.get(p)).text();
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
    expect(text, p).not.toMatch(/\[(Title|Summary|Topics|Featured image|Publication date|Read time|Starts|Ends|Location|Registration link|PDF|Recording address|Newsletter description)[^\]]*\]/);
  }
});

test("glossary is removed: 404 pages redirect to Resources and nothing links to it", async ({ request }) => {
  for (const from of ["/glossary", "/glossary/hcp"]) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect([301, 308], from).toContain(r.status());
    expect(r.headers()["location"], from).toMatch(/\/resources$/);
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/glossary");
  expect(await (await request.get("/site-map")).text()).not.toContain("/glossary");
});
