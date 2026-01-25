import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["./**/*.test.{ts,tsx}"],
        coverage: {
            exclude: [
                ".cache/**",
                "node_modules/**",
                "generated/**",
                "**/*.test.{ts,tsx}",
                "**/*.spec.{ts,tsx}",
                "**/*.config.{ts,js}",
            ],
            reporter: ["html", "lcov"],
            reportsDirectory: "./coverage",
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
        testTimeout: 10000,
    },
});
