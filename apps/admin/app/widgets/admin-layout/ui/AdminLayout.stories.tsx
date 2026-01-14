import type { Meta, StoryObj } from "@storybook/react";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { AdminLayout } from "./AdminLayout";

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <AdminLayout />
        </div>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div className="p-4">Dashboard Content</div>,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

const meta = {
    title: "Widgets/AdminLayout",
    component: AdminLayout,
    decorators: [
        () => (
            <div className="h-screen">
                <RouterProvider router={router} />
            </div>
        ),
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof AdminLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
