import type { Meta, StoryObj } from "@storybook/react";
import { RouterProvider, createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import { PostsList } from "./posts-list";
import { trpc } from "~/shared/lib/trpc";
import { vi } from "vitest";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        posts: {
            list: {
                query: vi.fn().mockResolvedValue([
                    {
                        id: "1",
                        title: "Getting Started with React",
                        slug: "getting-started-with-react",
                        date: "2024-01-15",
                        description: "Learn the basics of React",
                        content: { html: "<p>Content here</p>" },
                        imageTemp: "/react.jpg",
                        tags: ["react", "tutorial"],
                        sticky: false,
                    },
                    {
                        id: "2",
                        title: "Advanced TypeScript Patterns",
                        slug: "advanced-typescript-patterns",
                        date: "2024-01-20",
                        description: "Explore advanced TypeScript features",
                        content: { html: "<p>Content here</p>" },
                        imageTemp: "/typescript.jpg",
                        tags: ["typescript", "advanced"],
                        sticky: true,
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

const meta = {
    title: "Features/PostsList",
    component: PostsList,
    decorators: [
        (Story) => (
            <div className="p-4">
                <RouterProvider router={router} />
            </div>
        ),
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof PostsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
    decorators: [
        (Story) => {
            vi.mocked(trpc.posts.list.query).mockResolvedValueOnce([]);
            return (
                <div className="p-4">
                    <RouterProvider router={router} />
                </div>
            );
        },
    ],
};
