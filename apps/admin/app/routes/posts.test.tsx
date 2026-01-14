import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { routeTree } from "~/routeTree.gen";

const router = createRouter({ routeTree });

describe("Posts Route", () => {
    test("should render posts route", () => {
        render(<RouterProvider router={router} />);
        router.navigate({ to: "/posts" });
        expect(screen.getByText("Posts")).toBeInTheDocument();
    });
});
