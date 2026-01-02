import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class BlogPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoBlog() {
        await super.goto("/blog");
    }

    async gotoBlogLadle() {
        await super.goto("/iframe.html?id=pages-blog--default");
    }

    async expectHeroVisible() {
        await expect(
            this.page.getByRole("heading", { level: 1 }),
        ).toBeVisible();
    }

    async expectNavigationVisible() {
        await expect(
            this.page.getByRole("navigation"),
        ).toBeVisible();
    }

    async expectFeaturedPostVisible() {
        const featuredSection = this.page.locator("section").filter({
            has: this.page.getByRole("heading", { level: 2 }),
        });
        await expect(featuredSection.first()).toBeVisible();
    }

    async expectBlogPreviewsVisible() {
        const previews = this.page.locator("article, [class*='preview'], [class*='Preview']");
        const count = await previews.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickFirstBlogPost() {
        const firstPost = this.page.locator("article a, [class*='preview'] a").first();
        await firstPost.click();
    }

    async expectTechnicalSectionVisible() {
        const technicalSection = this.page.locator("section").filter({
            hasText: /technical|ramblings/i,
        });
        await expect(technicalSection.first()).toBeVisible();
    }

    async expectDIYSectionVisible() {
        const diySection = this.page.locator("section").filter({
            hasText: /do it yourself|DIY/i,
        });
        await expect(diySection.first()).toBeVisible();
    }
}
