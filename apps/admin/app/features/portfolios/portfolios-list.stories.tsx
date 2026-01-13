import type { Meta, StoryObj } from "@storybook/react";
import { RouterProvider, createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import { PortfoliosList } from "./portfolios-list";
import { trpc } from "~/shared/lib/trpc";
import { vi } from "vitest";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        portfolios: {
            list: {
                query: vi.fn().mockResolvedValue([
                    {
                        id: "1",
                        title: "E-commerce Platform",
                        slug: "ecommerce-platform",
                        company: "Tech Corp",
                        date: "2023-01-01",
                        current: false,
                        overview: "Built a modern e-commerce platform with React and Node.js",
                    },
                    {
                        id: "2",
                        title: "Mobile App",
                        slug: "mobile-app",
                        company: "Startup Inc",
                        date: "2024-01-01",
                        current: true,
                        overview: "Developed a mobile application using React Native",
                    },
                ]),
            },
        },
    },
}));

const rootRoute = createRootRoute();
const portfoliosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/portfolios",
    component: PortfoliosList,
});

const routeTree = rootRoute.addChildren([portfoliosRoute]);
const router = createRouter({ routeTree });

const meta = {
    title: "Features/PortfoliosList",
    component: PortfoliosList,
    decorators: [
        (Story) => (
            <div className="p-4">
                <RouterProvider router={router} />
            </div>
        ),
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof PortfoliosList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
    decorators: [
        (Story) => {
            vi.mocked(trpc.portfolios.list.query).mockResolvedValueOnce([]);
            return (
                <div className="p-4">
                    <RouterProvider router={router} />
                </div>
            );
        },
    ],
};
