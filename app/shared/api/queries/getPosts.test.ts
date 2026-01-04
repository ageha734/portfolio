import { expect, test, describe } from "vitest";
import { getPosts } from "./getPosts";

describe("getPosts query", () => {
    test("should export getPosts query", () => {
        expect(getPosts).toBeDefined();
        expect(typeof getPosts).toBe("string");
    });

    test("should contain GraphQL query syntax", () => {
        expect(getPosts).toContain("query");
    });

    test("should query posts", () => {
        expect(getPosts).toContain("posts");
    });

    test("should query __type for Tags enum", () => {
        expect(getPosts).toContain("__type");
        expect(getPosts).toContain("Tags");
        expect(getPosts).toContain("enumValues");
    });

    test("should query post fields", () => {
        expect(getPosts).toContain("id");
        expect(getPosts).toContain("title");
        expect(getPosts).toContain("slug");
        expect(getPosts).toContain("date");
        expect(getPosts).toContain("tags");
    });
});
