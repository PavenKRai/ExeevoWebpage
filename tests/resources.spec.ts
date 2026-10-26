import { expect, test } from "@playwright/test";
import { localResources as getResources } from "../content/resources/local";
import type { ResourceType } from "../content/resources/types";
import { resourceHref } from "../lib/resources";

const lists = ["/resources", "/resources/blog", "/resources/white-papers", "/resources/webinars", "/resources/case-studies", "/resources/press-releases", "/resources/analyst-reports", "/events", "/glossary", "/about", "/partners", "/privacy", "/cookies", "/site-map"];
const types: ResourceType[] = ["blog", "white-papers", "webinars", "case-studies", "press-releases", "analyst-reports", "events", "glossary"];

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

test("glossary search filters terms", async ({ page }) => {
  await page.goto("/glossary");
  const term = getResources("glossary")[0];
  await page.getByLabel("Search terms").fill(term.title.slice(0, 5));
  await expect(page.getByRole("link", { name: term.title })).toBeVisible();
  await page.getByLabel("Search terms").fill("zzzzzz-no-match");
  await expect(page.getByText(/No terms match/)).toBeVisible();
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
