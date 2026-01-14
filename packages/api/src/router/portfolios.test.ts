import { describe, expect, test } from "vitest";
import { portfoliosRouter } from "./portfolios";

describe("portfoliosRouter", () => {
	test("should be defined", () => {
		expect(portfoliosRouter).toBeDefined();
	});

	test("should have list procedure", () => {
		expect(portfoliosRouter).toHaveProperty("list");
	});

	test("should have bySlug procedure", () => {
		expect(portfoliosRouter).toHaveProperty("bySlug");
	});
});
