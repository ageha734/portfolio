import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./portfolio";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { Portfolio } from "~/entities/portfolio";

vi.mock("~/shared/lib/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPortfolios", () => ({
    getPortfolios: "query { portfolios { id } }",
}));

describe("portfolio api", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return portfolio items", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [
                        {
                            id: "1",
                            title: "Test Portfolio",
                            slug: "test-portfolio",
                            description: "Test Description",
                            image: "https://example.com/image.jpg",
                            url: "https://example.com",
                            tags: ["React", "TypeScript"],
                        },
                    ],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result).toBeDefined();
        const jsonResult = await (result as Response).json();
        expect(jsonResult).toBeInstanceOf(Array);
        expect((jsonResult as Portfolio[]).length).toBe(1);
    });

    test("should throw 404 if no portfolios found", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: [],
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });
});
