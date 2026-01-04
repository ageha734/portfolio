import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import Sandbox, { meta } from "./sandbox";

describe("sandbox route", () => {
    test("should render Sandbox component", () => {
        const wrapper = createRouterWrapper({ route: "/sandbox" });
        render(<Sandbox />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/sandbox" });
        render(<Sandbox />, { wrapper });

        expect(screen.getByText(/Developer sandbox/i)).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
