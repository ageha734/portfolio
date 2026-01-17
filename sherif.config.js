const config = {
    packages: [
        "package.json",
        "apps/*/package.json",
        "packages/*/package.json",
        "tooling/*/package.json",
        "testing/*/package.json",
    ],
    rules: {
        react: {
            react: "18.3.1",
            "react-dom": "18.3.1",
            "@types/react": "18.3.12",
            "@types/react-dom": "18.3.1",
        },
        typescript: {
            typescript: "5.9.3",
        },
        vite: {
            vite: "5.4.0",
            "@vitejs/plugin-react": "5.1.2",
        },
        vitest: {
            vitest: "3.2.4",
            "@vitest/coverage-v8": "3.2.4",
            "@vitest/ui": "3.2.4",
        },
        playwright: {
            playwright: "1.57.0",
            "@playwright/test": "1.57.0",
        },
        storybook: {
            storybook: "8.6.14",
            "@storybook/react": "8.6.14",
            "@storybook/react-vite": "8.6.14",
            "@storybook/addon-essentials": "8.6.14",
            "@storybook/addon-a11y": "8.6.14",
            "@storybook/addon-interactions": "8.6.14",
            "@storybook/addon-links": "8.6.14",
            "@storybook/blocks": "8.6.14",
            "@storybook/test": "8.6.15",
        },
        biome: {
            "@biomejs/biome": "2.3.10",
        },
        remix: {
            "@remix-run/cloudflare": "2.17.2",
            "@remix-run/cloudflare-pages": "2.17.2",
            "@remix-run/react": "2.17.2",
            "@remix-run/dev": "2.17.2",
        },
        docusaurus: {
            "@docusaurus/core": "3.9.2",
            "@docusaurus/preset-classic": "3.9.2",
            "@docusaurus/module-type-aliases": "3.9.2",
            "@docusaurus/tsconfig": "3.9.2",
            "@docusaurus/types": "3.9.2",
        },
        trpc: {
            "@trpc/client": "11.0.0",
            "@trpc/server": "11.0.0",
        },
        tanstack: {
            "@tanstack/react-router": "1.147.3",
            "@tanstack/router-plugin": "1.147.3",
            "@tanstack/router-vite-plugin": "1.147.3",
        },
        cloudflare: {
            "@cloudflare/workers-types": "4.20260101.0",
            wrangler: "4.54.0",
        },
        zod: {
            zod: "4.3.4",
        },
        prisma: {
            "@prisma/adapter-d1": "5.22.0",
            "@prisma/client": "5.22.0",
            prisma: "5.22.0",
        },
        betterAuth: {
            "better-auth": "1.4.11",
            "@better-auth/cli": "1.4.11",
        },
        hono: {
            hono: "4.6.11",
        },
        reactRouter: {
            "react-router": "7.11.0",
            "react-router-dom": "7.11.0",
        },
        testingLibrary: {
            "@testing-library/jest-dom": "6.9.1",
            "@testing-library/react": "16.3.1",
            "@testing-library/user-event": "14.6.1",
        },
        mdx: {
            "@mdx-js/react": "3.1.1",
            "@mdx-js/rollup": "3.1.1",
        },
        rehype: {
            "rehype-img-size": "1.0.1",
            "rehype-slug": "6.0.0",
            "@mapbox/rehype-prism": "0.9.0",
        },
        typespec: {
            "@typespec/compiler": "1.7.1",
            "@typespec/http": "1.7.0",
            "@typespec/openapi3": "1.7.0",
        },
        utilities: {
            dotenv: "17.2.3",
            jsdom: "27.4.0",
            "regenerator-runtime": "0.14.1",
        },
    },
};

export default config;
