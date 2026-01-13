import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./api.blog";
import type { LoaderData } from "./api.blog";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

vi.mock("~/shared/api/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPosts", () => ({
    getPosts: "query { posts { id } }",
}));

describe("api.blog route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return posts and tags", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    posts: [
                        {
                            id: "1",
                            title: "Test Post",
                            slug: "test-post",
                            date: "2023-01-01",
                            content: { html: "<p>Test</p>" },
                            tags: ["Technical"],
                            sticky: false,
                            imageTemp: "",
                        },
                    ],
                    __type: {
                        enumValues: [{ name: "Technical" }, { name: "DIY" }],
                    },
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result).toBeDefined();
        const jsonResult = await (result as Response).json();
        expect((jsonResult as LoaderData).posts).toBeInstanceOf(Array);
        expect((jsonResult as LoaderData).tags).toBeInstanceOf(Array);
    });

    test("should throw 404 if no posts found", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    posts: [],
                    __type: {
                        enumValues: [],
                    },
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle null posts data", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    posts: null,
                    __type: {
                        enumValues: [],
                    },
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should sort tags alphabetically", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    posts: [
                        {
                            id: "1",
                            title: "Test Post",
                            slug: "test-post",
                            date: "2023-01-01",
                            content: { html: "<p>Test</p>" },
                            tags: ["Technical"],
                            sticky: false,
                            imageTemp: "",
                        },
                    ],
                    __type: {
                        enumValues: [{ name: "DIY" }, { name: "Technical" }, { name: "Blog" }],
                    },
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);
        const jsonResult = await (result as Response).json();

        expect((jsonResult as LoaderData).tags).toEqual(["Blog", "DIY", "Technical"]);
    });

    test("should handle fetchFromGraphCMS error", async () => {
        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockRejectedValue(new Error("Network error"));

        const args = {} as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });
});
