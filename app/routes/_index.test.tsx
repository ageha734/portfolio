import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Index, { meta } from "./_index";

vi.mock("~/routes/api.qualities", () => ({
    getQuote: vi.fn((value?: string) => {
        const quotes = ["A problem solver 🧩", "A creative thinker 🤔", "A team player 🤝"];
        return quotes[0];
    }),
}));

describe("_index route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render Index component", () => {
        const wrapper = createRouterWrapper({ route: "/" });
        render(<Index />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/" });
        render(<Index />, { wrapper });

        expect(screen.getByText(/A Software Engineer/i)).toBeInTheDocument();
    });

    test("should render button", () => {
        const wrapper = createRouterWrapper({ route: "/" });
        render(<Index />, { wrapper });

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({ data: undefined } as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });

    test("meta function should handle canonical URL", () => {
        const result = meta({ data: { canonical: "https://example.com" } } as any);

        expect(result.some((item) => item.rel === "canonical")).toBe(true);
    });
});
