import type { D1Database } from "@cloudflare/workers-types";
import { describe, expect, test } from "vitest";
import { createContext } from "./context";

describe("createContext", () => {
	test("should create context with D1Database", () => {
		const mockD1 = {} as D1Database;
		const env = { DB: mockD1 };

		const context = createContext(env);

		expect(context).toBeDefined();
		expect(context.db).toBe(mockD1);
	});

	test("should return context with correct structure", () => {
		const mockD1 = {} as D1Database;
		const env = { DB: mockD1 };

		const context = createContext(env);

		expect(context).toEqual({
			db: mockD1,
		});
	});
});
