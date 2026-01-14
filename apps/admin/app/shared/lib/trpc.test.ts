import { describe, expect, test } from "vitest";
import { trpc } from "./trpc";

describe("tRPC Client", () => {
	test("should create tRPC client", () => {
		expect(trpc).toBeDefined();
		expect(typeof trpc).toBe("object");
	});

	test("should have posts router", () => {
		expect(trpc.posts).toBeDefined();
	});

	test("should have portfolios router", () => {
		expect(trpc.portfolios).toBeDefined();
	});
});
