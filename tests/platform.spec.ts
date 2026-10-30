import { expect, test } from "@playwright/test";
import { capabilities } from "../content/platform";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/'/g, "&#x27;");

test("platform: one h1, all eleven capabilities and a feature from each are in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/platform")).text();
  for (const c of capabilities) {
    expect(html, c.name).toContain(`id="cap-${c.id}"`);
    expect(html).toContain(esc(c.features[0].title));
  }
  expect(html).toContain("Actionable rep metrics");
  expect(html).toContain("Approved email at scale");
  for (const gone of ["Territory performance map", "Product adoption journey"]) expect(html, gone).not.toContain(gone);
  expect(html).not.toMatch(/>Tenders</);
  expect((html.match(/"@type":"ListItem"/g) ?? []).length).toBeGreaterThanOrEqual(11);
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link")).toHaveCount(11);
});

test("platform: industry filter hides other industries' capabilities and tagged features", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  const jump = page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link");
  await page.getByRole("button", { name: "MedTech", exact: true }).click();
  await expect(page.locator("#cap-cases")).toBeVisible();
  await expect(page.locator("#cap-retail")).toHaveCount(0);
  await expect(page.locator("#cap-field-sales").getByRole("heading", { name: /^Samples/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Consumer Health", exact: true }).click();
  await expect(page.locator("#cap-retail")).toBeVisible();
  await expect(page.locator("#cap-cases")).toHaveCount(0);
  await page.getByRole("button", { name: "All industries" }).click();
  await expect(jump).toHaveCount(11);
  await expect(page.locator("#cap-field-sales").getByRole("heading", { name: /^Samples/ })).toBeVisible();
});

test("platform: 'Used by' filter narrows to matching capabilities (plus those open to every user)", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByLabel("Filter by who uses it").selectOption("MSLs");
  await expect(page.locator("section[id^='cap-']")).toHaveCount(2);
  await expect(page.locator("#cap-medical")).toBeVisible();
  await expect(page.locator("#cap-ask-nova")).toBeVisible();
  await page.getByRole("button", { name: "Consumer Health", exact: true }).click();
  await expect(page.locator("#cap-medical")).toHaveCount(0);
  await expect(page.locator("#cap-ask-nova")).toBeVisible();
  await page.getByRole("button", { name: "All industries" }).click();
  await page.getByLabel("Filter by who uses it").selectOption("All");
  await expect(page.locator("section[id^='cap-']")).toHaveCount(11);
});

test("platform: jump links and old ?module= deep links scroll to the right section", async ({ page }) => {
  await page.goto("/platform?module=event-management", { waitUntil: "networkidle" });
  await expect(page.locator("#cap-events")).toBeInViewport({ timeout: 8000 });
  await page.goto("/platform?module=mobile-app", { waitUntil: "networkidle" });
  await expect(page.locator("#cap-field-sales")).toBeInViewport({ timeout: 8000 });
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link", { name: "Events" }).click();
  await expect(page.locator("#cap-events")).toBeInViewport({ timeout: 8000 });
});

test("platform: every capability shows the screenshot placeholder, device availability and the Ask-Nova note", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByText("1600 × 1000 px recommended")).toHaveCount(capabilities.filter((c) => !c.shot && !c.shots).length); // the rest show their screenshot
  await expect(page.getByText("Available on")).toHaveCount(11);
  await expect(page.getByText("Ask-Nova AI", { exact: true })).toHaveCount(11);
  await expect(page.getByRole("link", { name: "Get a demo" }).last()).toHaveAttribute("href", "/#demo");
});

test("platform: no sideways scroll at phone and tablet width", async ({ page }) => {
  for (const w of [390, 768]) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.goto("/platform", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${w}px`).toBe(0);
  }
});

test("platform: 'Contract teams' role filter shows Account Management", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByLabel("Filter by who uses it").selectOption("Contract teams");
  await expect(page.locator("#cap-accounts")).toBeVisible();
  await expect(page.getByRole("option", { name: "Tender and contract teams" })).toHaveCount(0);
});

test("platform: Ask-Nova capability has a button to the Ask-Nova page, no placeholder text", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByText("Description to be added")).toHaveCount(0);
  await expect(page.locator("#cap-ask-nova").getByRole("link", { name: /Explore Ask-Nova features in depth/ })).toHaveAttribute("href", "/ask-nova");
});

test("platform: ?industry= and ?role= open a filtered view, and changing a filter updates the address", async ({ page }) => {
  await page.goto("/platform?industry=medtech", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "MedTech", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#cap-cases")).toBeVisible();
  await expect(page.locator("#cap-retail")).toHaveCount(0);
  await page.getByRole("button", { name: "Pharma", exact: true }).click();
  await expect(page).toHaveURL(/\/platform\?industry=pharma$/);
  await page.getByRole("button", { name: "All industries" }).click();
  await expect(page).toHaveURL(/\/platform$/);
  await page.goto("/platform?role=msl", { waitUntil: "networkidle" });
  await expect(page.getByLabel("Filter by who uses it")).toHaveValue("MSLs");
  await expect(page.locator("#cap-medical")).toBeVisible();
  await expect(page.locator("#cap-field-sales")).toHaveCount(0);
});

test("old Industries and Solutions by role URLs redirect to the filtered Platform page", async ({ request }) => {
  const cases: [string, RegExp][] = [
    ["/industries", /\/platform$/],
    ["/industries?industry=pharma", /\/platform\?industry=pharma$/],
    ["/industries?industry=medtech", /\/platform\?industry=medtech$/],
    ["/solutions-by-role", /\/platform$/],
    ["/solutions-by-role?role=msl", /\/platform\?role=msl$/],
    ["/solutions-by-role?role=kam", /\/platform\?role=kam$/],
    ["/solutions-by-role?role=consumer-animal-health", /\/platform\?.*industry=consumer-health$/],
    ["/pharma-crm", /\/platform\?industry=pharma$/],
  ];
  for (const [from, to] of cases) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect([301, 308], from).toContain(r.status());
    expect(r.headers()["location"], from).toMatch(to);
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("/industries");
  expect(xml).not.toContain("/solutions-by-role");
  const map = await (await request.get("/site-map")).text();
  expect(map).not.toContain('href="/industries');
  expect(map).not.toContain("/solutions-by-role");
});

test("platform: Medical Affairs is powered by Anju and links to the partner section", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  const med = page.locator("#cap-medical");
  await expect(med.getByRole("link", { name: "Powered by Anju" })).toHaveAttribute("href", "/partners#sol");
  await expect(med.getByRole("link", { name: /Explore Medical Affairs Solutions/ })).toHaveAttribute("href", "/partners#sol");
  await expect(page.getByRole("link", { name: "Powered by Anju" })).toHaveCount(1);
});

test("screenshots open in a dialog; the close button, Escape and a click outside close it", async ({ page }) => {
  await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
  for (const id of ["field-sales", "medical", "marketing", "compliance", "insights", "events", "content", "cases", "retail"]) {
    await expect(page.locator(`#cap-${id} button[aria-haspopup="dialog"]`), id).toHaveCount(1);
  }
  const open = page.locator("#cap-field-sales button[aria-haspopup='dialog']");
  await open.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close screenshot" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
  await open.click();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await open.click();
  await page.mouse.click(5, 300);
  await expect(dialog).toHaveCount(0);
});

