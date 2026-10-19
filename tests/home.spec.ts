import { expect, test } from "@playwright/test";

test("home: one h1 with the light and bold phrases, demo described for assistive tech, section order", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("Purpose-built for life sciences.");
  await expect(h1.locator("b")).toHaveText("Powered by Microsoft.");
  await expect(page.getByRole("img", { name: /Animated demo/ })).toBeVisible();
  for (const name of [/Built for life sciences/, /Microsoft underneath/, "What changes for your teams", /Everything in one view/, /Your data stays where you put it/, "Two paths to go live", /Pharma-ready CRM/]) await expect(page.getByRole("heading", { name })).toBeVisible();
});

test("home: all eight modules link into the platform and the CTAs go to the form", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.locator("a[href^='/platform?module='], a[href='/ask-nova']")).toHaveCount(8);
  await expect(page.getByRole("main").getByRole("link", { name: "Get a demo" }).first()).toHaveAttribute("href", "/services#demo");
  await expect(page.getByRole("main").getByRole("link", { name: "Talk to our team" })).toHaveAttribute("href", "/services#demo");
});

test("home: Microsoft links, technology strip and client logos", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const main = page.getByRole("main");
  for (const name of ["Why Microsoft matters", "See the full Microsoft stack", "Built on Microsoft"]) await expect(main.getByRole("link", { name }).first()).toHaveAttribute("href", "/microsoft");
  const strip = page.getByRole("region", { name: "Microsoft technologies Exeevo is built on" });
  await expect(strip.locator("li:not([aria-hidden])").filter({ hasText: /^(Power Platform|Dataverse|Teams)$/ })).toHaveCount(3);
  await expect(strip.locator("li[aria-hidden='true']")).toHaveCount(13);
  for (const n of ["Daiichi-Sankyo", "Johnson & Johnson MedTech", "Sanofi"]) await expect(strip.getByRole("img", { name: n })).toBeVisible();
});

test("home: every module card says which Microsoft product it runs on", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.getByText(/^(On (Power Platform|Dynamics 365|Customer Insights|Dataverse|Microsoft Foundry)|Dynamics 365 backend)$/)).toHaveCount(8);
});

test("home: the 'built entirely on Microsoft' strip moves even with CSS animations switched off, and can be paused", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  const left = () => page.locator(".mq").evaluate((e) => e.getBoundingClientRect().left);
  const a = await left();
  await page.waitForTimeout(1500);
  expect(await left()).toBeLessThan(a - 5);
  const strip = page.getByRole("region", { name: "Microsoft technologies Exeevo is built on" });
  await strip.getByRole("button", { name: "Pause scrolling" }).evaluate((b: HTMLButtonElement) => b.click());
  await expect(strip.getByRole("button", { name: "Resume scrolling" })).toHaveAttribute("aria-pressed", "true");
  const b = await left();
  await page.waitForTimeout(800);
  expect(Math.abs((await left()) - b)).toBeLessThan(1);
});

test("home: 'Built for life sciences' shows the app on top and the Microsoft backend below", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const s = page.locator("#builtfor-title").locator("xpath=ancestor::section");
  await expect(s.getByText("Native mobile app for iOS, Android, Windows and web")).toBeVisible();
  await expect(s.locator("li").filter({ hasText: /^(Dynamics 365|Dataverse|Application Insights)$/ })).toHaveCount(3);
  await expect(s.getByText("+ many more")).toBeVisible();
});

test("home: the record demo animates (pointer and notes pop up one at a time) even with CSS animations switched off", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  const seen = new Set<number>();
  for (let i = 0; i < 12; i++) {
    const vis = await page.evaluate(() => ["d-t1", "d-t2", "d-t3", "d-t4"].map((c) => parseFloat(getComputedStyle(document.querySelector("." + c)!).opacity) > 0.5));
    expect(vis.filter(Boolean).length, "at most one note at a time").toBeLessThanOrEqual(1);
    vis.forEach((v, k) => v && seen.add(k));
    await page.waitForTimeout(1250);
  }
  expect(seen.size).toBeGreaterThanOrEqual(3);
});

test("home: scroll reveals play once, also under reduced motion", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const t = page.locator("#underneath-title");
  expect(await t.evaluate((e) => getComputedStyle(e).opacity)).toBe("0");
  await t.scrollIntoViewIfNeeded();
  const seen = await t.evaluate(
    (e) =>
      new Promise<number[]>((res) => {
        const out: number[] = [];
        const tick = () => (out.push(parseFloat(getComputedStyle(e).opacity)), out.length < 30 ? requestAnimationFrame(tick) : res(out));
        tick();
      }),
  );
  expect(seen.some((o) => o > 0 && o < 1) || seen[0] === 1).toBe(true);
  await page.waitForTimeout(1800);
  expect(await t.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
});

test("home: the record demo can be paused and resumed", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const demo = page.getByRole("img", { name: /Animated demo/ });
  await demo.hover();
  const btn = page.getByRole("button", { name: "Pause animation" });
  await btn.evaluate((b: HTMLButtonElement) => b.click());
  await expect(page.getByRole("button", { name: "Resume animation" })).toHaveAttribute("aria-pressed", "true");
  const snap = () => page.evaluate(() => ["d-t1", "d-t2", "d-t3", "d-t4"].map((c) => getComputedStyle(document.querySelector("." + c)!).opacity).join());
  const a = await snap();
  await page.waitForTimeout(2500);
  expect(await snap()).toBe(a);
});
