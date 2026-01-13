import { test } from "@playwright/test";
import { ResumePage } from "./resume.page";

test.describe("ResumePage POM", () => {
    test("should work with Ladle", async ({ page }) => {
        const resumePage = new ResumePage(page);

        await resumePage.gotoResumeLadle();
        await resumePage.expectNavigationVisible();
        await resumePage.expectNameVisible();
    });

    test("should work with actual application", async ({ page }) => {
        const resumePage = new ResumePage(page);

        await resumePage.gotoResume();
        await resumePage.expectNavigationVisible();
        await resumePage.expectNameVisible();
        await resumePage.expectExperienceSectionVisible();
        await resumePage.expectEducationSectionVisible();
    });
});
