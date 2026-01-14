import type { Context } from "@portfolio/api";
import { describe, expect, test, vi } from "vitest";
import { authenticate } from "./auth";

vi.mock("@portfolio/auth", () => ({
	auth: {
		api: {
			getSession: vi.fn(),
		},
	},
}));

describe("authenticate", () => {
	test("should return null when no session is available", async () => {
		const mockContext: Context = {
			db: {} as D1Database,
		};

		const result = await authenticate(mockContext);

		expect(result).toBeNull();
	});

	test("should accept context with db", async () => {
		const mockContext: Context = {
			db: {} as D1Database,
		};

		const result = await authenticate(mockContext);

		expect(result).toBeNull();
	});

	test("should accept context with optional user", async () => {
		const mockContext: Context = {
			db: {} as D1Database,
			user: { id: "user-1" },
		};

		const result = await authenticate(mockContext);

		expect(result).toBeNull();
	});
});
