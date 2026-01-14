import { describe, expect, test } from "vitest";
import type { PortfolioFormData } from "../model/types";
import { validatePortfolioFormData } from "./validators";

describe("validatePortfolioFormData", () => {
	test("should validate valid form data with all required fields", () => {
		const validData: PortfolioFormData = {
			title: "Test Portfolio",
			slug: "test-portfolio",
			company: "Test Company",
			date: "2024-01-01",
			current: false,
		};

		expect(validatePortfolioFormData(validData)).toBe(true);
	});

	test("should validate valid form data with optional fields", () => {
		const validData: PortfolioFormData = {
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

		expect(validatePortfolioFormData(validData)).toBe(true);
	});

	test("should reject form data with empty title", () => {
		const invalidData: PortfolioFormData = {
			title: "",
			slug: "test-portfolio",
			company: "Test Company",
			date: "2024-01-01",
			current: false,
		};

		expect(validatePortfolioFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty slug", () => {
		const invalidData: PortfolioFormData = {
			title: "Test Portfolio",
			slug: "",
			company: "Test Company",
			date: "2024-01-01",
			current: false,
		};

		expect(validatePortfolioFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty company", () => {
		const invalidData: PortfolioFormData = {
			title: "Test Portfolio",
			slug: "test-portfolio",
			company: "",
			date: "2024-01-01",
			current: false,
		};

		expect(validatePortfolioFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty date", () => {
		const invalidData: PortfolioFormData = {
			title: "Test Portfolio",
			slug: "test-portfolio",
			company: "Test Company",
			date: "",
			current: false,
		};

		expect(validatePortfolioFormData(invalidData)).toBe(false);
	});
});
