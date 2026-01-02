import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { resolve } from "node:path";
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
        return mergeConfig(config, {
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
                },
            },
            server: {
                watch: {
                    ignored: ["**/.cache/**", "**/docs/**"],
                },
            },
        });
    },
};

export default config;
