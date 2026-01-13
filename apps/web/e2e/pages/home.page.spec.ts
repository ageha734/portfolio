import { test } from "@playwright/test";
import { HomePage } from "./home.page";

test.describe("HomePage POM", () => {
    test("should work with Ladle", async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.gotoHomeLadle();
        await homePage.expectHeroVisible();
        await homePage.expectNavigationVisible();
    });

    test("should work with actual application", async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.gotoHome();
        await homePage.expectHeroVisible();
        await homePage.expectNavigationVisible();
    });
});
