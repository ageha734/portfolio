import rehypePrism from "@mapbox/rehype-prism";
import mdx from "@mdx-js/rollup";
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev";
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

export default defineConfig({
    assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.glsl"],
    build: {
        assetsInlineLimit: 1024,
    },
    plugins: [
        mdx({
            rehypePlugins: [[rehypeImgSize, { dir: "public" }], rehypeSlug, rehypePrism],
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
            providerImportSource: "@mdx-js/react",
        }),
        remixCloudflareDevProxy(),
        remix({
            ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                v3_singleFetch: true,
                v3_lazyRouteDiscovery: true,
            },
            serverModuleFormat: "cjs",
        }),
        tsconfigPaths(),
    ],
});
