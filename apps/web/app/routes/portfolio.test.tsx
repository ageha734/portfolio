import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Portfolio, { meta } from "./portfolio";

vi.mock("~/shared/api/portfolio", () => ({
    loader: vi.fn(),
}));

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
            <RouterLink to={to} {...props}>
                {children}
            </RouterLink>
        ),
        useLoaderData: vi.fn(() => [
            {
                slug: "test-portfolio",
                title: "Test Portfolio",
                company: "Test Company",
                current: true,
                date: "2023-01-01",
                images: [],
                overview: "Test overview",
                thumbnailTemp: "/test.jpg",
            },
        ]),
    };
});

describe("portfolio route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render Portfolio component", () => {
        const wrapper = createRouterWrapper({ route: "/portfolio" });
        render(<Portfolio />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/portfolio" });
        render(<Portfolio />, { wrapper });

        expect(screen.getByText(/Right now/i)).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
