import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            "~": resolve(__dirname, "./app"),
        },
    },

    test: {
        coverage: {
            all: true,
            exclude: ["node_modules", "public/build/**/*"],
            include: [],
            reporter: ["text", "json", "html"],
        },
        globals: true,
        environment: "jsdom",
        include: ["./app/**/*.test.{ts,tsx}"],
        setupFiles: ["./tests/setup/setup-test-env.ts"],
    },
});
