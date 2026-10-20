import { expect, test } from "@playwright/test";

const KILL_CSS = "*,*::before,*::after{animation:none!important;transition:none!important}";

test("home: one h1 with the light and bold phrases, demo described for assistive tech, section order", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("The Microsoft-native platform");
  await expect(h1.locator("b")).toHaveText("for life sciences.");
  await expect(page.getByRole("img", { name: /Animated demo: a pointer hovers/ })).toBeVisible();
  const order = [/Adoption/, "What changes for your teams", /One licence/, /Purpose-built shows up/, /Everything in one view/, /Microsoft underneath/, /Your data stays where you put it/, "Two paths to go live", /Pharma-ready CRM/];
  let last = -1;
  for (const name of order) {
    const h = page.getByRole("heading", { name, level: 2 });
    await expect(h).toBeVisible();
    const y = (await h.boundingBox().then((b) => b?.y)) ?? 0;
    const abs = y + (await page.evaluate(() => scrollY));
    expect(abs, `${String(name)} is below the previous section`).toBeGreaterThan(last);
    last = abs;
  }
});

test("home: the technology strip, 'built for' section and client logos live on the Microsoft page, not Home", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("region", { name: "Microsoft technologies Exeevo is built on" })).toHaveCount(0);
  await expect(page.getByText("Trusted by life sciences leaders")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Built for life sciences/ })).toHaveCount(0);
});

test("home: all eight modules link into the platform and the CTAs go to the right places", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.locator("a[href^='/platform?module='], a[href='/ask-nova']")).toHaveCount(8);
  await expect(grid.getByText(/^On /)).toHaveCount(0);
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Get a demo" }).first()).toHaveAttribute("href", "/services#demo");
  await expect(main.getByRole("link", { name: "Talk to our team" })).toHaveAttribute("href", "/services#demo");
  for (const name of ["Why Microsoft matters", "See the full Microsoft stack", "Built on Microsoft"]) await expect(main.getByRole("link", { name }).first()).toHaveAttribute("href", "/microsoft");
});

test("home: one licence and purpose-built moments carry their copy", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const lic = page.locator("#licence-title").locator("xpath=ancestor::section");
  await expect(lic.getByText("5 contracts · 5 logins")).toBeVisible();
  await expect(lic.getByText("1 contract · 1 login")).toBeVisible();
  await expect(lic.getByText("No bolt-on modules and no separate contracts as teams grow.")).toBeVisible();
  const mom = page.locator("#moments-title").locator("xpath=ancestor::section");
  await expect(mom.locator("ol > li")).toHaveCount(4);
  await expect(mom.getByText("With a generic CRM")).toHaveCount(4);
  await expect(mom.getByText("With Exeevo")).toHaveCount(4);
});

test("home: the record demo animates (pointer and notes pop up one at a time) even with CSS animations switched off", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: KILL_CSS });
  const seen = new Set<number>();
  for (let i = 0; i < 12; i++) {
    const vis = await page.evaluate(() => ["d-t1", "d-t2", "d-t3", "d-t4"].map((c) => parseFloat(getComputedStyle(document.querySelector("." + c)!).opacity) > 0.5));
    expect(vis.filter(Boolean).length, "at most one note at a time").toBeLessThanOrEqual(1);
    vis.forEach((v, k) => v && seen.add(k));
    await page.waitForTimeout(1250);
  }
  expect(seen.size).toBeGreaterThanOrEqual(3);
});

test("home: the adoption phone and the licence stack animate even with CSS animations switched off", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: KILL_CSS });
  const time = (sel: string) => page.evaluate((s) => { const a = document.querySelector(s)?.getAnimations()[0]; return a ? [a.playState, Number(a.currentTime)] as const : null; }, sel);
  for (const sel of [".ad-brief", ".ad-toast", ".ad-mic", ".li-l0", ".li-ck4", ".li-flow"]) {
    await page.locator(sel).first().evaluate((e) => e.scrollIntoView({ block: "center", behavior: "instant" }));
    const a = await time(sel);
    expect(a, `${sel} has a running animation`).not.toBeNull();
    await page.waitForTimeout(700);
    const b = await time(sel);
    expect(b![0]).toBe("running");
    expect(b![1], `${sel} advances`).not.toBe(a![1]);
  }
});

test("home: each animated visual has a working pause control", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const buttons = page.getByRole("button", { name: "Pause animation" });
  await expect(buttons).toHaveCount(3);
  await buttons.first().evaluate((b: HTMLButtonElement) => b.click());
  await expect(page.getByRole("button", { name: "Resume animation" })).toHaveAttribute("aria-pressed", "true");
  const snap = () => page.evaluate(() => ["d-t1", "d-t2", "d-t3", "d-t4"].map((c) => getComputedStyle(document.querySelector("." + c)!).opacity).join());
  const a = await snap();
  await page.waitForTimeout(2500);
  expect(await snap()).toBe(a);
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
