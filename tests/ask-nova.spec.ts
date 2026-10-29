import { expect, test } from "@playwright/test";
import { askNova, features } from "../content/askNova";

test("ask-nova: one h1, every feature is in the HTML and Ask-Nova Assistant (06) is in the Plus list", async ({ request, page }) => {
  const html = await (await request.get("/ask-nova")).text();
  for (const f of features) expect(html, f.name).toContain(f.name);
  expect(features.find((f) => f.num === "06")?.tier).toBe("plus");
  expect(features.filter((f) => f.tier === "plus")).toHaveLength(10);
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(askNova.h1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("dial: click and arrow keys change the selected feature", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  const node = (n: string, name: string) => page.getByRole("button", { name: `Feature ${n}, ${name}` }).first();
  await expect(node("01", "AI Summaries")).toHaveAttribute("aria-pressed", "true");
  await node("03", "Conversation Analysis").click();
  await expect(node("03", "Conversation Analysis")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("03 of 13 · During and after").filter({ visible: true })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(node("04", "Embedded Note Taker")).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Next feature", exact: true }).click();
  await expect(node("05", "Companion App")).toHaveAttribute("aria-pressed", "true");
});

test("feature list: stage filter narrows the list and 'All 13 features' restores it", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  const rows = page.locator("#features :is([id^='f0'], [id^='f1'])");
  await expect(rows).toHaveCount(13);
  const stage = page.getByRole("group", { name: "Filter by stage" }).getByRole("button", { name: /Anywhere/ });
  await stage.click();
  await expect(stage).toHaveAttribute("aria-pressed", "true");
  await expect(rows).toHaveCount(2);
  await page.getByRole("button", { name: "All 13 features" }).click();
  await expect(rows).toHaveCount(13);
});

test("'Read about this feature' and the Plus tiles jump to that feature in the list", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Feature 05, Companion App" }).first().click();
  await page.getByRole("button", { name: askNova.dial.read }).filter({ visible: true }).click();
  await expect(page.locator("#f05")).toBeInViewport();
  await page.getByRole("button", { name: /^09\s*Ask-Nova Studio/ }).click();
  await expect(page.locator("#f09")).toBeInViewport();
});

test("demo buttons lead to the Talk to our team form; JSON-LD lists 13 features; the nav has Ask-Nova after Platform", async ({ page, request }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  for (const b of await page.getByRole("link", { name: "Get a demo" }).all()) await expect(b).toHaveAttribute("href", "/#demo");
  const nav = page.getByRole("navigation", { name: "Primary" }).getByRole("link");
  const names = await nav.allTextContents();
  expect(names.map((n) => n.trim()).slice(0, 3)).toEqual(["Platform", "Ask-Nova", "Services"]);
  await expect(page.locator("#features ul[aria-label=\"Built on\"]")).toHaveCount(13);
  const html = await (await request.get("/ask-nova")).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const app = blocks.flatMap((b) => b["@graph"] ?? []).find((n: { "@type": string }) => n["@type"] === "SoftwareApplication");
  expect(app.featureList).toHaveLength(13);
});

test("scroll animations: below-the-fold blocks start hidden, reveal once, and are never hidden again", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "reduced-motion", "reveals are disabled under reduced motion");
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const hidden = await page.locator(".rv-hide").count();
  expect(hidden, "reveal targets waiting below the fold").toBeGreaterThan(10);
  const row = page.locator("#licensing-title").locator("xpath=..");
  await expect(row).toHaveClass(/rv-hide/);
  await row.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await expect(row).not.toHaveClass(/rv-hide/);
  expect(Number(await row.evaluate((e) => getComputedStyle(e).opacity))).toBe(1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await expect(row).not.toHaveClass(/rv-hide/);
});

test("hero load animation: dial nodes and ticks animate in and end fully visible", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const node = page.getByRole("button", { name: "Feature 07, Voice Interaction" }).first();
  expect(Number(await node.evaluate((e) => getComputedStyle(e).opacity))).toBe(1);
});
