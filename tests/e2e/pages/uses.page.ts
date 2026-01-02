import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class UsesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoUses() {
        await super.goto("/uses");
    }

    async gotoUsesLadle() {
        await super.goto("/iframe.html?id=pages-uses--default");
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

    async expectHardwareSectionVisible() {
        const hardwareSection = this.page.locator("section").filter({
            hasText: /hardware|computer|setup/i,
        });
        await expect(hardwareSection.first()).toBeVisible();
    }

    async expectSoftwareSectionVisible() {
        const softwareSection = this.page.locator("section").filter({
            hasText: /software|tools|applications/i,
        });
        await expect(softwareSection.first()).toBeVisible();
    }

    async expectMiscSectionVisible() {
        const miscSection = this.page.locator("section").filter({
            hasText: /misc|miscellaneous|other/i,
        });
        await expect(miscSection.first()).toBeVisible();
    }

    async expectUsesContentVisible() {
        const sections = this.page.locator("section");
        const count = await sections.count();
        expect(count).toBeGreaterThan(0);
    }
}
