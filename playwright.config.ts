import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL || "http://127.0.0.1:3000";
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  // One retry max: more hides real bugs (flaky = broken arrange/assert).
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  // Playwright stops itself before the CI job limit so the report survives.
  globalTimeout: 20 * 60 * 1000,
  reporter: isCI ? [["html", { open: "never" }], ["github"]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Boot the app locally unless pointed at a deployed preview.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
});
