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
                    label: "Backend",
                    items: [
                        "sequence/backend-posts-list",
                        "sequence/backend-post-by-slug",
                        "sequence/backend-portfolios-list",
                        "sequence/backend-portfolio-by-slug",
                    ],
                },
                {
                    type: "category",
                    label: "Frontend",
                    items: [
                        "sequence/frontend-blog-list",
                        "sequence/frontend-blog-detail",
                        "sequence/frontend-portfolio-list",
                        "sequence/frontend-portfolio-detail",
                        "sequence/frontend-api-blog-list",
                        "sequence/frontend-api-blog-detail",
                        "sequence/frontend-api-portfolio-list",
                        "sequence/frontend-api-portfolio-detail",
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
