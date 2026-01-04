import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { loader } from "./[sitemap.xml]";

vi.mock("~/shared/api/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getSitemap", () => ({
    getSitemap: "query { portfolios { slug } posts { slug } }",
}));

describe("[sitemap.xml] loader", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should generate sitemap.xml with routes", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [
                        {
                            slug: "test-portfolio",
                            date: "2023-01-01",
                            title: "Test Portfolio",
                        },
                    ],
                    posts: [
                        {
                            slug: "test-post",
                            date: "2023-01-01",
                            title: "Test Post",
                        },
                    ],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result).toBeInstanceOf(Response);
        const text = await result.text();
        expect(text).toContain("<urlset");
        expect(text).toContain("</urlset>");
        expect(text).toContain("/blog");
        expect(text).toContain("/portfolio");
    });

    test("should include portfolio URLs", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [
                        {
                            slug: "test-portfolio",
                            date: "2023-01-01",
                            title: "Test Portfolio",
                        },
                    ],
                    posts: [],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);
        const text = await result.text();

        expect(text).toContain("/portfolio/test-portfolio");
    });

    test("should include post URLs", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [],
                    posts: [
                        {
                            slug: "test-post",
                            date: "2023-01-01",
                            title: "Test Post",
                        },
                    ],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);
        const text = await result.text();

        expect(text).toContain("/blog/test-post");
    });

    test("should set correct Content-Type header", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [],
                    posts: [],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result.headers.get("Content-Type")).toBe("application/xml");
    });

    test("should handle empty portfolios and posts", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [],
                    posts: [],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);
        const text = await result.text();

        expect(text).toContain("<urlset");
        expect(text).toContain("</urlset>");
    });

    test("should handle fetchFromGraphCMS error", async () => {
        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockRejectedValue(new Error("Network error"));

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });
});
