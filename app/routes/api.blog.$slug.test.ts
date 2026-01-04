import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader } from "./api.blog.$slug";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

vi.mock("~/shared/api/graphcms", () => ({
    fetchFromGraphCMS: vi.fn(),
}));

vi.mock("~/shared/api/queries/getPost", () => ({
    getPost: "query getPost($slug: String!) { post(where: { slug: $slug }) { id } }",
}));

describe("api.blog.$slug", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return post data for valid slug", async () => {
        const mockPost = {
            content: {
                raw: {},
                html: "<p>Test content</p>",
            },
            createdAt: "2023-01-01T00:00:00Z",
            date: "2023-01-01",
            images: [{ url: "https://example.com/image.jpg" }],
            imageTemp: "",
            intro: "Test intro",
            tags: ["Technical"],
            title: "Test Post",
            updatedAt: "2023-01-01T00:00:00Z",
        };

        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    post: mockPost,
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "test-post" },
        } as LoaderFunctionArgs;

        const result = await loader(args);
        const jsonResult = await (result as Response).json();

        expect(jsonResult).toEqual(mockPost);
    });

    test("should throw 400 for invalid slug", async () => {
        const args = {
            params: { slug: "invalid_slug" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should throw 404 when post is not found", async () => {
        const mockResponse = {
            json: vi.fn().mockResolvedValue({
                data: {
                    post: null,
                },
            }),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "non-existent-post" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should throw 400 when slug is missing", async () => {
        const args = {
            params: {},
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow();
    });

    test("should handle fetchFromGraphCMS error", async () => {
        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockRejectedValue(new Error("Network error"));

        const args = {
            params: { slug: "test-post" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Network error");
    });

    test("should handle json parsing error", async () => {
        const mockResponse = {
            json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
        };

        const { fetchFromGraphCMS } = await import("~/shared/api/graphcms");
        (fetchFromGraphCMS as any).mockResolvedValue(mockResponse);

        const args = {
            params: { slug: "test-post" },
        } as LoaderFunctionArgs;

        await expect(loader(args)).rejects.toThrow("Invalid JSON");
    });
});
