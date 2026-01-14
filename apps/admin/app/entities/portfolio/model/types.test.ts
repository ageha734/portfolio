import { describe, expect, test } from "vitest";
import type { Portfolio, PortfolioFormData, PortfolioListItem } from "./types";

describe("Portfolio types", () => {
	describe("Portfolio", () => {
		test("should have required fields", () => {
			const portfolio: Portfolio = {
				id: "1",
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
			};

			expect(portfolio.title).toBe("Test Portfolio");
			expect(portfolio.slug).toBe("test-portfolio");
			expect(portfolio.company).toBe("Test Company");
			expect(portfolio.date).toBe("2024-01-01");
			expect(portfolio.current).toBe(false);
		});

		test("should allow optional fields", () => {
			const portfolio: Portfolio = {
				id: "1",
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
				overview: "Test overview",
				description: "Test description",
				content: { html: "<p>Test</p>" },
				thumbnailTemp: "/test.jpg",
				intro: "Test intro",
			};

			expect(portfolio.overview).toBe("Test overview");
			expect(portfolio.description).toBe("Test description");
			expect(portfolio.content?.html).toBe("<p>Test</p>");
			expect(portfolio.thumbnailTemp).toBe("/test.jpg");
			expect(portfolio.intro).toBe("Test intro");
		});

		test("should allow id to be undefined", () => {
			const portfolio: Portfolio = {
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
			};

			expect(portfolio.id).toBeUndefined();
		});
	});

	describe("PortfolioListItem", () => {
		test("should have required fields", () => {
			const item: PortfolioListItem = {
				id: "1",
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
			};

			expect(item.title).toBe("Test Portfolio");
			expect(item.slug).toBe("test-portfolio");
			expect(item.company).toBe("Test Company");
			expect(item.date).toBe("2024-01-01");
			expect(item.current).toBe(false);
		});

		test("should allow optional overview", () => {
			const item: PortfolioListItem = {
				id: "1",
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
				overview: "Test overview",
			};

			expect(item.overview).toBe("Test overview");
		});
	});

	describe("PortfolioFormData", () => {
		test("should have required fields", () => {
			const formData: PortfolioFormData = {
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
			};

			expect(formData.title).toBe("Test Portfolio");
			expect(formData.slug).toBe("test-portfolio");
			expect(formData.company).toBe("Test Company");
			expect(formData.date).toBe("2024-01-01");
			expect(formData.current).toBe(false);
		});

		test("should allow optional fields", () => {
			const formData: PortfolioFormData = {
				title: "Test Portfolio",
				slug: "test-portfolio",
				company: "Test Company",
				date: "2024-01-01",
				current: false,
				overview: "Test overview",
				description: "Test description",
				content: { html: "<p>Test</p>" },
				thumbnailTemp: "/test.jpg",
				intro: "Test intro",
			};

			expect(formData.overview).toBe("Test overview");
			expect(formData.description).toBe("Test description");
			expect(formData.content?.html).toBe("<p>Test</p>");
			expect(formData.thumbnailTemp).toBe("/test.jpg");
			expect(formData.intro).toBe("Test intro");
		});
	});
});
