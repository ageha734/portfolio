import type { Config } from "orval";

const config: Config = {
    api: {
        input: {
            target: "../../apps/wiki/reference/openapi.yaml",
        },
        output: {
            target: "./src/generated/api.ts",
            client: "axios",
            httpClient: "axios",
            mode: "tags-split",
            override: {
                mutator: {
                    path: "./src/generated/mutator.ts",
                    name: "customInstance",
                },
            },
        },
    },
};

export default config;
