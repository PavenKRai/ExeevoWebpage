import { expect, test, type Page } from "@playwright/test";

/**
 * The cookie banner and Google Analytics exist only when NEXT_PUBLIC_GA_ID is set at build time. The default test server has no ID
 * (first test). The rest need a server built with an ID, e.g. `NEXT_PUBLIC_GA_ID=G-TEST123 pnpm build && next start -p 3200`, and
 * ANALYTICS_URL=http://localhost:3200. Requests to Google are blocked and recorded so no hit ever leaves the machine.
 */
test("without a measurement ID there is no cookie banner, no Cookie settings button and no Google request", async ({ page }) => {
  const google: string[] = [];
  await page.route(/google(tagmanager|-analytics)\.com/, (r) => { google.push(r.request().url()); return r.abort(); });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-consent-banner]")).toHaveCount(0);
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
  const gate = (page: Page) => page.getByRole("region", { name: "Cookie preferences" });

  test("first visit: a banner sits at the bottom, the site stays visible and usable, and nothing is sent to Google", async ({ page }) => {
    const google = await watch(page);
    await page.goto("/about", { waitUntil: "networkidle" });
    await expect(gate(page)).toBeVisible();
    await expect(gate(page).getByRole("button", { name: "Accept all" })).toBeVisible();
    await expect(gate(page).getByRole("button", { name: "Reject non-essential" })).toBeVisible();
    const box = await gate(page).boundingBox();
    const vh = page.viewportSize()!.height;
    expect(box!.y + box!.height).toBeGreaterThan(vh - 40); // at the bottom edge
    expect(box!.height).toBeLessThan(vh * 0.4); // not a wall
    // not blocking: the page is not inert, scrolls, and its links work
    expect(await page.evaluate(() => [...document.body.children].some((e) => (e as HTMLElement).inert))).toBe(false);
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
    await page.getByRole("link", { name: "Platform" }).first().click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(gate(page)).toBeVisible(); // stays until a choice is made
    expect(google).toEqual([]);
  });

  test("Reject non-essential: the banner closes, the choice persists, still nothing is sent", async ({ page }) => {
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

  test("Accept all: Google Analytics loads, the choice persists and the banner stays away on other pages", async ({ page }) => {
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

  test("the policy link opens the policy page and the banner is still there until a choice is made", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await gate(page).getByRole("link", { name: "Cookie policy" }).click();
    await expect(page).toHaveURL(/\/cookies$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(gate(page)).toBeVisible();
  });

  test("Cookie settings in the footer reopens the banner and a new choice applies", async ({ page }) => {
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

  test("the banner fits phones and works with reduced motion", async ({ browser }) => {
    for (const reducedMotion of ["no-preference", "reduce"] as const) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 780 }, reducedMotion });
      const page = await ctx.newPage();
      await page.goto(`${process.env.ANALYTICS_URL}/`, { waitUntil: "networkidle" });
      await expect(gate(page)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
      const box = await gate(page).getByRole("button", { name: "Accept all" }).boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect((await gate(page).boundingBox())!.height).toBeLessThan(780 * 0.5);
      await ctx.close();
    }
  });
});
