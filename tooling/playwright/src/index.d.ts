import type { PlaywrightTestConfig } from "@playwright/test";

export interface PlaywrightConfigOptions {
    testDir?: string;
    outputDir?: string;
    baseURL?: string;
    port?: number | string;
    webServerCommand?: string;
    projects?: PlaywrightTestConfig["projects"];
    additionalConfig?: Partial<PlaywrightTestConfig>;
}

export declare function createPlaywrightConfig(options?: PlaywrightConfigOptions): PlaywrightTestConfig;

export declare function createPlaywrightStorybookConfig(options?: PlaywrightConfigOptions): PlaywrightTestConfig;
