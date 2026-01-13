import type { Portfolio, PortfolioRepository } from "../domain/portfolio";
import { createPrismaClient } from "@portfolio/db";

export class D1PortfolioRepository implements PortfolioRepository {
    constructor(private readonly db: D1Database) {}

    async findAll(): Promise<Portfolio[]> {
        const prisma = createPrismaClient({ d1: this.db });
        const portfolios = await prisma.portfolio.findMany({
            orderBy: { date: "desc" },
            include: {
                images: true,
            },
        });

        return portfolios.map((portfolio) => ({
            id: portfolio.id,
            title: portfolio.title,
            slug: portfolio.slug,
            company: portfolio.company,
            date: portfolio.date,
            current: portfolio.current,
            overview: portfolio.overview ?? undefined,
            description: portfolio.description ?? undefined,
            content: portfolio.content ?? undefined,
            thumbnailTemp: portfolio.thumbnailTemp ?? undefined,
            intro: portfolio.intro ?? undefined,
            createdAt: portfolio.createdAt,
            updatedAt: portfolio.updatedAt,
        }));
    }

    async findBySlug(slug: string): Promise<Portfolio | null> {
        const prisma = createPrismaClient({ d1: this.db });
        const portfolio = await prisma.portfolio.findUnique({
            where: { slug },
            include: {
                images: true,
            },
        });

        if (!portfolio) return null;

        return {
            id: portfolio.id,
            title: portfolio.title,
            slug: portfolio.slug,
            company: portfolio.company,
            date: portfolio.date,
            current: portfolio.current,
            overview: portfolio.overview ?? undefined,
            description: portfolio.description ?? undefined,
            content: portfolio.content ?? undefined,
            thumbnailTemp: portfolio.thumbnailTemp ?? undefined,
            intro: portfolio.intro ?? undefined,
            createdAt: portfolio.createdAt,
            updatedAt: portfolio.updatedAt,
        };
    }

    async findById(id: string): Promise<Portfolio | null> {
        const prisma = createPrismaClient({ d1: this.db });
        const portfolio = await prisma.portfolio.findUnique({
            where: { id },
            include: {
                images: true,
            },
        });

        if (!portfolio) return null;

        return {
            id: portfolio.id,
            title: portfolio.title,
            slug: portfolio.slug,
            company: portfolio.company,
            date: portfolio.date,
            current: portfolio.current,
            overview: portfolio.overview ?? undefined,
            description: portfolio.description ?? undefined,
            content: portfolio.content ?? undefined,
            thumbnailTemp: portfolio.thumbnailTemp ?? undefined,
            intro: portfolio.intro ?? undefined,
            createdAt: portfolio.createdAt,
            updatedAt: portfolio.updatedAt,
        };
    }
}
