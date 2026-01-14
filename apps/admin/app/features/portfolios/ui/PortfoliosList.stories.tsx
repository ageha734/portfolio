import type { Meta, StoryObj } from "@storybook/react";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { vi } from "vitest";
import * as usePortfoliosModule from "../lib/usePortfolios";
import { PortfoliosList } from "./PortfoliosList";

vi.mock("../lib/usePortfolios");

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
        () => {
            vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
                portfolios: [
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
                ],
                loading: false,
                error: null,
            });
            return (
                <div className="p-4">
                    <RouterProvider router={router} />
                </div>
            );
        },
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof PortfoliosList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
    decorators: [
        () => {
            vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
                portfolios: [],
                loading: false,
                error: null,
            });
            return (
                <div className="p-4">
                    <RouterProvider router={router} />
                </div>
            );
        },
    ],
};
