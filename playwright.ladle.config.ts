import { defineConfig, devices } from "@playwright/test";

const LADLE_PORT = process.env.LADLE_PORT || "61000";

export default defineConfig({
    testDir: "./tests/e2e/pages",
    outputDir: "./docs/ladle/result",
    timeout: 30 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["html", { outputFolder: "docs/ladle/report" }],
    ],
    use: {
        actionTimeout: 0,
        baseURL: `http://localhost:${LADLE_PORT}`,
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
        port: Number(LADLE_PORT),
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
        env: {
            LADLE_PORT,
        },
    },
});
