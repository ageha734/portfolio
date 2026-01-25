import "@testing-library/jest-dom/vitest";
import type { Post } from "@portfolio/api";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { LoaderData } from "./blog";
import { loader } from "./blog";

vi.mock("~/shared/lib/api", () => ({
    createApiClient: vi.fn(),
}));

describe("api+/blog route", () => {
    const mockApiClient = {
        posts: {
            listPosts: vi.fn(),
        },
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        const { createApiClient } = await import("~/shared/lib/api");
        vi.mocked(createApiClient).mockReturnValue(
            mockApiClient as unknown as ReturnType<typeof import("~/shared/lib/api").createApiClient>,
        );
    });

    test("should return posts and tags", async () => {
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post 1",
                slug: "test-post-1",
                date: "2024-01-01",
                content: "Test content",
                imageTemp: "https://example.com/image.jpg",
                sticky: false,
                tags: ["Technical", "React"],
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
            {
                id: "2",
                title: "Test Post 2",
                slug: "test-post-2",
                date: "2024-01-02",
                content: "Test content 2",
                imageTemp: "https://example.com/image2.jpg",
                sticky: true,
                tags: ["DIY", "Technical"],
                createdAt: "2024-01-02",
                updatedAt: "2024-01-02",
            },
        ];

        mockApiClient.posts.listPosts.mockResolvedValue({ data: mockPosts } as never);

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
        expect((jsonResult as LoaderData).posts).toBeInstanceOf(Array);
        expect((jsonResult as LoaderData).posts).toHaveLength(2);
        expect((jsonResult as LoaderData).tags).toBeInstanceOf(Array);
        expect((jsonResult as LoaderData).tags).toEqual(["DIY", "React", "Technical"]);
    });

    test("should throw 404 if no posts found", async () => {
        mockApiClient.posts.listPosts.mockResolvedValue({ data: [] } as never);

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

        await expect(loader(args)).rejects.toThrow("Blog posts not found");
    });

    test("should sort tags alphabetically", async () => {
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: "Test content",
                imageTemp: "https://example.com/image.jpg",
                sticky: false,
                tags: ["Technical", "DIY", "Blog"],
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
        ];

        mockApiClient.posts.listPosts.mockResolvedValue({ data: mockPosts } as never);

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
        const jsonResult = await (result as Response).json();

        expect((jsonResult as LoaderData).tags).toEqual(["Blog", "DIY", "Technical"]);
    });

    test("should handle duplicate tags", async () => {
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post 1",
                slug: "test-post-1",
                date: "2024-01-01",
                content: "Test content",
                imageTemp: "https://example.com/image.jpg",
                sticky: false,
                tags: ["Technical"],
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
            {
                id: "2",
                title: "Test Post 2",
                slug: "test-post-2",
                date: "2024-01-02",
                content: "Test content 2",
                imageTemp: "https://example.com/image2.jpg",
                sticky: false,
                tags: ["Technical"],
                createdAt: "2024-01-02",
                updatedAt: "2024-01-02",
            },
        ];

        mockApiClient.posts.listPosts.mockResolvedValue({ data: mockPosts } as never);

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
        const jsonResult = await (result as Response).json();

        expect((jsonResult as LoaderData).tags).toEqual(["Technical"]);
    });

    test("should handle API query error", async () => {
        mockApiClient.posts.listPosts.mockRejectedValue(new Error("Network error"));

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
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: "Test content",
                imageTemp: "https://example.com/image.jpg",
                sticky: false,
                tags: ["Technical"],
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
        ];

        mockApiClient.posts.listPosts.mockResolvedValue({ data: mockPosts } as never);

        const args = {
            request: new Request("https://example.com"),
            params: {},
            context: {},
        } as unknown as LoaderFunctionArgs;

        const result = await loader(args);

        expect(result).toBeDefined();
        const jsonResult = await (result as Response).json();
        expect((jsonResult as LoaderData).posts).toBeInstanceOf(Array);
    });
});
