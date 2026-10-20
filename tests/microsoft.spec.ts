import { expect, test } from "@playwright/test";
import { microsoft } from "../content/microsoft";

test("microsoft: one h1, four groups, every product card and the source lines are in the HTML", async ({ request, page }) => {
  const res = await request.get("/microsoft");
  expect(res.status()).toBe(200);
  const html = await res.text();
  for (const x of microsoft.stats.items) expect(html).toContain(x.source.replace("&", "&amp;"));
  await page.goto("/microsoft", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  for (const g of microsoft.groups) await expect(page.locator(`#${g.id}`)).toHaveCount(1);
  await expect(page.locator("article.mscard")).toHaveCount(16);
});

test("microsoft: every stack-card link lands on a real card or group", async ({ page }) => {
  await page.goto("/microsoft", { waitUntil: "networkidle" });
  const hrefs = await page.locator("main a[href^='#']").evaluateAll((as) => as.map((a) => a.getAttribute("href") as string));
  expect(hrefs.length).toBeGreaterThan(10);
  for (const h of new Set(hrefs)) await expect(page.locator(h), h).toHaveCount(1);
});

test("microsoft: Get a demo goes to the form; the page is in the nav and the sitemap", async ({ page, request }) => {
  await page.goto("/microsoft", { waitUntil: "networkidle" });
  for (const b of await page.getByRole("link", { name: "Get a demo" }).all()) await expect(b).toHaveAttribute("href", "/services#demo");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/microsoft");
  expect(await (await request.get("/llms.txt")).text()).toContain("(/microsoft)");
});

for (const w of [390, 768]) {
  test(`microsoft: no horizontal scroll at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto("/microsoft", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
}

test("microsoft: strip moves even with CSS animations off and can be paused; built-for section and Dataverse chips are present", async ({ page }) => {
  await page.goto("/microsoft", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("built natively on Microsoft");
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  const left = () => page.locator(".mq").evaluate((e) => e.getBoundingClientRect().left);
  const a = await left();
  await page.waitForTimeout(1500);
  expect(await left()).toBeLessThan(a - 5);
  const strip = page.getByRole("region", { name: "Microsoft technologies Exeevo is built on" });
  await expect(strip.locator("li[aria-hidden='true']")).toHaveCount(13);
  await strip.getByRole("button", { name: "Pause scrolling" }).evaluate((b: HTMLButtonElement) => b.click());
  const b = await left();
  await page.waitForTimeout(800);
  expect(Math.abs((await left()) - b)).toBeLessThan(1);
  await expect(page.getByRole("heading", { name: /Built for life sciences/ })).toBeVisible();
  const dv = page.locator("#ms-dataverse");
  await expect(dv.getByText("Mobile App", { exact: true })).toBeVisible();
  await expect(dv.getByText("Ask-Nova", { exact: true })).toBeVisible();
  await expect(page.locator("#ms-foundry").getByText("Ask-Nova Studio", { exact: true })).toBeVisible();
});
