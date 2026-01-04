import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoHome() {
        await super.goto("/");
    }

    async gotoHomeLadle() {
        await super.goto("/iframe.html?id=pages-home--default");
    }

    async expectHeroVisible() {
        await expect(this.page.getByRole("heading", { level: 1 })).toBeVisible();
    }

    async expectNavigationVisible() {
        await expect(this.page.getByRole("navigation")).toBeVisible();
    }

    async clickBlogLink() {
        await this.page.getByRole("link", { name: /blog/i }).click();
    }

    async clickPortfolioLink() {
        await this.page.getByRole("link", { name: /portfolio/i }).click();
    }
}
