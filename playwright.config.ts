import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
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
