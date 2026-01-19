import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function getPluginName(plugin) {
    if (typeof plugin === "object" && plugin !== null && "name" in plugin) {
        const nameValue = plugin.name;
        return typeof nameValue === "string" ? nameValue : "";
    }
    if (typeof plugin === "function") {
        const fnNameValue = plugin.name;
        return typeof fnNameValue === "string" ? fnNameValue : "";
    }
    return "";
}
function shouldExcludeRemixPlugin(plugin) {
    if (!plugin)
        return false;
    if (Array.isArray(plugin)) {
        const [pluginFn] = plugin;
        if (pluginFn) {
            const name = getPluginName(pluginFn);
            if (name.toLowerCase().includes("remix")) {
                return true;
            }
        }
        return false;
    }
    const name = getPluginName(plugin);
    return name.toLowerCase().includes("remix");
}
function filterRemixPlugins(plugins) {
    return plugins.filter((plugin) => !shouldExcludeRemixPlugin(plugin));
}
export function createStorybookMainPreset(options) {
    const { stories, rootDir = process.cwd(), additionalAliases = {}, additionalAddons = [] } = options;
    const sentryNodeStubPath = resolve(__dirname, "./sentry-node-stub.ts");
    const config = {
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
        viteFinal(config) {
            const filteredPlugins = filterRemixPlugins(config.plugins || []);
            return mergeConfig({
                ...config,
                plugins: filteredPlugins,
            }, {
                resolve: {
                    alias: {
                        ...additionalAliases,
                        "@sentry/node": sentryNodeStubPath,
                    },
                },
                optimizeDeps: {
                    exclude: ["@sentry/node"],
                },
                server: {
                    watch: {
                        ignored: ["**/.cache/**", "**/docs/**"],
                    },
                },
            });
        },
    };
    return config;
}
