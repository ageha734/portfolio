import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

describe("Posts Route", () => {
    test("should render posts route", async () => {
        const router = createRouter({ routeTree });
        render(<RouterProvider router={router} />);
        await router.navigate({ to: "/posts" });

        await waitFor(() => {
            expect(screen.getAllByText("Posts").length).toBeGreaterThan(0);
        });
    });
});
