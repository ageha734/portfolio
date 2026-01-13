import { test } from "@playwright/test";
import { UsesPage } from "./uses.page";

test.describe("UsesPage POM", () => {
    test("should work with Ladle", async ({ page }) => {
        const usesPage = new UsesPage(page);

        await usesPage.gotoUsesLadle();
        await usesPage.expectHeroVisible();
        await usesPage.expectNavigationVisible();
    });

    test("should work with actual application", async ({ page }) => {
        const usesPage = new UsesPage(page);

        await usesPage.gotoUses();
        await usesPage.expectHeroVisible();
        await usesPage.expectNavigationVisible();
        await usesPage.expectUsesContentVisible();
    });
});
