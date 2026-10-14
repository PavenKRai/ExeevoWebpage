import { expect, test } from "@playwright/test";
import { askNova, features } from "../content/askNova";

test("ask-nova: one h1, every feature is in the HTML and the tier placeholder is visible", async ({ request, page }) => {
  const html = await (await request.get("/ask-nova")).text();
  for (const f of features) expect(html, f.name).toContain(f.name);
  expect(html).toContain("[Tier to confirm]");
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

test("carousel: previous/next, stage tabs and the ruler move the visible features", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  const range = page.getByText(/of 13$/).first();
  await expect(range).toHaveText("01–03 of 13");
  await page.getByRole("button", { name: "Next features" }).click();
  await expect(range).toHaveText("02–04 of 13");
  await page.getByRole("button", { name: "Anywhere" }).click();
  await expect(range).toHaveText("07–09 of 13");
  await expect(page.getByRole("button", { name: "Anywhere" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Show feature 12, AI Configurator" }).click();
  await expect(range).toHaveText("11–13 of 13");
  await expect(page.getByRole("button", { name: "Next features" })).toBeDisabled();
});

test("'Read about this feature' and the Plus tiles open that feature in the carousel", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Feature 05, Companion App" }).first().click();
  await page.getByRole("link", { name: askNova.dial.read }).click();
  await expect(page.getByText(/of 13$/).first()).toHaveText("05–07 of 13");
  await page.locator("#studio").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /^09 Ask-Nova Studio/ }).click();
  await expect(page.getByText(/of 13$/).first()).toHaveText("09–11 of 13");
});

test("key-feature deck: previous/next cycle the four cards", async ({ page }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  await expect(page.getByText("Custom skills, tools and agents").first()).toBeVisible();
  await page.getByRole("button", { name: "Next key feature" }).click();
  await expect(page.getByText("Bring in third-party agents").first()).toBeVisible();
  await page.getByRole("button", { name: "Previous key feature" }).click();
  await page.getByRole("button", { name: "Previous key feature" }).click();
  await expect(page.getByText("Compliance-scoped by design").first()).toBeVisible();
});

test("demo buttons lead to the Talk to our team form; JSON-LD lists 13 features; the nav has Ask-Nova after Platform", async ({ page, request }) => {
  await page.goto("/ask-nova", { waitUntil: "networkidle" });
  for (const b of await page.getByRole("link", { name: "Get a demo" }).all()) await expect(b).toHaveAttribute("href", "/services#demo");
  const nav = page.getByRole("navigation", { name: "Primary" }).getByRole("link");
  const names = await nav.allTextContents();
  expect(names.map((n) => n.trim()).slice(0, 3)).toEqual(["Platform", "Ask-Nova", "Industries"]);
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
  expect(hidden, "reveal targets waiting below the fold").toBeGreaterThan(20);
  const row = page.locator("#licensing-title").locator("xpath=ancestor::section").locator(".stagger > *").first();
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
