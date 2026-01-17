import "@testing-library/jest-dom/vitest";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { LoaderData, Portfolio } from "./portfolio";
import { loader } from "./portfolio";

vi.mock("~/shared/lib/api", () => ({
    createApiClient: vi.fn(),
}));

describe("api+/portfolio route", () => {
    const mockApiClient = {
        portfolios: {
            listPortfolios: vi.fn(),
        },
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        const { createApiClient } = await import("~/shared/lib/api");
        vi.mocked(createApiClient).mockReturnValue(
            mockApiClient as unknown as ReturnType<typeof import("~/shared/lib/api").createApiClient>,
        );
    });

    test("should return portfolio items", async () => {
        const mockPortfolios: Portfolio[] = [
            {
                id: "1",
                title: "Test Portfolio 1",
                slug: "test-portfolio-1",
                company: "Test Company",
                date: "2024-01-01",
                current: false,
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
            {
                id: "2",
                title: "Test Portfolio 2",
                slug: "test-portfolio-2",
                company: "Test Company 2",
                date: "2024-01-02",
                current: true,
                createdAt: "2024-01-02",
                updatedAt: "2024-01-02",
            },
        ];

        mockApiClient.portfolios.listPortfolios.mockResolvedValue({ data: mockPortfolios } as never);

        const args = {
            request: new Request("https://example.com"),
            params: {},
            context: {
                cloudflare: {
                    env: {
                        VITE_API_URL: "https://api.example.com",
                    },
                },
            },
        } as unknown as LoaderFunctionArgs;

        const result = await loader(args);

        expect(result).toBeDefined();
        const jsonResult = await (result as Response).json();
        expect(jsonResult).toBeInstanceOf(Array);
        expect((jsonResult as LoaderData).length).toBe(2);
        expect((jsonResult as LoaderData)[0]).toEqual(mockPortfolios[0]);
        expect((jsonResult as LoaderData)[1]).toEqual(mockPortfolios[1]);
    });

    test("should throw 404 if no portfolios found", async () => {
        mockApiClient.portfolios.listPortfolios.mockResolvedValue({ data: [] } as never);

        const args = {
            request: new Request("https://example.com"),
            params: {},
            context: {
                cloudflare: {
                    env: {
                        VITE_API_URL: "https://api.example.com",
                    },
                },
            },
        } as unknown as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Portfolio items not found");
    });

    test("should handle API query error", async () => {
        mockApiClient.portfolios.listPortfolios.mockRejectedValue(new Error("Network error"));

        const args = {
            request: new Request("https://example.com"),
            params: {},
            context: {
                cloudflare: {
                    env: {
                        VITE_API_URL: "https://api.example.com",
                    },
                },
            },
        } as unknown as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });

    test("should handle missing cloudflare context", async () => {
        const mockPortfolios: Portfolio[] = [
            {
                id: "1",
                title: "Test Portfolio",
                slug: "test-portfolio",
                company: "Test Company",
                date: "2024-01-01",
                current: false,
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
        ];

        mockApiClient.portfolios.listPortfolios.mockResolvedValue({ data: mockPortfolios } as never);

        const args = {
            request: new Request("https://example.com"),
            params: {},
            context: {},
        } as unknown as LoaderFunctionArgs;

        const result = await loader(args);

        expect(result).toBeDefined();
        const jsonResult = await (result as Response).json();
        expect(jsonResult).toBeInstanceOf(Array);
    });
});
