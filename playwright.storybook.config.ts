import { defineConfig, devices } from "@playwright/test";

const STORYBOOK_PORT = process.env.STORYBOOK_PORT || "6006";

export default defineConfig({
    testDir: "./tests/e2e/storybook",
    outputDir: "./docs/playwright/result",
    timeout: 30 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["html", { outputFolder: "docs/playwright/report" }],
    ],
    use: {
        actionTimeout: 0,
        baseURL: `http://localhost:${STORYBOOK_PORT}`,
        trace: "on-first-retry",
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
    ],

    webServer: {
        command: `bun run dev:ui`,
        port: Number(STORYBOOK_PORT),
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
        env: {
            STORYBOOK_PORT,
        },
    },
});
