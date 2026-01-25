import { fileURLToPath } from "node:url";
import { createVitestConfig } from "@portfolio/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(
    mergeConfig(
        createVitestConfig({
            setupFiles: ["./vitest.setup.ts"],
        }),
        {
            resolve: {
                alias: {
                    "@portfolio/ui": `${__dirname}src`,
                },
            },
        },
    ),
);
