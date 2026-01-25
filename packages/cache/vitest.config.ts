import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    test: {
        environment: "miniflare",
        environmentOptions: {
            bindings: {
                DB: {},
            },
        },
    },
});
