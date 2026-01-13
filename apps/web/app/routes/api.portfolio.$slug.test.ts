import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./api.portfolio.$slug";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

vi.mock("~/shared/api/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPortfolio", () => ({
    getPortfolioBySlug: "query portfolios($slug: String!) { portfolios(where: { slug: $slug }) { id } }",
}));

describe("api.portfolio.$slug", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return portfolio data for valid slug", async () => {
        const mockPortfolio = {
            company: "Test Company",
            content: {
                html: "<p>Test content</p>",
            },
            id: "1",
            images: [{ url: "https://example.com/image.jpg" }],
            intro: "Test intro",
            slug: "test-portfolio",
            title: "Test Portfolio",
        };

        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [mockPortfolio],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "test-portfolio" },
        } as LoaderFunctionArgs;

        const result = await loader(args);
        const jsonResult = await (result as Response).json();

        expect(jsonResult).toEqual(mockPortfolio);
    });

    test("should throw 400 for invalid slug", async () => {
        const args = {
            params: { slug: "invalid_slug" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should throw 404 when portfolio is not found", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "non-existent-portfolio" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should throw 404 when multiple portfolios found", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [
                        { id: "1", slug: "test", title: "Test 1" },
                        { id: "2", slug: "test", title: "Test 2" },
                    ],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "test" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should throw 400 when slug is missing", async () => {
        const args = {
            params: {},
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle null portfolios data", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: null,
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "test-portfolio" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle fetchFromGraphCMS error", async () => {
        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockRejectedValue(new Error("Network error"));

        const args = {
            params: { slug: "test-portfolio" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });
});
