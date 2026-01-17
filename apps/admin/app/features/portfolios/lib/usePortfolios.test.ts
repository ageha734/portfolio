import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { api } from "~/shared/lib/api";
import { usePortfolios } from "./usePortfolios";

vi.mock("~/shared/lib/api", () => ({
    api: {
        portfolios: {
            listPortfolios: vi.fn(),
        },
    },
}));

describe("usePortfolios", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should initialize with empty portfolios and loading true", () => {
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: [] } as never);

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

        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: mockPortfolios } as never);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.portfolios).toEqual(mockPortfolios);
        expect(api.portfolios.listPortfolios).toHaveBeenCalled();
    });

    test("should handle empty data", async () => {
        vi.mocked(api.portfolios.listPortfolios).mockResolvedValue({ data: null } as never);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.portfolios).toEqual([]);
    });

    test("should handle errors", async () => {
        const error = new Error("Failed to fetch");
        vi.mocked(api.portfolios.listPortfolios).mockRejectedValue(error);

        const { result } = renderHook(() => usePortfolios());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe("Failed to fetch");
        expect(result.current.portfolios).toEqual([]);
    });
});
