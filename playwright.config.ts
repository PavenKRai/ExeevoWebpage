import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  // BASE_URL points the suite at an already-running server (e.g. a Sanity-backed build on :3100).
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:3000" },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "pnpm build && pnpm start",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 240_000,
      },
  projects: [
    { name: "normal", use: { ...devices["Desktop Chrome"] } },
    { name: "reduced-motion", use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" } },
    // Safari's engine and Firefox: reveals and the hero must behave the same everywhere (they use only
    // IntersectionObserver + CSS transitions), so run the animation-related specs there too.
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: /(reveal|hero)\.spec\.ts/ },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: /(reveal|hero)\.spec\.ts/ },
  ],
});
