import { createPrismaClient } from "@portfolio/db";
import type { Portfolio, PortfolioRepository } from "~/domain/portfolio";

export class PortfolioRepositoryImpl implements PortfolioRepository {
    constructor(private readonly databaseUrl?: string) {}

    async findAll(): Promise<Portfolio[]> {
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
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
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
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
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
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

    async addImage(portfolioId: string, imageUrl: string): Promise<void> {
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
        await prisma.portfolioImage.create({
            data: {
                portfolioId,
                url: imageUrl,
            },
        });
    }
}
