import "@testing-library/jest-dom/vitest";
import {
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
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
	component: () => <div>Dashboard Content</div>,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

describe("AdminLayout", () => {
	test("should render admin layout", () => {
		render(<RouterProvider router={router} />);
		expect(screen.getByText("CMS")).toBeInTheDocument();
		expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
	});

	test("should render navigation items", () => {
		render(<RouterProvider router={router} />);
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Posts")).toBeInTheDocument();
		expect(screen.getByText("Portfolios")).toBeInTheDocument();
	});

	test("should render mobile menu button", () => {
		render(<RouterProvider router={router} />);
		const menuButton = screen.getByRole("button", { name: /menu/i });
		expect(menuButton).toBeInTheDocument();
	});
});
