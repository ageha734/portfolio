import { createVitestConfig } from "@portfolio/vitest-config";
import { defineConfig } from "vitest/config";

export default defineConfig({
    ...createVitestConfig(),
    test: {
        ...createVitestConfig().test,
        environment: "miniflare",
        environmentOptions: {
            bindings: {
                DB: {},
            },
        },
    },
});
