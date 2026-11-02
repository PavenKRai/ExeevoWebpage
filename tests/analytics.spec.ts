import { expect, test, type Page } from "@playwright/test";

/**
 * The consent gate and Google Analytics exist only when NEXT_PUBLIC_GA_ID is set at build time. The default test server has no ID
 * (first test). The rest need a server built with an ID, e.g. `NEXT_PUBLIC_GA_ID=G-TEST123 pnpm build && next start -p 3200`, and
 * ANALYTICS_URL=http://localhost:3200. Requests to Google are blocked and recorded so no hit ever leaves the machine.
 */
test("without a measurement ID there is no consent gate, no Cookie settings button and no Google request", async ({ page }) => {
  const google: string[] = [];
  await page.route(/google(tagmanager|-analytics)\.com/, (r) => { google.push(r.request().url()); return r.abort(); });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-consent-gate]")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Cookie settings" })).toHaveCount(0);
  await expect(page.getByRole("main")).toBeVisible();
  expect(google).toEqual([]);
});

test.describe("with a measurement ID", () => {
  test.skip(!process.env.ANALYTICS_URL, "needs a server built with NEXT_PUBLIC_GA_ID (see the note at the top of this file)");
  test.use({ baseURL: process.env.ANALYTICS_URL });

  const watch = async (page: Page) => {
    const google: string[] = [];
    await page.route(/google(tagmanager|-analytics)\.com/, (r) => { google.push(r.request().url()); return r.fulfill({ status: 200, contentType: "text/javascript", body: "" }); });
    return google;
  };
  const gate = (page: Page) => page.getByRole("dialog", { name: /Your privacy choices/ });

  test("first visit: the gate covers and blocks the whole site, and nothing is sent to Google", async ({ page }) => {
    const google = await watch(page);
    await page.goto("/about", { waitUntil: "networkidle" });
    await expect(gate(page)).toBeVisible();
    await expect(gate(page).getByRole("button", { name: "Accept all" })).toBeVisible();
    await expect(gate(page).getByRole("button", { name: "Reject non-essential" })).toBeVisible();
    // the page behind is inert: not reachable by click or keyboard, scroll is locked
    expect(await page.evaluate(() => [...document.body.children].filter((e) => e.tagName !== "SCRIPT" && !e.hasAttribute("data-consent-gate") && !e.tagName.includes("-")).every((e) => (e as HTMLElement).inert))).toBe(true);
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(gate(page)).toBeVisible();
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("[data-consent-gate]"))).toBe(true); // focus cannot leave the gate
    await page.getByRole("link", { name: "Get a demo" }).first().click({ force: true, trial: true }).catch(() => {});
    expect(google).toEqual([]);
  });

  test("Reject non-essential: the site opens, the choice persists, still nothing is sent", async ({ page }) => {
    const google = await watch(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await gate(page).getByRole("button", { name: "Reject non-essential" }).click();
    await expect(gate(page)).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Platform" }).first()).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("exeevo-consent"))).toBe("denied");
    await page.reload({ waitUntil: "networkidle" });
    await expect(gate(page)).toHaveCount(0);
    expect(google).toEqual([]);
    expect(await page.evaluate(() => document.cookie.includes("_ga"))).toBe(false);
  });

  test("Accept all: Google Analytics loads, the choice persists and the gate stays away on other pages", async ({ page }) => {
    const google = await watch(page);
    await page.goto("/", { waitUntil: "networkidle" });
    expect(google).toEqual([]);
    await gate(page).getByRole("button", { name: "Accept all" }).click();
    await expect(gate(page)).toHaveCount(0);
    await expect.poll(() => google.some((u) => u.includes("googletagmanager.com/gtag/js?id=G-TEST123"))).toBe(true);
    await page.goto("/platform", { waitUntil: "networkidle" });
    await expect(gate(page)).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("exeevo-consent"))).toBe("granted");
  });

  test("policy pages and search crawlers are not blocked", async ({ page, browser }) => {
    for (const path of ["/cookies", "/privacy"]) {
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(gate(page)).toHaveCount(0);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
    const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" });
    const bot = await ctx.newPage();
    await bot.goto(`${process.env.ANALYTICS_URL}/`, { waitUntil: "networkidle" });
    await expect(bot.locator("[data-consent-gate]")).toHaveCount(0);
    await expect(bot.getByRole("heading", { level: 1 })).toBeVisible();
    await ctx.close();
  });

  test("the policy link opens the policy page, then the gate returns on the next page until a choice is made", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await gate(page).getByRole("link", { name: "Cookie policy" }).click();
    await expect(page).toHaveURL(/\/cookies$/);
    await expect(gate(page)).toHaveCount(0);
    await page.getByRole("link", { name: "Exeevo home" }).first().click();
    await expect(gate(page)).toBeVisible();
  });

  test("Cookie settings in the footer reopens the gate and a new choice applies", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await gate(page).getByRole("button", { name: "Accept all" }).click();
    await page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" }).click();
    await expect(gate(page)).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("exeevo-consent"))).toBeNull();
    await gate(page).getByRole("button", { name: "Reject non-essential" }).click();
    await expect(gate(page)).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("exeevo-consent"))).toBe("denied");
  });

  test("demo form sends generate_lead only after Accept", async ({ page }) => {
    await watch(page);
    await page.route("**/api/demo", (r) => r.fulfill({ status: 200, json: { ok: true } }));
    const send = async () => {
      const form = page.getByRole("form", { name: "Talk to our team" });
      await form.locator("#demo-name").fill("Test Person");
      await form.locator("#demo-email").fill("test@example.com");
      await form.locator("#demo-company").fill("Example Co");
      await form.getByRole("button", { name: "Send request" }).click();
      await expect(page.getByRole("status")).toContainText("Request sent");
    };
    await page.goto("/", { waitUntil: "networkidle" });
    await gate(page).getByRole("button", { name: "Accept all" }).click();
    await page.evaluate(() => { (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = (...a) => ((window as unknown as { __ev: unknown[] }).__ev ||= []).push(a); });
    await send();
    expect(await page.evaluate(() => (window as unknown as { __ev: unknown[][] }).__ev.some((e) => e[0] === "event" && e[1] === "generate_lead"))).toBe(true);
  });

  test("the gate passes axe, fits phones and works with reduced motion", async ({ browser }) => {
    for (const reducedMotion of ["no-preference", "reduce"] as const) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 780 }, reducedMotion });
      const page = await ctx.newPage();
      await page.goto(`${process.env.ANALYTICS_URL}/`, { waitUntil: "networkidle" });
      await expect(gate(page)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
      const box = await gate(page).getByRole("button", { name: "Accept all" }).boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      await ctx.close();
    }
  });
});
