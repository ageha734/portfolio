import { describe, expect, test } from "vitest";
import { createPrismaClient } from "./mysql";

describe("createPrismaClient", () => {
	test("should create Prisma client with database URL", () => {
		const databaseUrl =
			process.env.DATABASE_URL ||
			"mysql://user:password@localhost:3306/portfolio";

		const client = createPrismaClient({ databaseUrl });

		expect(client).toBeDefined();
		expect(typeof client.$disconnect).toBe("function");
	});

	test("should create Prisma client without options", () => {
		const client = createPrismaClient();

		expect(client).toBeDefined();
		expect(typeof client.$disconnect).toBe("function");
	});

	test("should return same instance on multiple calls (singleton)", () => {
		const client1 = createPrismaClient();
		const client2 = createPrismaClient();

		expect(client1).toBe(client2);
	});
});
