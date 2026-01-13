import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: [
        "apps/web/entry.client.tsx",
        "apps/web/entry.server.tsx",
        "apps/**/app/**/*.{ts,tsx}",
        "apps/**/functions/[[path]].ts",
        "apps/**/public/worker.js",
        "apps/**/vite.config.ts",
        "apps/**/vitest.config.ts",
        "apps/**/playwright.config.ts",
        "apps/**/playwright.storybook.config.ts",
        "apps/**/docusaurus.config.ts",
        "packages/**/src/**/*.{ts,tsx}",
        "packages/**/index.ts",
        "tooling/**/*.{ts,tsx}",
        "testing/**/*.{ts,tsx}",
        "generators/**/*.{ts,tsx}",
        "scripts/**/*.{ts,tsx}",
    ],
    project: [
        "apps/**/*.{ts,tsx}",
        "packages/**/*.{ts,tsx}",
        "tooling/**/*.{ts,tsx}",
        "testing/**/*.{ts,tsx}",
        "scripts/*.ts",
    ],
    ignore: [
        "build/**",
        "dist/**",
        "node_modules/**",
        ".cache/**",
        ".turbo/**",
        ".wrangler/**",
        ".coverage/**",
        ".results/**",
        "apps/**/public/**",
        "results/**",
        "report/**",
    ],
    ignoreDependencies: [
        "@types/bun",
        "@types/node",
        "@types/prismjs",
        "@types/react",
        "@types/react-dom",
        "@docusaurus/module-type-aliases",
        "@docusaurus/tsconfig",
        "@docusaurus/types",
    ],
    ignoreBinaries: ["wrangler", "playwright", "docusaurus", "storybook", "tsp", "orval"],
    workspaces: {
        "apps/web": {
            remix: {
                entry: ["app/entry.client.tsx", "app/entry.server.tsx"],
            },
        },
        "apps/wiki": {
            docusaurus: {
                config: "docusaurus.config.ts",
            },
        },
        "packages/ui": {
            storybook: {
                config: ".storybook/main.ts",
            },
        },
        "apps/admin": {
            storybook: {
                config: ".storybook/main.ts",
            },
        },
    },
};

export default config;
