import { describe, expect, test } from "vitest";
import type { PostFormData } from "../model/types";
import { validatePostFormData } from "./validators";

describe("validatePostFormData", () => {
	test("should validate valid form data with all required fields", () => {
		const validData: PostFormData = {
			title: "Test Post",
			slug: "test-post",
			date: "2024-01-01",
			content: {
				html: "<p>Test content</p>",
			},
			imageTemp: "/test.jpg",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(validData)).toBe(true);
	});

	test("should validate valid form data with optional fields", () => {
		const validData: PostFormData = {
			title: "Test Post",
			slug: "test-post",
			date: "2024-01-01",
			description: "Test description",
			content: {
				html: "<p>Test content</p>",
				raw: { type: "doc" },
			},
			imageTemp: "/test.jpg",
			tags: ["test", "example"],
			sticky: true,
			intro: "Test intro",
		};

		expect(validatePostFormData(validData)).toBe(true);
	});

	test("should reject form data with empty title", () => {
		const invalidData: PostFormData = {
			title: "",
			slug: "test-post",
			date: "2024-01-01",
			content: {
				html: "<p>Test content</p>",
			},
			imageTemp: "/test.jpg",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty slug", () => {
		const invalidData: PostFormData = {
			title: "Test Post",
			slug: "",
			date: "2024-01-01",
			content: {
				html: "<p>Test content</p>",
			},
			imageTemp: "/test.jpg",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty date", () => {
		const invalidData: PostFormData = {
			title: "Test Post",
			slug: "test-post",
			date: "",
			content: {
				html: "<p>Test content</p>",
			},
			imageTemp: "/test.jpg",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty content.html", () => {
		const invalidData: PostFormData = {
			title: "Test Post",
			slug: "test-post",
			date: "2024-01-01",
			content: {
				html: "",
			},
			imageTemp: "/test.jpg",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(invalidData)).toBe(false);
	});

	test("should reject form data with empty imageTemp", () => {
		const invalidData: PostFormData = {
			title: "Test Post",
			slug: "test-post",
			date: "2024-01-01",
			content: {
				html: "<p>Test content</p>",
			},
			imageTemp: "",
			tags: [],
			sticky: false,
		};

		expect(validatePostFormData(invalidData)).toBe(false);
	});
});
