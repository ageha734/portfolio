import { describe, expect, test } from "vitest";
import { postsRouter } from "./posts";

describe("postsRouter", () => {
    test("should be defined", () => {
        expect(postsRouter).toBeDefined();
    });

    test("should have list procedure", () => {
        expect(postsRouter).toHaveProperty("list");
    });

    test("should have bySlug procedure", () => {
        expect(postsRouter).toHaveProperty("bySlug");
    });
});
