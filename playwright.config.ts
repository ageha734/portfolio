import { defineConfig, devices } from "@playwright/test";

import "dotenv/config";

function getPortFromBaseUrl(baseUrl: string): string {
    try {
        const url = new URL(baseUrl);
        return url.port || "3000";
    } catch {
        return "3000"; // デフォルト
    }
}

const baseUrl = process.env.VITE_BASE_URL ?? "http://localhost:3000";
const PORT = getPortFromBaseUrl(baseUrl);

export default defineConfig({
    testDir: "./tests/e2e",
    outputDir: "./docs/playwright/result",
    timeout: 30 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [["html", { outputFolder: "docs/playwright/report" }]],
    use: {
        actionTimeout: 0,
        baseURL: `http://localhost:${PORT}/`,
        trace: "on-first-retry",
    },

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

    webServer: {
        command: process.env.CI ? "bun -w run start-remix-production" : "bun run dev",
        port: Number(PORT),
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
        env: {
            PORT,
        },
    },
});
