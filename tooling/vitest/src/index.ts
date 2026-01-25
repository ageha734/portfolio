import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export interface VitestConfigOptions {
    root?: string;
    tsconfigPath?: string;
    setupFiles?: string[];
    testDir?: string;
    coverageDir?: string;
    additionalAliases?: Record<string, string>;
}

export function createVitestConfig(options: VitestConfigOptions = {}): ReturnType<typeof defineConfig> {
    const {
        root = process.cwd(),
        tsconfigPath,
        setupFiles = [],
        testDir = "./**",
        coverageDir = "./coverage",
        additionalAliases = {},
    } = options;

    return defineConfig({
        plugins: [
            react() as any,
            tsconfigPaths({
                root,
                projects: tsconfigPath ? [tsconfigPath] : undefined,
            }) as any,
        ],
        resolve: {
            alias: {
                ...additionalAliases,
            },
        },
        test: {
            coverage: {
                exclude: [
                    ".cache/**",
                    "node_modules/**",
                    "public/**",
                    "docs/**",
                    "**/*.test.{ts,tsx}",
                    "**/*.spec.{ts,tsx}",
                    "**/*.config.{ts,js}",
                ],
                reporter: ["html", "lcov"],
                reportsDirectory: coverageDir,
                thresholds: {
                    lines: 80,
                    functions: 80,
                    branches: 80,
                    statements: 80,
                },
            },
            globals: true,
            environment: "jsdom",
            include: [`${testDir}/**/*.test.{ts,tsx}`],
            setupFiles,
            testTimeout: 10000,
            pool: "forks",
            poolOptions: {
                forks: {
                    singleFork: true,
                },
            },
            server: {
                deps: {
                    inline: ["@portfolio/**"],
                },
            },
        },
    });
}
