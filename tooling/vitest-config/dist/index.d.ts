import { defineConfig } from "vitest/config";
export interface VitestConfigOptions {
    root?: string;
    tsconfigPath?: string;
    setupFiles?: string[];
    testDir?: string;
    coverageDir?: string;
    additionalAliases?: Record<string, string>;
}
export declare function createVitestConfig(options?: VitestConfigOptions): ReturnType<typeof defineConfig>;
//# sourceMappingURL=index.d.ts.map