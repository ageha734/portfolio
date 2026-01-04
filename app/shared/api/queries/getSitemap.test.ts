import { expect, test, describe } from "vitest";
import { getSitemap } from "./getSitemap";

describe("getSitemap query", () => {
    test("should export getSitemap query", () => {
        expect(getSitemap).toBeDefined();
        expect(typeof getSitemap).toBe("string");
    });

    test("should contain GraphQL query syntax", () => {
        expect(getSitemap).toContain("query");
    });

    test("should query __type for Tags enum", () => {
        expect(getSitemap).toContain("__type");
        expect(getSitemap).toContain("Tags");
        expect(getSitemap).toContain("enumValues");
    });

    test("should query portfolios", () => {
        expect(getSitemap).toContain("portfolios");
        expect(getSitemap).toContain("orderBy");
        expect(getSitemap).toContain("date_DESC");
    });

    test("should query posts", () => {
        expect(getSitemap).toContain("posts");
        expect(getSitemap).toContain("orderBy");
        expect(getSitemap).toContain("createdAt_ASC");
    });

    test("should query slug and title fields", () => {
        expect(getSitemap).toContain("slug");
        expect(getSitemap).toContain("title");
    });
});
