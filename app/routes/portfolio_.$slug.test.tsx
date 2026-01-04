import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Portfolio_Slug, { meta } from "./portfolio_.$slug";

vi.mock("~/routes/api.portfolio.$slug", () => ({
    loader: vi.fn(),
}));

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useLoaderData: vi.fn(() => ({
            title: "Test Portfolio",
            company: "Test Company",
            intro: "Test intro",
            content: {
                html: "<p>Test content</p>",
            },
            images: [{ url: "/test.jpg" }],
        })),
    };
});

describe("portfolio_.$slug route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render Portfolio_Slug component", () => {
        const wrapper = createRouterWrapper({ route: "/portfolio/test-portfolio" });
        render(<Portfolio_Slug />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render portfolio title", () => {
        const wrapper = createRouterWrapper({ route: "/portfolio/test-portfolio" });
        render(<Portfolio_Slug />, { wrapper });

        expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({ data: { title: "Test Portfolio", intro: "Test intro" } } as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title === "Test Portfolio")).toBe(true);
    });

    test("meta function should handle missing data", () => {
        const result = meta({ data: undefined } as any);

        expect(result).toBeInstanceOf(Array);
    });
});
