import { defineConfig } from "orval";

export default defineConfig({
    graphcms: {
        input: {
            target: "./docs/swagger/openapi.yaml",
        },
        output: {
            mode: "split",
            target: "./tests/mocks/generated",
            schemas: "./tests/mocks/generated/schemas",
            mock: false,
            override: {
                mutator: {
                    path: "./tests/mocks/mutator.ts",
                    name: "customInstance",
                },
            },
        },
    },
});
