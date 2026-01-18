import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: "category",
            label: "Architecture",
            items: [
                "architecture/overview",
                "architecture/project-structure",
                "architecture/tech-stack",
                "architecture/feature-sliced",
                "architecture/domain-driven",
            ],
        },
        {
            type: "category",
            label: "Development",
            items: [
                "development/accessibility",
                "development/coding-standards",
                "development/component-patterns",
                "development/data-fetching",
                "development/error-handling",
                "development/performance",
            ],
        },
        {
            type: "category",
            label: "Sequence Diagrams",
            items: [
                {
                    type: "category",
                    label: "API",
                    items: [
                        "sequence/api/posts-list",
                        "sequence/api/post-by-slug",
                        "sequence/api/portfolios-list",
                        "sequence/api/portfolio-by-slug",
                        "sequence/api/blog-list",
                        "sequence/api/blog-detail",
                        "sequence/api/portfolio-list",
                        "sequence/api/portfolio-detail",
                    ],
                },
                {
                    type: "category",
                    label: "Web",
                    items: [
                        "sequence/web/blog-list",
                        "sequence/web/blog-detail",
                        "sequence/web/portfolio-list",
                        "sequence/web/portfolio-detail",
                    ],
                },
            ],
        },
        {
            type: "doc",
            id: "prompts",
            label: "Prompts",
        },
        {
            type: "category",
            label: "Reports",
            items: [
                {
                    type: "link",
                    label: "レポート一覧",
                    href: "/reports",
                },
                {
                    type: "link",
                    label: "E2Eテストレポート",
                    href: "/reports/e2e",
                },
                {
                    type: "link",
                    label: "カバレッジレポート",
                    href: "/reports/coverage",
                },
            ],
        },
    ],
};

export default sidebars;
