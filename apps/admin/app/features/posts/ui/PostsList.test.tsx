import "@testing-library/jest-dom/vitest";
import type { Post } from "@portfolio/api";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import * as usePostsModule from "../lib/usePosts";
import { PostsList } from "./PostsList";

vi.mock("../lib/usePosts");

const rootRoute = createRootRoute();
const postsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/posts",
    component: PostsList,
});

const routeTree = rootRoute.addChildren([postsRoute]);
const router = createRouter({ routeTree });

describe("PostsList", () => {
    test("should render posts list header", () => {
        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: [],
            loading: false,
            error: null,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("Posts")).toBeInTheDocument();
        expect(screen.getByText("Manage your blog posts")).toBeInTheDocument();
    });

    test("should render new post button", () => {
        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: [],
            loading: false,
            error: null,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("New Post")).toBeInTheDocument();
    });

    test("should display loading state", () => {
        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: [],
            loading: true,
            error: null,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("Loading posts...")).toBeInTheDocument();
    });

    test("should display error state", () => {
        const error = new Error("Failed to fetch");
        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: [],
            loading: false,
            error,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText(/Failed to load posts/)).toBeInTheDocument();
    });

    test("should display empty state when no posts", () => {
        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: [],
            loading: false,
            error: null,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("No posts found")).toBeInTheDocument();
        expect(screen.getByText("Get started by creating your first post")).toBeInTheDocument();
    });

    test("should display posts", () => {
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: { html: "<p>Test</p>" },
                imageTemp: "/test.jpg",
                tags: [],
                sticky: false,
            },
        ];

        vi.mocked(usePostsModule.usePosts).mockReturnValue({
            posts: mockPosts,
            loading: false,
            error: null,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("Test Post")).toBeInTheDocument();
    });
});
