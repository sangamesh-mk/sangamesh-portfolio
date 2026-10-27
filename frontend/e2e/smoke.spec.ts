import { expect, test } from "@playwright/test";

test("hero and navigation are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Sangamesh M Kuri/i })).toBeVisible();
  await page.getByRole("link", { name: "Projects" }).first().click();
  await expect(page.locator("#projects")).toBeVisible();
});

test("command palette and project details", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: /command palette/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /view details/i }).first().click();
  await expect(page.getByRole("dialog", { name: /connect campus/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /connect campus/i })).toHaveCount(0);
});
