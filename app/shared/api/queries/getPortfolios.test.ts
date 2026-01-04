import { expect, test, describe } from "vitest";
import { getPortfolios } from "./getPortfolios";

describe("getPortfolios query", () => {
    test("should export getPortfolios query", () => {
        expect(getPortfolios).toBeDefined();
        expect(typeof getPortfolios).toBe("string");
    });

    test("should contain GraphQL query syntax", () => {
        expect(getPortfolios).toContain("query");
    });

    test("should query portfolios", () => {
        expect(getPortfolios).toContain("portfolios");
    });

    test("should order by date descending", () => {
        expect(getPortfolios).toContain("orderBy");
        expect(getPortfolios).toContain("date_DESC");
    });

    test("should query portfolio fields", () => {
        expect(getPortfolios).toContain("title");
        expect(getPortfolios).toContain("slug");
        expect(getPortfolios).toContain("company");
        expect(getPortfolios).toContain("date");
    });
});
