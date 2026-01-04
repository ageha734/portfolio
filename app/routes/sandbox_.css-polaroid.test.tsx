import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import { describe, expect, test, vi } from "vitest";
import Sandbox_CSSPolaroid, { meta } from "./sandbox_.css-polaroid";

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
            <RouterLink to={to} {...props}>
                {children}
            </RouterLink>
        ),
    };
});

describe("sandbox_.css-polaroid route", () => {
    test("should render Sandbox_CSSPolaroid component", () => {
        const wrapper = createRouterWrapper({ route: "/sandbox/css-polaroid" });
        render(<Sandbox_CSSPolaroid />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/sandbox/css-polaroid" });
        render(<Sandbox_CSSPolaroid />, { wrapper });

        expect(screen.getByText(/CSS Polaroid Camera/i)).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
