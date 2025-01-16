import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
    interface Future {
        v3_singleFetch: true;
    }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    process.env = { ...process.env, ...env };

    return {
        plugins: [react(), tsconfigPaths()],
    };
});
