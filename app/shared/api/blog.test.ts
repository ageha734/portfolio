import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./blog";
import type { LoaderData } from "./blog";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

vi.mock("~/shared/lib/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPosts", () => ({
    getPosts: "query { posts { id } }",
}));

describe("blog api", () => {
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
});
