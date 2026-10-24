import { expect, test } from "@playwright/test";

test("hero and navigation are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Sangamesh M Kuri/i })).toBeVisible();
  await page.getByRole("link", { name: "Projects" }).first().click();
  await expect(page.locator("#projects")).toBeVisible();
});
