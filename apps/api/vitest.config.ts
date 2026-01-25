import { createVitestConfig } from "@portfolio/vitest-config";
import { defineConfig } from "vitest/config";

export default defineConfig({
    ...createVitestConfig({
        coverageDir: "../../wiki/reports/test/api",
    }),
    test: {
        ...createVitestConfig({
            coverageDir: "../../wiki/reports/test/api",
        }).test,
        environment: "miniflare",
        environmentOptions: {
            bindings: {
                DB: {},
            },
        },
    },
});
