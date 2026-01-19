import type { Context } from "hono";
import { AppError, ErrorCodes } from "@portfolio/log";
import { getLogger, getMetrics } from "~/lib/logger";
import { DIContainer } from "~/di/container";

export async function getPortfolios(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const redisUrl = c.env.REDIS_URL;
    const logger = getLogger();
    const metrics = getMetrics();
    const startTime = Date.now();

    try {
        const container = new DIContainer(databaseUrl, redisUrl);
        const useCase = container.getGetPortfoliosUseCase();
        const portfolios = await useCase.execute();

        const duration = (Date.now() - startTime) / 1000;
        metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios", status: "200" }, duration);
        metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios", status: "200" });

        if (!portfolios || portfolios.length === 0) {
            const notFoundError = AppError.fromCode(ErrorCodes.NOT_FOUND_PORTFOLIO, "Portfolios not found");
            metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios", status: "404" }, duration);
            metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios", status: "404" });
            metrics.httpRequestErrors.inc({ method: "GET", route: "/api/portfolios", status: "404" });
            return c.json(notFoundError.toJSON(), notFoundError.httpStatus);
        }

        return c.json(portfolios);
    } catch (error) {
        const duration = (Date.now() - startTime) / 1000;
        const appError = error instanceof AppError
            ? error
            : AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "Failed to fetch portfolios", {
                  metadata: { route: "/api/portfolios" },
                  originalError: error instanceof Error ? error : new Error(String(error)),
              });

        logger.logError(appError, { route: "/api/portfolios", method: "GET" });
        metrics.errorsTotal.inc({ category: appError.category, code: appError.code });
        metrics.errorsByCode.inc({ code: appError.code, category: appError.category });
        metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios", status: String(appError.httpStatus) }, duration);
        metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios", status: String(appError.httpStatus) });
        metrics.httpRequestErrors.inc({ method: "GET", route: "/api/portfolios", status: String(appError.httpStatus) });

        return c.json(appError.toJSON(), appError.httpStatus);
    }
}

export async function getPortfolioBySlug(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const redisUrl = c.env.REDIS_URL;
    const slug = c.req.param("slug");
    const logger = getLogger();
    const metrics = getMetrics();
    const startTime = Date.now();

    if (!slug) {
        const validationError = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD, "Invalid slug", {
            metadata: { field: "slug" },
        });
        metrics.httpRequestErrors.inc({ method: "GET", route: "/api/portfolios/:slug", status: "400" });
        return c.json(validationError.toJSON(), validationError.httpStatus);
    }

    try {
        const container = new DIContainer(databaseUrl, redisUrl);
        const useCase = container.getGetPortfolioBySlugUseCase();
        const portfolio = await useCase.execute(slug);

        const duration = (Date.now() - startTime) / 1000;
        metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios/:slug", status: "200" }, duration);
        metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios/:slug", status: "200" });

        if (!portfolio) {
            const notFoundError = AppError.fromCode(ErrorCodes.NOT_FOUND_PORTFOLIO, "Portfolio not found", {
                metadata: { slug },
            });
            metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios/:slug", status: "404" }, duration);
            metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios/:slug", status: "404" });
            metrics.httpRequestErrors.inc({ method: "GET", route: "/api/portfolios/:slug", status: "404" });
            return c.json(notFoundError.toJSON(), notFoundError.httpStatus);
        }

        return c.json(portfolio);
    } catch (error) {
        const duration = (Date.now() - startTime) / 1000;
        const appError = error instanceof AppError
            ? error
            : AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "Failed to fetch portfolio", {
                  metadata: { route: "/api/portfolios/:slug", slug },
                  originalError: error instanceof Error ? error : new Error(String(error)),
              });

        logger.logError(appError, { route: "/api/portfolios/:slug", method: "GET", slug });
        metrics.errorsTotal.inc({ category: appError.category, code: appError.code });
        metrics.errorsByCode.inc({ code: appError.code, category: appError.category });
        metrics.httpRequestDuration.observe({ method: "GET", route: "/api/portfolios/:slug", status: String(appError.httpStatus) }, duration);
        metrics.httpRequestTotal.inc({ method: "GET", route: "/api/portfolios/:slug", status: String(appError.httpStatus) });
        metrics.httpRequestErrors.inc({ method: "GET", route: "/api/portfolios/:slug", status: String(appError.httpStatus) });

        return c.json(appError.toJSON(), appError.httpStatus);
    }
}
