import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
    title: "Tech Docs",
    tagline: "Documentation for tech projects",
    favicon: "favicon.ico",

    future: {
        v4: false,
    },

    url: "https://wiki.ageha734.jp",
    baseUrl: "/",
    organizationName: "ageha734",
    projectName: "portfolio-wiki",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "ja",
        locales: ["ja"],
    },

    staticDirectories: ["static"],

    plugins: [
        function excludePortfolioPackagesPlugin() {
            return {
                name: "exclude-portfolio-packages-plugin",
                configureWebpack(config, isServer) {
                    if (isServer) {
                        return {
                            externals: [/^@portfolio\//],
                        };
                    }
                    return {};
                },
            };
        },
        function polyfillRequireResolveWeak() {
            return {
                name: "polyfill-require-resolve-weak",
                configureWebpack(config, isServer) {
                    if (isServer) {
                        if (typeof require !== "undefined") {
                            // @ts-expect-error - Adding polyfill to require.resolveWeak
                            if (!require.resolveWeak) {
                                // @ts-expect-error - Adding polyfill to require
                                require.resolveWeak = function (id: string) {
                                    try {
                                        return require.resolve(id);
                                    } catch {
                                        return id;
                                    }
                                };
                            }
                        }
                    }
                    return config;
                },
            };
        },
        function fixPostCSSPlugin() {
            return {
                name: "fix-postcss-plugin",
                configureWebpack(config, isServer) {
                    if (!isServer) {
                        const miniCssExtractPlugin = config.plugins?.find(
                            (plugin) =>
                                plugin?.constructor?.name === "MiniCssExtractPlugin",
                        );
                        if (miniCssExtractPlugin && miniCssExtractPlugin.options) {
                            miniCssExtractPlugin.options.ignoreOrder = true;
                        }

                        // Fix PostCSS loader to filter out postcss-modules-local-by-default plugin
                        const rules = config.module?.rules;
                        if (rules) {
                            for (const rule of rules) {
                                if (
                                    rule &&
                                    typeof rule === "object" &&
                                    "oneOf" in rule &&
                                    Array.isArray(rule.oneOf)
                                ) {
                                    for (const oneOfRule of rule.oneOf) {
                                        if (
                                            oneOfRule &&
                                            typeof oneOfRule === "object" &&
                                            Array.isArray(oneOfRule.use)
                                        ) {
                                            for (const useItem of oneOfRule.use) {
                                                if (
                                                    typeof useItem === "object" &&
                                                    useItem !== null &&
                                                    "loader" in useItem &&
                                                    typeof useItem.loader === "string" &&
                                                    useItem.loader.includes("postcss-loader")
                                                ) {
                                                    if (!useItem.options) {
                                                        useItem.options = {};
                                                    }
                                                    const options = useItem.options as {
                                                        postcssOptions?: {
                                                            plugins?: unknown[];
                                                        };
                                                    };
                                                    if (!options.postcssOptions) {
                                                        options.postcssOptions = {};
                                                    }
                                                    if (!options.postcssOptions.plugins) {
                                                        options.postcssOptions.plugins = [];
                                                    }
                                                    // Filter out postcss-modules-local-by-default plugin
                                                    if (Array.isArray(options.postcssOptions.plugins)) {
                                                        options.postcssOptions.plugins =
                                                            options.postcssOptions.plugins.filter(
                                                                (plugin: unknown) => {
                                                                    if (
                                                                        typeof plugin === "object" &&
                                                                        plugin !== null &&
                                                                        "postcssPlugin" in plugin
                                                                    ) {
                                                                        return (
                                                                            (plugin as {
                                                                                postcssPlugin?: string;
                                                                            }).postcssPlugin !==
                                                                            "postcss-modules-local-by-default"
                                                                        );
                                                                    }
                                                                    return true;
                                                                },
                                                            );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return config;
                },
            };
        },
    ],

    presets: [
        [
            "classic",
            {
                docs: {
                    path: "./docs",
                    sidebarPath: "./sidebars.ts",
                },
                blog: false,
                theme: {
                    customCss: "./app/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themes: ["@docusaurus/theme-mermaid"],

    markdown: {
        mermaid: true,
    },

    themeConfig: {
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "Portfolio Docs",
            logo: {
                alt: "Portfolio Logo",
                src: "branding/icons/icon-96.png",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Docs",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "prompt",
                    items: [
                        {
                            label: "Architecture",
                            to: "/prompt/architecture/overview",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Portfolio Project. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
