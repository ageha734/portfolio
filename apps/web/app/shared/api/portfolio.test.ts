import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Portfolio } from "~/entities/portfolio";
import * as graphcmsModule from "~/shared/api/graphcms";
import { loader } from "./portfolio";

vi.mock("~/shared/api/queries/getPortfolios", () => ({
    getPortfolios: "query { portfolios { id } }",
}));

describe("portfolio api", () => {
    const mockFetchFromGraphCMS = vi.spyOn(graphcmsModule, "fetchFromGraphCMS");

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

        mockFetchFromGraphCMS.mockResolvedValue(mockResponse as unknown as Response);

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

        mockFetchFromGraphCMS.mockResolvedValue(mockResponse as unknown as Response);

        const args = {} as LoaderFunctionArgs;

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

        mockFetchFromGraphCMS.mockResolvedValue(mockResponse as unknown as Response);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle fetchFromGraphCMS error", async () => {
        mockFetchFromGraphCMS.mockRejectedValue(new Error("Network error"));

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });

    test("should handle json parsing error", async () => {
        const mockResponse = {
            json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
        };

        mockFetchFromGraphCMS.mockResolvedValue(mockResponse as unknown as Response);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Invalid JSON");
    });

    test("should return empty array when portfolios is undefined", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    portfolios: undefined,
                },
            }),
        };

        mockFetchFromGraphCMS.mockResolvedValue(mockResponse as unknown as Response);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });
});
