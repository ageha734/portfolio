import type { PrismaClient } from "@prisma/client";
import { describe, expect, test, vi } from "vitest";
import { seedPortfolios } from "./portfolios";

describe("seedPortfolios", () => {
    test("should create portfolio and portfolio images", async () => {
        const mockPrisma = {
            portfolio: {
                upsert: vi.fn().mockResolvedValue({
                    id: "portfolio-1",
                    slug: "example-project",
                    title: "Example Project",
                }),
            },
            portfolioImage: {
                upsert: vi.fn().mockResolvedValue({
                    id: "port-img-1",
                    portfolioId: "portfolio-1",
                    url: "https://via.placeholder.com/800x600",
                }),
            },
        } as unknown as PrismaClient;

        const result = await seedPortfolios(mockPrisma);

        expect(mockPrisma.portfolio.upsert).toHaveBeenCalledTimes(1);
        expect(mockPrisma.portfolioImage.upsert).toHaveBeenCalledTimes(1);
        expect(result).toBeDefined();
    });
});
