import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { SidebarContent } from "./SidebarContent";

const createStoryRouter = (pathname: string, onNavigate?: () => void) => {
    const rootRoute = createRootRoute({
        component: () => (
            <div className="w-64 bg-background p-4">
                <SidebarContent location={{ pathname }} onNavigate={onNavigate} />
            </div>
        ),
    });

    const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: () => <div />,
    });

    const postsRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/posts",
        component: () => <div />,
    });

    const portfoliosRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/portfolios",
        component: () => <div />,
    });

    const routeTree = rootRoute.addChildren([indexRoute, postsRoute, portfoliosRoute]);

    return createRouter({ routeTree });
};

const meta = {
    title: "Widgets/AdminLayout/SidebarContent",
    component: SidebarContent,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SidebarContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
    args: {
        location: { pathname: "/" },
        onNavigate: fn(),
    },
    render: (args) => {
        const router = createStoryRouter(args.location.pathname, args.onNavigate);
        return <RouterProvider router={router} />;
    },
};

export const Posts: Story = {
    args: {
        location: { pathname: "/posts" },
        onNavigate: fn(),
    },
    render: (args) => {
        const router = createStoryRouter(args.location.pathname, args.onNavigate);
        return <RouterProvider router={router} />;
    },
};

export const Portfolios: Story = {
    args: {
        location: { pathname: "/portfolios" },
        onNavigate: fn(),
    },
    render: (args) => {
        const router = createStoryRouter(args.location.pathname, args.onNavigate);
        return <RouterProvider router={router} />;
    },
};

export const WithoutNavigateCallback: Story = {
    args: {
        location: { pathname: "/" },
        onNavigate: undefined,
    },
    render: (args) => {
        const router = createStoryRouter(args.location.pathname, args.onNavigate);
        return <RouterProvider router={router} />;
    },
};
