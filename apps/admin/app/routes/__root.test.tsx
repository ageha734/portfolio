import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

const router = createRouter({ routeTree });

describe("Root Route", () => {
    test("should render admin layout", () => {
        render(<RouterProvider router={router} />);
        expect(screen.getByText("CMS")).toBeInTheDocument();
        expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    });
});
