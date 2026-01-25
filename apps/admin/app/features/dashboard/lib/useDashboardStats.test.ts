import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { api } from "~/shared/lib/api";
import { useDashboardStats } from "./useDashboardStats";

vi.mock("~/shared/lib/api", () => ({
    api: {
        posts: {
            listPosts: vi.fn(),
        },
        portfolios: {
            listPortfolios: vi.fn(),
        },
    },
}));

describe("useDashboardStats", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should initialize with default stats", () => {
        vi.mocked(api.posts.listPosts).mockResolvedValue({ data: [] } as never);
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: [] } as never);

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
        vi.mocked(api.posts.listPosts).mockResolvedValue({
            data: [
                { id: "1", title: "Test Post" },
                { id: "2", title: "Test Post 2" },
            ],
        } as never);
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({
            data: [{ id: "1", title: "Test Portfolio" }],
        } as never);

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
        expect(api.posts.listPosts).toHaveBeenCalled();
        expect(api.portfolios.listPortfolios).toHaveBeenCalled();
    });

    test("should handle empty data", async () => {
        vi.mocked(api.posts.listPosts).mockResolvedValue({ data: null } as never);
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: null } as never);

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
        vi.mocked(api.posts.listPosts).mockRejectedValue(error);
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: [] } as never);

        const { result } = renderHook(() => useDashboardStats());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toContain("Failed to fetch");
    });
});
