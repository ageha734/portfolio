import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Resume, { meta } from "./resume";

describe("resume route", () => {
    test("should render Resume component", () => {
        const wrapper = createRouterWrapper({ route: "/resume" });
        render(<Resume />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render download button", () => {
        const wrapper = createRouterWrapper({ route: "/resume" });
        render(<Resume />, { wrapper });

        const link = screen.getByText(/Download Resume/i);
        expect(link).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
