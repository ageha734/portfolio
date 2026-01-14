import { describe, expect, test } from "vitest";
import type { Post, PostFormData, PostListItem } from "./types";

describe("Post types", () => {
    describe("Post", () => {
        test("should have required fields", () => {
            const post: Post = {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: {
                    html: "<p>Test content</p>",
                },
                imageTemp: "/test.jpg",
                tags: [],
                sticky: false,
            };

            expect(post.id).toBe("1");
            expect(post.title).toBe("Test Post");
            expect(post.slug).toBe("test-post");
            expect(post.date).toBe("2024-01-01");
            expect(post.content.html).toBe("<p>Test content</p>");
            expect(post.imageTemp).toBe("/test.jpg");
            expect(post.tags).toEqual([]);
            expect(post.sticky).toBe(false);
        });

        test("should allow optional fields", () => {
            const post: Post = {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                description: "Test description",
                content: {
                    html: "<p>Test content</p>",
                    raw: { type: "doc" },
                },
                imageTemp: "/test.jpg",
                tags: ["test", "example"],
                sticky: false,
                intro: "Test intro",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-02T00:00:00Z",
            };

            expect(post.description).toBe("Test description");
            expect(post.content.raw).toEqual({ type: "doc" });
            expect(post.tags).toEqual(["test", "example"]);
            expect(post.intro).toBe("Test intro");
            expect(post.createdAt).toBe("2024-01-01T00:00:00Z");
            expect(post.updatedAt).toBe("2024-01-02T00:00:00Z");
        });
    });

    describe("PostListItem", () => {
        test("should have required fields", () => {
            const item: PostListItem = {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                tags: [],
                sticky: false,
            };

            expect(item.id).toBe("1");
            expect(item.title).toBe("Test Post");
            expect(item.slug).toBe("test-post");
            expect(item.date).toBe("2024-01-01");
            expect(item.tags).toEqual([]);
            expect(item.sticky).toBe(false);
        });

        test("should allow optional description", () => {
            const item: PostListItem = {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                description: "Test description",
                tags: [],
                sticky: false,
            };

            expect(item.description).toBe("Test description");
        });
    });

    describe("PostFormData", () => {
        test("should have required fields", () => {
            const formData: PostFormData = {
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: {
                    html: "<p>Test content</p>",
                },
                imageTemp: "/test.jpg",
                tags: [],
                sticky: false,
            };

            expect(formData.title).toBe("Test Post");
            expect(formData.slug).toBe("test-post");
            expect(formData.date).toBe("2024-01-01");
            expect(formData.content.html).toBe("<p>Test content</p>");
            expect(formData.imageTemp).toBe("/test.jpg");
            expect(formData.tags).toEqual([]);
            expect(formData.sticky).toBe(false);
        });

        test("should allow optional fields", () => {
            const formData: PostFormData = {
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                description: "Test description",
                content: {
                    html: "<p>Test content</p>",
                    raw: { type: "doc" },
                },
                imageTemp: "/test.jpg",
                tags: ["test", "example"],
                sticky: false,
                intro: "Test intro",
            };

            expect(formData.description).toBe("Test description");
            expect(formData.content.raw).toEqual({ type: "doc" });
            expect(formData.tags).toEqual(["test", "example"]);
            expect(formData.intro).toBe("Test intro");
        });
    });
});
