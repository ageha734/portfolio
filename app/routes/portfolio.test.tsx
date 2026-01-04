import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Portfolio, { meta } from "./portfolio";

vi.mock("~/shared/api/portfolio", () => ({
    loader: vi.fn(),
}));

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useLoaderData: vi.fn(() => [
            {
                slug: "test-portfolio",
                title: "Test Portfolio",
                company: "Test Company",
                current: true,
                date: "2023-01-01",
                images: [],
                overview: "Test overview",
                thumbnailTemp: "",
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
