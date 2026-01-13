import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export interface StorybookMainPresetOptions {
    stories: string[];
    rootDir?: string;
    additionalAliases?: Record<string, string>;
    additionalAddons?: string[];
}

export function createStorybookMainPreset(options: StorybookMainPresetOptions): StorybookConfig {
    const { stories, rootDir = process.cwd(), additionalAliases = {}, additionalAddons = [] } = options;

    const config: StorybookConfig = {
        stories,
        addons: [
            "@storybook/addon-essentials",
            "@storybook/addon-interactions",
            "@storybook/addon-links",
            "@storybook/addon-a11y",
            ...additionalAddons,
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

                if (typeof plugin === "object" && !Array.isArray(plugin)) {
                    if ("name" in plugin) {
                        const name = String((plugin as { name?: unknown }).name || "");
                        if (name.toLowerCase().includes("remix")) {
                            return false;
                        }
                    }
                }

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
                            root: rootDir,
                            ignoreConfigErrors: true,
                        }),
                    ],
                    resolve: {
                        alias: {
                            ...additionalAliases,
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

    return config;
}
