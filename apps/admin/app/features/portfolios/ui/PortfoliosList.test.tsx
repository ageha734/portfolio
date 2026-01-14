import "@testing-library/jest-dom/vitest";
import type { Portfolio } from "@portfolio/api";
import {
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import * as usePortfoliosModule from "../lib/usePortfolios";
import { PortfoliosList } from "./PortfoliosList";

vi.mock("../lib/usePortfolios");

const rootRoute = createRootRoute();
const portfoliosRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/portfolios",
	component: PortfoliosList,
});

const routeTree = rootRoute.addChildren([portfoliosRoute]);
const router = createRouter({ routeTree });

describe("PortfoliosList", () => {
	test("should render portfolios list header", () => {
		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: [],
			loading: false,
			error: null,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("Portfolios")).toBeInTheDocument();
		expect(screen.getByText("Manage your portfolio items")).toBeInTheDocument();
	});

	test("should render new portfolio button", () => {
		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: [],
			loading: false,
			error: null,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("New Portfolio")).toBeInTheDocument();
	});

	test("should display loading state", () => {
		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: [],
			loading: true,
			error: null,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("Loading portfolios...")).toBeInTheDocument();
	});

	test("should display error state", () => {
		const error = new Error("Failed to fetch");
		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: [],
			loading: false,
			error,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText(/Failed to load portfolios/)).toBeInTheDocument();
	});

	test("should display empty state when no portfolios", () => {
		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: [],
			loading: false,
			error: null,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("No portfolios found")).toBeInTheDocument();
		expect(
			screen.getByText("Get started by creating your first portfolio item"),
		).toBeInTheDocument();
	});

	test("should display portfolios", () => {
		const mockPortfolios: Portfolio[] = [
			{
				id: "1",
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
			},
		];

		vi.mocked(usePortfoliosModule.usePortfolios).mockReturnValue({
			portfolios: mockPortfolios,
			loading: false,
			error: null,
		});

		render(<RouterProvider router={router} />);

		expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
		expect(screen.getByText("Test Company")).toBeInTheDocument();
	});
});
