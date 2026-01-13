import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "~/widgets/admin-layout";

export const Route = createRootRoute({
    component: () => <AdminLayout />,
});
