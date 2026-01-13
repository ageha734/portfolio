import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

describe("Portfolios Route", () => {
    test("should render portfolios route", () => {
        render(<RouterProvider router={router} />);
        // Navigate to portfolios route
        router.navigate({ to: "/portfolios" });
        expect(screen.getByText("Portfolios")).toBeInTheDocument();
    });
});
