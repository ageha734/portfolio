import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export interface VitestConfigOptions {
    root?: string;
    tsconfigPath?: string;
    setupFiles?: string[];
    testDir?: string;
    coverageDir?: string;
    additionalAliases?: Record<string, string>;
    projectName?: string;
    test?: Record<string, any>;
}

export function createVitestConfig(options: VitestConfigOptions = {}) {
    const {
        root = process.cwd(),
        tsconfigPath,
        setupFiles = [],
        testDir = "./**",
        coverageDir = "./coverage",
        additionalAliases = {},
        test: testOverrides = {},
    } = options;

    return {
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
        optimizeDeps: {
            disabled: true,
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
                reporter: ["html", "lcov", "json-summary"],
                reportsDirectory: coverageDir,
                thresholds: {
                    lines: 80,
                    functions: 80,
                    branches: 80,
                    statements: 80,
                },
            },
            reporters: options.projectName
                ? [
                      "default",
                      [
                          "@portfolio/vitest-reporter",
                          { outputDir: "../wiki/reports/test", projectName: options.projectName, coverageDir },
                      ],
                  ]
                : ["default"],
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
            deps: {
                inline: true,
                optimizer: {
                    web: {
                        enabled: false,
                    },
                    ssr: {
                        enabled: false,
                    },
                },
            },
            server: {
                deps: {
                    inline: true,
                },
            },
            ...testOverrides,
        },
    };
}
