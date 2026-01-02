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
            ],
        },
        {
            type: "category",
            label: "Development",
            items: [
                "development/setup",
                "development/testing",
                "development/deployment",
            ],
        },
        {
            type: "category",
            label: "Agent",
            items: ["agent/prompts"],
        },
    ],
};

export default sidebars;
