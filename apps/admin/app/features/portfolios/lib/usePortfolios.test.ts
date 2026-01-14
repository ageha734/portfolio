import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { trpc } from "~/shared/lib/trpc";
import { usePortfolios } from "./usePortfolios";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        portfolios: {
            list: {
                query: vi.fn(),
            },
        },
    },
}));

describe("usePortfolios", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should initialize with empty portfolios and loading true", () => {
        vi.mocked(trpc.portfolios.list.query).mockResolvedValue([]);

        const { result } = renderHook(() => usePortfolios());

        expect(result.current.portfolios).toEqual([]);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    test("should fetch and update portfolios", async () => {
        const mockPortfolios = [
            {
                id: "1",
                title: "Test Portfolio",
                slug: "test-portfolio",
                company: "Test Company",
                date: "2024-01-01",
                current: false,
            },
        ];

        vi.mocked(trpc.portfolios.list.query).mockResolvedValue(mockPortfolios);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.portfolios).toEqual(mockPortfolios);
        expect(trpc.portfolios.list.query).toHaveBeenCalled();
    });

    test("should handle empty data", async () => {
        vi.mocked(trpc.portfolios.list.query).mockResolvedValue(null);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.portfolios).toEqual([]);
    });

    test("should handle errors", async () => {
        const error = new Error("Failed to fetch");
        vi.mocked(trpc.portfolios.list.query).mockRejectedValue(error);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe("Failed to fetch");
        expect(result.current.portfolios).toEqual([]);
    });
});