test.describe("Field Sales carousel", () => {
  const sales = capabilities.find((c) => c.id === "field-sales")!;
  const shots = sales.shots!;
  const group = (page: import("@playwright/test").Page) => page.locator("#cap-field-sales [role=group][aria-roledescription=carousel]");

  test("four slides in file order; title bar shows the label and counter; arrows and dots navigate", async ({ page }) => {
    expect(shots.map((s) => s.src)).toEqual([0, 1, 2, 3].map((n) => `/platform/field-sales-${n}.webp`));
    await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
    const g = group(page);
    await expect(g.getByText(shots[0].label)).toBeVisible();
    await expect(g.getByText("1 / 4")).toBeVisible();
    await g.hover();
    await g.getByRole("button", { name: "Next screenshot" }).click();
    await expect(g.getByText(shots[1].label)).toBeVisible();
    await expect(g.getByText("2 / 4")).toBeVisible();
    await g.getByRole("button", { name: "Previous screenshot" }).click();
    await g.getByRole("button", { name: "Previous screenshot" }).click(); // wraps to the last
    await expect(g.getByText("4 / 4")).toBeVisible();
    await g.getByRole("button", { name: "Go to screenshot 3" }).click();
    await expect(g.getByText(shots[2].label)).toBeVisible();
    await expect(g.getByRole("button", { name: "Go to screenshot 3" })).toHaveAttribute("aria-current", "true");
    await g.focus();
    await page.keyboard.press("ArrowRight");
    await expect(g.getByText("4 / 4")).toBeVisible();
  });

  test("arrows are hidden until the pointer is over the image", async ({ page }) => {
    await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
    const g = group(page);
    const next = g.getByRole("button", { name: "Next screenshot" });
    await page.mouse.move(2, 2);
    await expect.poll(() => next.evaluate((e) => getComputedStyle(e).opacity)).toBe("0");
    await g.locator(".group\\/shot").hover();
    await expect.poll(() => next.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  });

  test("plays by itself, and stops for good once an arrow is used", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion", "no autoplay under reduced motion");
    await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
    await page.mouse.move(2, 2);
    const g = group(page);
    await expect(g.getByText("2 / 4")).toBeVisible({ timeout: 9000 });
    await g.getByRole("button", { name: "Next screenshot" }).click();
    await expect(g.getByText("3 / 4")).toBeVisible();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(6500);
    await expect(g.getByText("3 / 4")).toBeVisible();
  });

  test("does not autoplay under reduced motion", async ({ page }, info) => {
    test.skip(info.project.name !== "reduced-motion");
    await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
    await page.mouse.move(2, 2);
    await page.waitForTimeout(6500);
    await expect(group(page).getByText("1 / 4")).toBeVisible();
  });

  test("the expand button opens the current slide, which can be browsed in the dialog", async ({ page }) => {
    await page.goto("/platform#cap-field-sales", { waitUntil: "networkidle" });
    const g = group(page);
    await g.getByRole("button", { name: "Go to screenshot 2" }).click();
    await g.getByRole("button", { name: /^Enlarge/ }).click();
    const dialog = page.getByRole("dialog", { name: shots[1].label });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Next screenshot" }).click();
    await expect(page.getByRole("dialog", { name: shots[2].label })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(g.getByText("3 / 4")).toBeVisible();
  });

  test("only capabilities with several screenshots get a carousel; the rest keep a single image", async ({ page }) => {
    await page.goto("/platform", { waitUntil: "networkidle" });
    await expect(page.locator("[aria-roledescription=carousel]")).toHaveCount(capabilities.filter((c) => c.shots).length);
    const accounts = page.locator("#cap-accounts [aria-roledescription=carousel]");
    await expect(accounts.getByText("1 / 2")).toBeVisible();
    await accounts.hover();
    await accounts.getByRole("button", { name: "Next screenshot" }).click();
    await expect(accounts.getByText("2 / 2")).toBeVisible();
  });
});
