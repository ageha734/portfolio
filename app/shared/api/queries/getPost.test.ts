import { expect, test, describe } from "vitest";
import { getPost } from "./getPost";

describe("getPost query", () => {
    test("should export getPost query", () => {
        expect(getPost).toBeDefined();
        expect(typeof getPost).toBe("string");
    });

    test("should contain GraphQL query syntax", () => {
        expect(getPost).toContain("query");
    });

    test("should accept slug parameter", () => {
        expect(getPost).toContain("$slug");
        expect(getPost).toContain("String!");
    });

    test("should query post by slug", () => {
        expect(getPost).toContain("post");
        expect(getPost).toContain("where");
        expect(getPost).toContain("slug");
    });

    test("should query post fields", () => {
        expect(getPost).toContain("title");
        expect(getPost).toContain("content");
        expect(getPost).toContain("date");
        expect(getPost).toContain("tags");
    });
});
