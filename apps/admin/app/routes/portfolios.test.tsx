import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

const router = createRouter({ routeTree });

describe("Portfolios Route", () => {
    test("should render portfolios route", () => {
        render(<RouterProvider router={router} />);
        router.navigate({ to: "/portfolios" });
        expect(screen.getByText("Portfolios")).toBeInTheDocument();
    });
});
