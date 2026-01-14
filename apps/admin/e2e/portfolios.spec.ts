import "@testing-library/jest-dom/vitest";
import { expect, test } from "@playwright/test";

test.describe("Portfolios Page", () => {
    test("should display portfolios page", async ({ page }) => {
        await page.goto("/portfolios");
        await expect(page).toHaveURL("/portfolios");
        await expect(page.getByRole("heading", { name: "Portfolios" })).toBeVisible();
    });

    test("should display portfolios list message", async ({ page }) => {
        await page.goto("/portfolios");
        await expect(page.getByText("Portfolios list will be displayed here")).toBeVisible();
    });

    test("should have accessible navigation", async ({ page }) => {
        await page.goto("/portfolios");
        const portfoliosLink = page.getByRole("link", { name: "Portfolios" });
        await expect(portfoliosLink).toBeVisible();
        await expect(portfoliosLink).toHaveClass(/bg-primary/);
    });

    test("should maintain layout on portfolios page", async ({ page }) => {
        await page.goto("/portfolios");
        await expect(page.getByText("CMS")).toBeVisible();
        await expect(page.getByText("Dashboard")).toBeVisible();
        await expect(page.getByText("Posts")).toBeVisible();
    });

    test("should be responsive on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/portfolios");
        await expect(page.getByRole("heading", { name: "Portfolios" })).toBeVisible();
        await expect(page.locator("button[aria-label='Open sidebar']")).toBeVisible();
    });
});
