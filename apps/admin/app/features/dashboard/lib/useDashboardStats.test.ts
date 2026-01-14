import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { trpc } from "~/shared/lib/trpc";
import { useDashboardStats } from "./useDashboardStats";

vi.mock("~/shared/lib/trpc", () => ({
	trpc: {
		posts: {
			list: {
				query: vi.fn(),
			},
		},
		portfolios: {
			list: {
				query: vi.fn(),
			},
		},
	},
}));

describe("useDashboardStats", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("should initialize with default stats", () => {
		vi.mocked(trpc.posts.list.query).mockResolvedValue([]);
		vi.mocked(trpc.portfolios.list.query).mockResolvedValue([]);

		const { result } = renderHook(() => useDashboardStats());

		expect(result.current.stats).toEqual({
			posts: 0,
			portfolios: 0,
			totalViews: 0,
			users: 0,
		});
		expect(result.current.loading).toBe(true);
	});

	test("should fetch and update stats", async () => {
		vi.mocked(trpc.posts.list.query).mockResolvedValue([
			{ id: "1", title: "Test Post" },
			{ id: "2", title: "Test Post 2" },
		]);
		vi.mocked(trpc.portfolios.list.query).mockResolvedValue([
			{ id: "1", title: "Test Portfolio" },
		]);

		const { result } = renderHook(() => useDashboardStats());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.stats).toEqual({
			posts: 2,
			portfolios: 1,
			totalViews: 0,
			users: 0,
		});
		expect(trpc.posts.list.query).toHaveBeenCalled();
		expect(trpc.portfolios.list.query).toHaveBeenCalled();
	});

	test("should handle empty data", async () => {
		vi.mocked(trpc.posts.list.query).mockResolvedValue(null);
		vi.mocked(trpc.portfolios.list.query).mockResolvedValue(null);

		const { result } = renderHook(() => useDashboardStats());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.stats).toEqual({
			posts: 0,
			portfolios: 0,
			totalViews: 0,
			users: 0,
		});
	});

	test("should handle errors", async () => {
		const error = new Error("Failed to fetch");
		vi.mocked(trpc.posts.list.query).mockRejectedValue(error);
		vi.mocked(trpc.portfolios.list.query).mockResolvedValue([]);

		const { result } = renderHook(() => useDashboardStats());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBeInstanceOf(Error);
		expect(result.current.error?.message).toBe("Failed to fetch");
	});
});
