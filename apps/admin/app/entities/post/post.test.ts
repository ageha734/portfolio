import { describe, expect, test } from "vitest";
import { mapApiPostToPost, postToListItem, validatePostFormData } from "./model";
import type { Post, PostFormData } from "./types";

describe("Post entity", () => {
    const mockPost: Post = {
        id: "1",
        title: "Test Post",
        slug: "test-post",
        date: "2024-01-01",
        description: "Test description",
        content: {
            html: "<p>Test content</p>",
        },
        imageTemp: "/test.jpg",
        tags: ["test"],
        sticky: false,
    };

    test("mapApiPostToPost should return Post entity", () => {
        const result = mapApiPostToPost(mockPost);
        expect(result).toEqual(mockPost);
    });

    test("postToListItem should return PostListItem", () => {
        const result = postToListItem(mockPost);
        expect(result).toEqual({
            id: "1",
            title: "Test Post",
            slug: "test-post",
            date: "2024-01-01",
            description: "Test description",
            tags: ["test"],
            sticky: false,
        });
    });

    test("validatePostFormData should validate valid form data", () => {
        const validData: PostFormData = {
            title: "Test Post",
            slug: "test-post",
            date: "2024-01-01",
            content: {
                html: "<p>Test</p>",
            },
            imageTemp: "/test.jpg",
            tags: [],
            sticky: false,
        };
        expect(validatePostFormData(validData)).toBe(true);
    });

    test("validatePostFormData should reject invalid form data", () => {
        const invalidData: PostFormData = {
            title: "",
            slug: "test-post",
            date: "2024-01-01",
            content: {
                html: "<p>Test</p>",
            },
            imageTemp: "/test.jpg",
            tags: [],
            sticky: false,
        };
        expect(validatePostFormData(invalidData)).toBe(false);
    });
});
