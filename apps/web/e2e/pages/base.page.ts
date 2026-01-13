import type { Page } from "@playwright/test";

export abstract class BasePage {
    constructor(protected page: Page) {}

    async goto(url: string, options?: { waitUntil?: "load" | "domcontentloaded" | "networkidle" }) {
        await this.page.goto(url, {
            waitUntil: options?.waitUntil || "networkidle",
        });
    }

    async waitForLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async getTitle() {
        return await this.page.title();
    }

    async screenshot(path: string) {
        await this.page.screenshot({ path, fullPage: true });
    }
}
