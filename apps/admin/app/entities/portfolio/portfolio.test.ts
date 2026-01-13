import { describe, expect, test } from "vitest";
import { mapApiPortfolioToPortfolio, portfolioToListItem, validatePortfolioFormData } from "./model";
import type { Portfolio, PortfolioFormData } from "./types";

describe("Portfolio entity", () => {
    const mockPortfolio: Portfolio = {
        id: "1",
        title: "Test Portfolio",
        slug: "test-portfolio",
        company: "Test Company",
        date: "2024-01-01",
        current: false,
        overview: "Test overview",
    };

    test("mapApiPortfolioToPortfolio should return Portfolio entity", () => {
        const result = mapApiPortfolioToPortfolio(mockPortfolio);
        expect(result).toEqual(mockPortfolio);
    });

    test("portfolioToListItem should return PortfolioListItem", () => {
        const result = portfolioToListItem(mockPortfolio);
        expect(result).toEqual({
            id: "1",
            title: "Test Portfolio",
            slug: "test-portfolio",
            company: "Test Company",
            date: "2024-01-01",
            current: false,
            overview: "Test overview",
        });
    });

    test("validatePortfolioFormData should validate valid form data", () => {
        const validData: PortfolioFormData = {
            title: "Test Portfolio",
            slug: "test-portfolio",
            company: "Test Company",
            date: "2024-01-01",
            current: false,
        };
        expect(validatePortfolioFormData(validData)).toBe(true);
    });

    test("validatePortfolioFormData should reject invalid form data", () => {
        const invalidData: PortfolioFormData = {
            title: "",
            slug: "test-portfolio",
            company: "Test Company",
            date: "2024-01-01",
            current: false,
        };
        expect(validatePortfolioFormData(invalidData)).toBe(false);
    });
});
