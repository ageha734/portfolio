import "@testing-library/jest-dom/vitest";
import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
	test("should navigate to Posts page", async ({ page }) => {
		await page.goto("/");
		await page.getByText("Posts").click();
		await expect(page).toHaveURL("/posts");
	});

	test("should navigate to Portfolios page", async ({ page }) => {
		await page.goto("/");
		await page.getByText("Portfolios").click();
		await expect(page).toHaveURL("/portfolios");
	});

	test("should navigate back to Dashboard", async ({ page }) => {
		await page.goto("/posts");
		await page.getByText("Dashboard").click();
		await expect(page).toHaveURL("/");
	});

	test("should highlight active navigation item", async ({ page }) => {
		await page.goto("/posts");
		const postsLink = page.getByRole("link", { name: "Posts" });
		await expect(postsLink).toHaveClass(/bg-primary/);
	});

	test("should close mobile menu after navigation", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		await page.locator("button[aria-label='Open sidebar']").click();

		await page.getByText("Posts").click();

		await expect(page).toHaveURL("/posts");
	});
});
