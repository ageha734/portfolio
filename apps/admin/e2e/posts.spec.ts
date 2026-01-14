import "@testing-library/jest-dom/vitest";
import { expect, test } from "@playwright/test";

test.describe("Posts Page", () => {
	test("should display posts page", async ({ page }) => {
		await page.goto("/posts");
		await expect(page).toHaveURL("/posts");
		await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
	});

	test("should display posts list message", async ({ page }) => {
		await page.goto("/posts");
		await expect(
			page.getByText("Posts list will be displayed here"),
		).toBeVisible();
	});

	test("should have accessible navigation", async ({ page }) => {
		await page.goto("/posts");
		const postsLink = page.getByRole("link", { name: "Posts" });
		await expect(postsLink).toBeVisible();
		await expect(postsLink).toHaveClass(/bg-primary/);
	});

	test("should maintain layout on posts page", async ({ page }) => {
		await page.goto("/posts");
		await expect(page.getByText("CMS")).toBeVisible();
		await expect(page.getByText("Dashboard")).toBeVisible();
		await expect(page.getByText("Portfolios")).toBeVisible();
	});

	test("should be responsive on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/posts");
		await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
		await expect(
			page.locator("button[aria-label='Open sidebar']"),
		).toBeVisible();
	});
});
