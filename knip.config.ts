import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: [
        "app/entry.client.tsx",
        "app/entry.server.tsx",
        "vite.config.ts",
        "vitest.config.ts",
        "docusaurus.config.ts",
        "playwright.config.ts",
        "playwright.storybook.config.ts",
        "orval.config.ts",
        "postcss.config.cjs",
        "tailwind.config.ts",
        "biome.json",
        "tspconfig.yaml",
        "functions/[[path]].ts",
        "public/worker.js",
    ],
    project: ["app/**/*.{ts,tsx}", "api/**/*.tsp", "tests/**/*.{ts,tsx}", "docs/**/*.{ts,tsx,js,jsx,mdx}"],
    ignore: [
        "build/**",
        "docs/vitest/**",
        "docs/playwright/**",
        "docs/lighthouse/**",
        "docs/codecept/**",
        "docs/interactions/**",
        "docs/accessibility/**",
        "docs/visual/**",
        "node_modules/**",
        ".cache/**",
        "public/**",
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
    remix: {
        entry: ["app/entry.client.tsx", "app/entry.server.tsx"],
        routes: "app/routes",
    },
    storybook: {
        configDir: ".storybook",
    },
    docusaurus: {
        config: "docusaurus.config.ts",
    },
    vitest: {
        config: "vitest.config.ts",
    },
    typescript: {
        config: "tsconfig.json",
    },
};

export default config;
