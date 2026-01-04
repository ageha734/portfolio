import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "Tech Docs",
    tagline: "Documentation for tech projects",
    favicon: "favicon.ico",

    future: {
        v4: false,
    },

    url: "https://ageha734.github.io",
    baseUrl: "/docs/",
    organizationName: "ageha734",
    projectName: "docs",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "ja",
        locales: ["ja"],
    },

    staticDirectories: ["docs/static"],

    presets: [
        [
            "classic",
            {
                docs: {
                    path: "./docs/prompt",
                    sidebarPath: "./sidebars.ts",
                    editUrl: "https://github.com/ageha734/portfolio-docs/tree/master/docs/",
                },
                blog: false,
                theme: {
                    customCss: "./docs/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

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
