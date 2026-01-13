import { test } from "@playwright/test";
import { PortfolioPage } from "./portfolio.page";

test.describe("PortfolioPage POM", () => {
    test("should work with Ladle", async ({ page }) => {
        const portfolioPage = new PortfolioPage(page);

        await portfolioPage.gotoPortfolioLadle();
        await portfolioPage.expectHeroVisible();
        await portfolioPage.expectNavigationVisible();
    });

    test("should work with actual application", async ({ page }) => {
        const portfolioPage = new PortfolioPage(page);

        await portfolioPage.gotoPortfolio();
        await portfolioPage.expectHeroVisible();
        await portfolioPage.expectNavigationVisible();
        await portfolioPage.expectPortfolioItemsVisible();
    });
});
