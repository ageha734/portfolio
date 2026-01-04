import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Uses, { meta } from "./uses";

describe("uses route", () => {
    test("should render Uses component", () => {
        const wrapper = createRouterWrapper({ route: "/uses" });
        render(<Uses />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/uses" });
        render(<Uses />, { wrapper });

        expect(screen.getByText(/If you're curious/i)).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
