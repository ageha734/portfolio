import { resolve } from "node:path";
import rehypePrism from "@mapbox/rehype-prism";
import mdx from "@mdx-js/rollup";
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev";
import tailwindcss from "@tailwindcss/vite";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
    interface Future {
        v3_singleFetch: true;
    }
}

const isStorybook = process.argv.some((arg) => arg.includes("storybook"));

export default defineConfig({
    assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.glsl"],
    build: {
        assetsInlineLimit: 1024,
        target: "es2022",
        rollupOptions: {
            external: (id) => id === "@xstate/inspect",
        },
    },
    optimizeDeps: {
        exclude: ["@xstate/inspect"],
    },
    resolve: {
        alias: {
            "@xstate/inspect": resolve(__dirname, "./app/shared/mocks/xstate-inspect.ts"),
        },
    },
    plugins: [
        tailwindcss(),
        mdx({
            rehypePlugins: [[rehypeImgSize, { dir: "public" }], rehypeSlug, rehypePrism] as any,
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] as any,
            providerImportSource: "@mdx-js/react",
        }),
        !isStorybook && remixCloudflareDevProxy(),
        !isStorybook &&
            remix({
                ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
                future: {
                    v3_fetcherPersist: true,
                    v3_relativeSplatPath: true,
                    v3_throwAbortReason: true,
                    v3_singleFetch: true,
                    v3_lazyRouteDiscovery: true,
                },
                serverModuleFormat: "cjs",
            }),
        tsconfigPaths({
            ignoreConfigErrors: true,
        }),
    ].filter(Boolean),
});
