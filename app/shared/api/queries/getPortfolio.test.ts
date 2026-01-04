import { expect, test, describe } from "vitest";
import { getPortfolioBySlug } from "./getPortfolio";

describe("getPortfolioBySlug query", () => {
    test("should export getPortfolioBySlug query", () => {
        expect(getPortfolioBySlug).toBeDefined();
        expect(typeof getPortfolioBySlug).toBe("string");
    });

    test("should contain GraphQL query syntax", () => {
        expect(getPortfolioBySlug).toContain("query");
    });

    test("should accept slug parameter", () => {
        expect(getPortfolioBySlug).toContain("$slug");
        expect(getPortfolioBySlug).toContain("String!");
    });

    test("should query portfolios by slug", () => {
        expect(getPortfolioBySlug).toContain("portfolios");
        expect(getPortfolioBySlug).toContain("where");
        expect(getPortfolioBySlug).toContain("slug");
    });

    test("should query portfolio fields", () => {
        expect(getPortfolioBySlug).toContain("title");
        expect(getPortfolioBySlug).toContain("slug");
        expect(getPortfolioBySlug).toContain("company");
        expect(getPortfolioBySlug).toContain("content");
    });
});
