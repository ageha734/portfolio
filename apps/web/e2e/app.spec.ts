import "@testing-library/jest-dom/vitest";
import { expect, test } from "@playwright/test";

test.describe("App", () => {
	test("Should navigate to /.", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveURL("/");
	});
});
