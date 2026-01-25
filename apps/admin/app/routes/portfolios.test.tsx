import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

describe("Portfolios Route", () => {
    test("should render portfolios route", async () => {
        const router = createRouter({ routeTree });
        render(<RouterProvider router={router} />);
        await router.navigate({ to: "/portfolios" });

        await waitFor(() => {
            expect(screen.getAllByText("Portfolios").length).toBeGreaterThan(0);
        });
    });
});
