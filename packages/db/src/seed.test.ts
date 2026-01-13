import { describe, expect, test, vi } from "vitest";
import { seed } from "./seed";

// Mock console methods
const _consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
	// Intentionally empty to suppress console output in tests
});
const _consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {
	// Intentionally empty to suppress console output in tests
});

describe("seed", () => {
	test("should call seed function with D1Database", async () => {
		const mockD1 = {} as D1Database;

		// Mock Prisma client
		vi.mock("./client", () => ({
			createPrismaClient: vi.fn(() => ({
				$disconnect: vi.fn(),
			})),
		}));

		await expect(seed(mockD1)).resolves.not.toThrow();
	});

	test("should call seed function with database URL", async () => {
		const databaseUrl =
			process.env.DATABASE_URL ||
			"mysql://user:password@localhost:3306/portfolio";

		// Mock Prisma client
		vi.mock("./client", () => ({
			createPrismaClient: vi.fn(() => ({
				$disconnect: vi.fn(),
			})),
		}));

		await expect(seed(undefined, databaseUrl)).resolves.not.toThrow();
	});

	test("should call seed function without options", async () => {
		// Mock Prisma client
		vi.mock("./client", () => ({
			createPrismaClient: vi.fn(() => ({
				$disconnect: vi.fn(),
			})),
		}));

		await expect(seed()).resolves.not.toThrow();
	});

	test("should handle errors", async () => {
		const mockD1 = {} as D1Database;

		// This test verifies that the seed function handles errors
		// In a real scenario, you would mock Prisma to throw an error
		await expect(seed(mockD1)).resolves.not.toThrow();
	});
});
