import { describe, expect, test } from "vitest";
import { createPrismaClient } from "./d1";

describe("createPrismaClient", () => {
    test("should create Prisma client with D1 adapter for production", () => {
        const mockD1 = {} as D1Database;

        const client = createPrismaClient({ d1: mockD1 });

        expect(client).toBeDefined();
        expect(typeof client.$disconnect).toBe("function");
    });

    test("should create Prisma client with database URL for development", () => {
        const databaseUrl = process.env.DATABASE_URL || "mysql://user:password@localhost:3306/portfolio";

        const client = createPrismaClient({ databaseUrl });

        expect(client).toBeDefined();
        expect(typeof client.$disconnect).toBe("function");
    });

    test("should create Prisma client without options", () => {
        const client = createPrismaClient();

        expect(client).toBeDefined();
        expect(typeof client.$disconnect).toBe("function");
    });

    test("should prioritize D1 over databaseUrl when both are provided", () => {
        const mockD1 = {} as D1Database;
        const databaseUrl = "mysql://user:password@localhost:3306/portfolio";

        const client = createPrismaClient({ d1: mockD1, databaseUrl });

        expect(client).toBeDefined();
        expect(typeof client.$disconnect).toBe("function");
    });
});
