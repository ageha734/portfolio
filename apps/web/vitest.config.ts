import { resolve } from "node:path";
import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    root: __dirname,
    tsconfigPath: "./tsconfig.json",
    setupFiles: ["./../../testing/vitest/setup.ts"],
    testDir: "./app",
    coverageDir: "./../../docs/vitest/coverage",
    additionalAliases: {
        "~": resolve(__dirname, "./app"),
        "~/shared": resolve(__dirname, "./app/shared"),
        "~/entities": resolve(__dirname, "./app/entities"),
        "~/features": resolve(__dirname, "./app/features"),
        "~/widgets": resolve(__dirname, "./app/widgets"),
        "~/routes": resolve(__dirname, "./app/routes"),
    },
});
