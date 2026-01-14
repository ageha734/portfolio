import type { Post } from "@portfolio/api";
import { describe, expect, test } from "vitest";
import type { PostsListProps } from "./types";

describe("PostsListProps", () => {
    test("should have optional posts field", () => {
        const props: PostsListProps = {
            posts: [
                {
                    id: "1",
                    title: "Test Post",
                    slug: "test-post",
                    date: "2024-01-01",
                    content: { html: "<p>Test</p>" },
                    imageTemp: "/test.jpg",
                    tags: [],
                    sticky: false,
                },
            ],
        };

        expect(props.posts).toBeDefined();
        expect(props.posts?.length).toBe(1);
    });

    test("should allow posts to be undefined", () => {
        const props: PostsListProps = {};

        expect(props.posts).toBeUndefined();
    });

    test("should have optional loading field", () => {
        const props: PostsListProps = {
            loading: true,
        };

        expect(props.loading).toBe(true);
    });

    test("should allow loading to be undefined", () => {
        const props: PostsListProps = {};

        expect(props.loading).toBeUndefined();
    });

    test("should have optional error field", () => {
        const error = new Error("Test error");
        const props: PostsListProps = {
            error,
        };

        expect(props.error).toBe(error);
    });

    test("should allow error to be null", () => {
        const props: PostsListProps = {
            error: null,
        };

        expect(props.error).toBeNull();
    });

    test("should allow error to be undefined", () => {
        const props: PostsListProps = {};

        expect(props.error).toBeUndefined();
    });

    test("should allow all fields to be set together", () => {
        const posts: Post[] = [
            {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: "2024-01-01",
                content: { html: "<p>Test</p>" },
                imageTemp: "/test.jpg",
                tags: [],
                sticky: false,
            },
        ];
        const props: PostsListProps = {
            posts,
            loading: false,
            error: null,
        };

        expect(props.posts).toEqual(posts);
        expect(props.loading).toBe(false);
        expect(props.error).toBeNull();
    });
});
