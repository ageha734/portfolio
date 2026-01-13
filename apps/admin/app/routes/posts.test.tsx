import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

describe("Posts Route", () => {
    test("should render posts route", () => {
        render(<RouterProvider router={router} />);
        // Navigate to posts route
        router.navigate({ to: "/posts" });
        expect(screen.getByText("Posts")).toBeInTheDocument();
    });
});
