import type { Context } from "hono";
import { DIContainer } from "~/di/container";

export async function getPortfolios(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;

    try {
        const container = new DIContainer(databaseUrl);
        const useCase = container.getGetPortfoliosUseCase();
        const portfolios = await useCase.execute();

        if (!portfolios || portfolios.length === 0) {
            return c.json({ error: "Portfolios not found" }, 404);
        }

        return c.json(portfolios);
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        return c.json(
            {
                error: "Failed to fetch portfolios",
                details: error instanceof Error ? error.message : String(error),
            },
            500,
        );
    }
}

export async function getPortfolioBySlug(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const slug = c.req.param("slug");

    if (!slug) {
        return c.json({ error: "Invalid slug" }, 400);
    }

    try {
        const container = new DIContainer(databaseUrl);
        const useCase = container.getGetPortfolioBySlugUseCase();
        const portfolio = await useCase.execute(slug);

        if (!portfolio) {
            return c.json({ error: "Portfolio not found" }, 404);
        }

        return c.json(portfolio);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return c.json(
            {
                error: "Failed to fetch portfolio",
                details: error instanceof Error ? error.message : String(error),
            },
            500,
        );
    }
}
