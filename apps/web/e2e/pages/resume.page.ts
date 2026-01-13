import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ResumePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoResume() {
        await super.goto("/resume");
    }

    async gotoResumeLadle() {
        await super.goto("/iframe.html?id=pages-resume--default");
    }

    async expectNavigationVisible() {
        await expect(this.page.getByRole("navigation")).toBeVisible();
    }

    async expectNameVisible() {
        const nameHeading = this.page.getByRole("heading", { level: 1 });
        await expect(nameHeading).toBeVisible();
    }

    async expectProfileImageVisible() {
        const profileImage = this.page.locator("img[alt*='Matthew'], img[alt*='author'], img[src*='matt']");
        await expect(profileImage.first()).toBeVisible();
    }

    async expectSocialLinksVisible() {
        const socialLinks = this.page.locator(
            "a[href*='github'], a[href*='twitter'], a[href*='linkedin'], a[href*='bluesky']",
        );
        const count = await socialLinks.count();
        expect(count).toBeGreaterThan(0);
    }

    async expectDownloadButtonVisible() {
        const downloadButton = this.page.getByRole("link", { name: /download resume/i });
        await expect(downloadButton).toBeVisible();
    }

    async clickDownloadButton() {
        const downloadButton = this.page.getByRole("link", { name: /download resume/i });
        await downloadButton.click();
    }

    async expectExperienceSectionVisible() {
        const experienceSection = this.page.locator("section").filter({
            hasText: /experience|work|employment/i,
        });
        await expect(experienceSection.first()).toBeVisible();
    }

    async expectEducationSectionVisible() {
        const educationSection = this.page.locator("section").filter({
            hasText: /education|university|school/i,
        });
        await expect(educationSection.first()).toBeVisible();
    }

    async expectShareButtonVisible() {
        const shareButton = this.page.getByRole("button", { name: /share/i });
        await expect(shareButton).toBeVisible();
    }
}
