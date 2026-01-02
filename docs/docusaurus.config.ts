import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "Portfolio Documentation",
    tagline: "Documentation for portfolio project",
    favicon: "img/favicon.ico",
    url: "https://ageha734.github.io",
    baseUrl: "/portfolio/",
    organizationName: "ageha734",
    projectName: "portfolio",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "ja",
        locales: ["ja"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    editUrl: "https://github.com/ageha734/portfolio/tree/master/docs/",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
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
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Docs",
                },
                {
                    href: "https://github.com/ageha734/portfolio",
                    label: "GitHub",
                    position: "right",
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
                {
                    title: "Community",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/ageha734/portfolio",
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
