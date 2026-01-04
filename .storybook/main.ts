import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
    stories: ["../app/**/*.stories.{ts,tsx}"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/addon-a11y",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    async viteFinal(config) {
        const filteredPlugins = (config.plugins || []).filter((plugin) => {
            if (!plugin) return false;

            if (Array.isArray(plugin)) {
                const [pluginFn] = plugin;
                if (pluginFn && typeof pluginFn === "object" && "name" in pluginFn) {
                    const name = String((pluginFn as { name?: unknown }).name || "");
                    if (name.toLowerCase().includes("remix")) {
                        return false;
                    }
                }
                if (typeof pluginFn === "function") {
                    const fnName = String((pluginFn as { name?: unknown }).name || "");
                    if (fnName.toLowerCase().includes("remix")) {
                        return false;
                    }
                }
            }

            // プラグインがオブジェクトの場合
            if (typeof plugin === "object" && !Array.isArray(plugin)) {
                if ("name" in plugin) {
                    const name = String((plugin as { name?: unknown }).name || "");
                    if (name.toLowerCase().includes("remix")) {
                        return false;
                    }
                }
            }

            // プラグインが関数の場合
            if (typeof plugin === "function") {
                const fnName = String((plugin as { name?: unknown }).name || "");
                if (fnName.toLowerCase().includes("remix")) {
                    return false;
                }
            }

            return true;
        });

        return mergeConfig(
            {
                ...config,
                plugins: filteredPlugins,
            },
            {
                plugins: [
                    tsconfigPaths({
                        ignoreConfigErrors: true,
                    }),
                ],
                resolve: {
                    alias: {
                        "~": resolve(__dirname, "../app"),
                        "~/shared": resolve(__dirname, "../app/shared"),
                        "~/entities": resolve(__dirname, "../app/entities"),
                        "~/features": resolve(__dirname, "../app/features"),
                        "~/widgets": resolve(__dirname, "../app/widgets"),
                        "~/routes": resolve(__dirname, "../app/routes"),
                        "@remix-run/react": resolve(__dirname, "./mocks/remix-react.tsx"),
                    },
                },
                server: {
                    watch: {
                        ignored: ["**/.cache/**", "**/docs/**"],
                    },
                },
            },
        );
    },
};

export default config;
