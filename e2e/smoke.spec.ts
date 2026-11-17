import { expect, test } from "@playwright/test";

// Smoke = the stranger's journey still starts. Replace the selectors with the
// app's real first screen. Rules: unique data per test (no shared admin user),
// poll with expect() instead of waitForTimeout, assert what the user sees.
test("home page renders for a signed-out visitor", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator("body")).toBeVisible();
});
