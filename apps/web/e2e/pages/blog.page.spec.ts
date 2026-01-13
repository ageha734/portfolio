import { test } from "@playwright/test";
import { BlogPage } from "./blog.page";

test.describe("BlogPage POM", () => {
    test("should work with Ladle", async ({ page }) => {
        const blogPage = new BlogPage(page);

        await blogPage.gotoBlogLadle();
        await blogPage.expectHeroVisible();
        await blogPage.expectNavigationVisible();
    });

    test("should work with actual application", async ({ page }) => {
        const blogPage = new BlogPage(page);

        await blogPage.gotoBlog();
        await blogPage.expectHeroVisible();
        await blogPage.expectNavigationVisible();
        await blogPage.expectBlogPreviewsVisible();
    });
});
