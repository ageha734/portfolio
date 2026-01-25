import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

describe("Index Route", () => {
    test("should render admin dashboard", async () => {
        const router = createRouter({ routeTree });
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getAllByText("Dashboard").length).toBeGreaterThan(0);
        });
    });
});
