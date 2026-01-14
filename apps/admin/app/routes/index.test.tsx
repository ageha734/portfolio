import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

const router = createRouter({ routeTree });

describe("Index Route", () => {
    test("should render admin dashboard", () => {
        render(<RouterProvider router={router} />);
        router.navigate({ to: "/" });
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
});
