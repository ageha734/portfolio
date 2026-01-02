import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            "~": resolve(__dirname, "./app"),
            "~/shared": resolve(__dirname, "./app/shared"),
            "~/entities": resolve(__dirname, "./app/entities"),
            "~/features": resolve(__dirname, "./app/features"),
            "~/widgets": resolve(__dirname, "./app/widgets"),
            "~/routes": resolve(__dirname, "./app/routes"),
        },
    },

    test: {
        coverage: {
            exclude: [
                ".cache/**",
                "node_modules/**",
                "public/**",
                "docs/**",
                "tests/mocks/generated/**",
                "**/*.test.{ts,tsx}",
                "**/*.spec.{ts,tsx}",
                "**/*.config.{ts,js}",
            ],
            include: ["./app/**/*.{ts,tsx}"],
            reporter: ["html"],
            reportsDirectory: "./docs/vitest/coverage",
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
        globals: true,
        environment: "jsdom",
        include: ["./app/**/*.test.{ts,tsx}"],
        setupFiles: ["./tests/setup/setup.ts"],
        testTimeout: 10000,
    },
});
