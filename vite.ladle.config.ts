import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
    interface Future {
        v3_singleFetch: true;
    }
}

export default defineConfig({
    plugins: [tsconfigPaths()],
});
