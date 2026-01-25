import { resolve } from "node:path";
import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    root: __dirname,
    tsconfigPath: "./tsconfig.json",
    testDir: "./src",
    coverageDir: "../../wiki/reports/test/api",
    projectName: "api",
    additionalAliases: {
        "~": resolve(__dirname, "./src"),
    },
    test: {
        environment: "miniflare",
        environmentOptions: {
            bindings: {
                DB: {},
            },
        },
    },
});
