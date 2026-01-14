import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

export interface PlaywrightConfigOptions {
    testDir?: string;
    outputDir?: string;
    baseURL?: string;
    port?: number | string;
    webServerCommand?: string;
    projects?: PlaywrightTestConfig["projects"];
    additionalConfig?: Partial<PlaywrightTestConfig>;
}

export function createPlaywrightConfig(options: PlaywrightConfigOptions = {}): PlaywrightTestConfig {
    const {
        testDir = "./e2e",
        outputDir = "./.results/playwright",
        baseURL,
        port = 3000,
        webServerCommand,
        projects,
        additionalConfig = {},
    } = options;

    const resolvedPort = typeof port === "string" ? Number(port) : port;
    const resolvedBaseURL = baseURL ?? `http://localhost:${resolvedPort}/`;

    return {
        testDir,
        outputDir,
        timeout: 30 * 1000,
        expect: {
            timeout: 10 * 1000,
        },
        fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 1 : undefined,
        reporter: [["html", { outputFolder: "./.reports/playwright" }]],
        use: {
            actionTimeout: 0,
            baseURL: resolvedBaseURL,
            trace: "on-first-retry",
        },
        projects: projects ?? [
            {
                name: "chromium",
                use: {
                    ...devices["Desktop Chrome"],
                },
            },
        ],
        ...(webServerCommand && {
            webServer: {
                command: webServerCommand,
                port: resolvedPort,
                reuseExistingServer: !process.env.CI,
                stdout: "pipe",
                stderr: "pipe",
                env: {
                    PORT: String(resolvedPort),
                },
            },
        }),
        ...additionalConfig,
    };
}

export function createPlaywrightStorybookConfig(options: PlaywrightConfigOptions = {}): PlaywrightTestConfig {
    const storybookPort = process.env.STORYBOOK_PORT || "6006";
    const resolvedPort = typeof storybookPort === "string" ? Number(storybookPort) : storybookPort;

    const config = createPlaywrightConfig({
        testDir: options.testDir ?? "./e2e/storybook",
        baseURL: options.baseURL ?? `http://localhost:${resolvedPort}`,
        port: resolvedPort,
        webServerCommand: options.webServerCommand ?? "bun run dev:ui",
        projects: options.projects ?? [
            {
                name: "chromium",
                use: {
                    ...devices["Desktop Chrome"],
                },
            },
        ],
        additionalConfig: options.additionalConfig,
    });

    if (config.webServer && !Array.isArray(config.webServer)) {
        config.webServer = {
            ...config.webServer,
            env: {
                ...config.webServer.env,
                STORYBOOK_PORT: String(resolvedPort),
            },
        };
    }

    return config;
}
