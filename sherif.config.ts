import type { SherifConfig } from "sherif";

const config: SherifConfig = {
    packages: [
        "package.json",
        "apps/*/package.json",
        "packages/*/package.json",
        "tooling/*/package.json",
        "testing/*/package.json",
    ],
    rules: {
        react: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
            "@types/react": "^18.3.12",
            "@types/react-dom": "^18.3.1",
        },
        typescript: {
            typescript: "^5.9.3",
        },
        vite: {
            vite: "^5.4.0",
            "@vitejs/plugin-react": "^5.1.2",
        },
        vitest: {
            vitest: "^3.2.4",
            "@vitest/coverage-v8": "^3.2.4",
            "@vitest/ui": "^3.2.4",
        },
        playwright: {
            playwright: "^1.57.0",
            "@playwright/test": "^1.57.0",
        },
        storybook: {
            storybook: "^8.6.14",
            "@storybook/react": "^8.6.14",
            "@storybook/react-vite": "^8.6.14",
            "@storybook/addon-essentials": "^8.6.14",
            "@storybook/addon-a11y": "^8.6.14",
            "@storybook/addon-interactions": "^8.6.14",
            "@storybook/addon-links": "^8.6.14",
            "@storybook/blocks": "^8.6.14",
            "@storybook/test": "^8.6.15",
        },
        biome: {
            "@biomejs/biome": "^2.3.10",
        },
        remix: {
            "@remix-run/cloudflare": "^2.17.2",
            "@remix-run/cloudflare-pages": "^2.17.2",
            "@remix-run/react": "^2.17.2",
            "@remix-run/dev": "^2.17.2",
        },
        docusaurus: {
            "@docusaurus/core": "^3.9.2",
            "@docusaurus/preset-classic": "^3.9.2",
            "@docusaurus/module-type-aliases": "^3.9.2",
            "@docusaurus/tsconfig": "^3.9.2",
            "@docusaurus/types": "^3.9.2",
        },
    },
};

export default config;
