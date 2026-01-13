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
            type: "doc",
            id: "prompts",
            label: "Prompts",
        },
    ],
};

export default sidebars;
