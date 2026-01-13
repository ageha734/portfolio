import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import { PortfoliosList } from "./portfolios-list";
import { trpc } from "~/shared/lib/trpc";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        portfolios: {
            list: {
                query: vi.fn().mockResolvedValue([
                    {
                        id: "1",
                        title: "Test Portfolio",
                        slug: "test-portfolio",
                        company: "Test Company",
                        date: "2024-01-01",
                        current: false,
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

describe("PortfoliosList", () => {
    test("should render portfolios list", () => {
        render(<RouterProvider router={router} />);
        expect(screen.getByText("Portfolios")).toBeInTheDocument();
        expect(screen.getByText("Manage your portfolio items")).toBeInTheDocument();
    });

    test("should render new portfolio button", () => {
        render(<RouterProvider router={router} />);
        expect(screen.getByText("New Portfolio")).toBeInTheDocument();
    });

    test("should fetch and display portfolios", async () => {
        render(<RouterProvider router={router} />);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(trpc.portfolios.list.query).toHaveBeenCalled();
        expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
    });

    test("should display empty state when no portfolios", async () => {
        vi.mocked(trpc.portfolios.list.query).mockResolvedValueOnce([]);

        render(<RouterProvider router={router} />);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(screen.getByText("No portfolios found")).toBeInTheDocument();
    });
});
