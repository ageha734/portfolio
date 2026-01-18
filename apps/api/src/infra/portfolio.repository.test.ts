import { createPrismaClient } from "@portfolio/db";
import type { PrismaClient } from "@prisma/client";
import { describe, expect, test, vi } from "vitest";
import type { Portfolio } from "~/domain/portfolio";
import { D1PortfolioRepository } from "./portfolio.repository";

vi.mock("@portfolio/db", () => ({
    createPrismaClient: vi.fn(),
}));

describe("D1PortfolioRepository", () => {
    test("should create repository instance", () => {
        const mockD1 = {} as D1Database;
        const repository = new D1PortfolioRepository(mockD1);

        expect(repository).toBeDefined();
    });

    test("should implement findAll", async () => {
        const mockD1 = {} as D1Database;
        const mockPortfolios: Portfolio[] = [];

        vi.mocked(createPrismaClient).mockReturnValue({
            portfolio: {
                findMany: vi.fn().mockResolvedValue([]),
            },
        } as unknown as PrismaClient);

        const repository = new D1PortfolioRepository(mockD1);
        const result = await repository.findAll();

        expect(result).toEqual(mockPortfolios);
    });

    test("should implement findBySlug", async () => {
        const mockD1 = {} as D1Database;

        vi.mocked(createPrismaClient).mockReturnValue({
            portfolio: {
                findUnique: vi.fn().mockResolvedValue(null),
            },
        } as unknown as PrismaClient);

        const repository = new D1PortfolioRepository(mockD1);
        const result = await repository.findBySlug("test-slug");

        expect(result).toBeNull();
    });
});
