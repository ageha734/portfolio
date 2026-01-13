import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import { PostsList } from "./posts-list";
import { trpc } from "~/shared/lib/trpc";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        posts: {
            list: {
                query: vi.fn().mockResolvedValue([
                    {
                        id: "1",
                        title: "Test Post",
                        slug: "test-post",
                        date: "2024-01-01",
                        description: "Test description",
                        content: { html: "<p>Test content</p>" },
                        imageTemp: "/test.jpg",
                        tags: ["test"],
                        sticky: false,
                    },
                ]),
            },
        },
    },
}));

const rootRoute = createRootRoute();
const postsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/posts",
    component: PostsList,
});

const routeTree = rootRoute.addChildren([postsRoute]);
const router = createRouter({ routeTree });

describe("PostsList", () => {
    test("should render posts list", () => {
        render(<RouterProvider router={router} />);
        expect(screen.getByText("Posts")).toBeInTheDocument();
        expect(screen.getByText("Manage your blog posts")).toBeInTheDocument();
    });

    test("should render new post button", () => {
        render(<RouterProvider router={router} />);
        expect(screen.getByText("New Post")).toBeInTheDocument();
    });

    test("should fetch and display posts", async () => {
        render(<RouterProvider router={router} />);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(trpc.posts.list.query).toHaveBeenCalled();
        expect(screen.getByText("Test Post")).toBeInTheDocument();
    });

    test("should display empty state when no posts", async () => {
        vi.mocked(trpc.posts.list.query).mockResolvedValueOnce([]);

        render(<RouterProvider router={router} />);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(screen.getByText("No posts found")).toBeInTheDocument();
    });
});
