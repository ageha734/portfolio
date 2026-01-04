import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PortfolioPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoPortfolio() {
        await super.goto("/portfolio");
    }

    async gotoPortfolioLadle() {
        await super.goto("/iframe.html?id=pages-portfolio--default");
    }

    async expectHeroVisible() {
        await expect(this.page.getByRole("heading", { level: 1 })).toBeVisible();
    }

    async expectNavigationVisible() {
        await expect(this.page.getByRole("navigation")).toBeVisible();
    }

    async expectCurrentProjectsSectionVisible() {
        const currentSection = this.page.locator("section").filter({
            hasText: /right now|what i'm building|current/i,
        });
        await expect(currentSection.first()).toBeVisible();
    }

    async expectPastProjectsSectionVisible() {
        const pastSection = this.page.locator("section").filter({
            hasText: /in the past|what i've built|past/i,
        });
        await expect(pastSection.first()).toBeVisible();
    }

    async expectPortfolioItemsVisible() {
        const items = this.page.locator("[class*='preview'], [class*='Preview'], article");
        const count = await items.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickFirstPortfolioItem() {
        const firstItem = this.page.locator("[class*='preview'] a, [class*='Preview'] a, article a").first();
        await firstItem.click();
    }

    async expectPortfolioGridVisible() {
        const grid = this.page.locator("[class*='grid']").filter({
            has: this.page.locator("[class*='preview'], [class*='Preview']"),
        });
        await expect(grid.first()).toBeVisible();
    }
}
