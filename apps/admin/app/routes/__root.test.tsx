import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

describe("Root Route", () => {
    test("should render admin layout", async () => {
        const router = createRouter({ routeTree });
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getAllByText("CMS").length).toBeGreaterThan(0);
            expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
        });
    });
});
