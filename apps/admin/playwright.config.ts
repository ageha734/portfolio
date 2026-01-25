import { devices } from "@playwright/test";
import { createPlaywrightConfig } from "@portfolio/playwright-config";
import "dotenv/config";

function getPortFromBaseUrl(baseUrl: string): string {
    try {
        const url = new URL(baseUrl);
        return url.port || "3000";
    } catch {
        return "3000";
    }
}

const baseUrl = process.env.VITE_BASE_URL ?? "http://localhost:3000";
const PORT = getPortFromBaseUrl(baseUrl);

export default createPlaywrightConfig({
    testDir: "./e2e",
    outputDir: "./.results/playwright",
    baseURL: `http://localhost:${PORT}/`,
    port: PORT,
    webServerCommand: process.env.CI ? "bun run start" : "bun run dev:page",
    reportOutputDir: "../wiki/reports/e2e/admin",
    projectName: "admin",
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
        {
            name: "mobile chromium",
            use: {
                ...devices["Pixel 7"],
            },
        },
    ],
});
