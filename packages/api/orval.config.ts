import type { Config } from "orval";

const config: Config = {
    api: {
        input: {
            target: "openapi.yaml",
        },
        output: {
            target: "./generated/api.ts",
            client: "axios",
            httpClient: "axios",
            mode: "tags-split",
            override: {
                mutator: {
                    path: "./generated/mutator.ts",
                    name: "customInstance",
                },
            },
        },
    },
};

export default config;
