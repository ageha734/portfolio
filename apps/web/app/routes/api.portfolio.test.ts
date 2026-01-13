import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./api.portfolio";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { Portfolio } from "./api.portfolio";

vi.mock("~/shared/api/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPortfolios", () => ({
    getPortfolios: "query { portfolios { id } }",
}));

describe("api.portfolio route", () => {
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
                            company: "Test Company",
                            current: false,
                            date: new Date("2023-01-01"),
                            images: [],
                            overview: "Test overview",
                            thumbnailTemp: "",
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

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle fetchFromGraphCMS error", async () => {
        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockRejectedValue(new Error("Network error"));

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });
});
