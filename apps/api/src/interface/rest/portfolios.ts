import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type { R2Bucket } from "@cloudflare/workers-types";
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
            return c.json(notFoundError.toJSON(), notFoundError.httpStatus as StatusCode);
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

        return c.json(appError.toJSON(), appError.httpStatus as StatusCode);
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
        return c.json(validationError.toJSON(), validationError.httpStatus as StatusCode);
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
            return c.json(notFoundError.toJSON(), notFoundError.httpStatus as StatusCode);
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

        return c.json(appError.toJSON(), appError.httpStatus as StatusCode);
    }
}

export async function uploadPortfolioImage(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const redisUrl = c.env.REDIS_URL;
    const portfolioId = c.req.param("portfolioId");
    const r2Bucket = c.env.R2_BUCKET as R2Bucket | undefined;
    const r2PublicUrl = c.env.R2_PUBLIC_URL as string | undefined;
    const logger = getLogger();
    const metrics = getMetrics();
    const startTime = Date.now();

    if (!portfolioId) {
        const validationError = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD, "Portfolio ID is required", {
            metadata: { field: "portfolioId" },
        });
        metrics.httpRequestErrors.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: "400" });
        return c.json(validationError.toJSON(), validationError.httpStatus as StatusCode);
    }

    if (!r2Bucket || !r2PublicUrl) {
        const configError = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "R2 bucket not configured", {
            metadata: { route: "/api/portfolios/:portfolioId/images" },
        });
        metrics.httpRequestErrors.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: "500" });
        return c.json(configError.toJSON(), configError.httpStatus as StatusCode);
    }

    try {
        const formData = await c.req.formData();
        const imageFile = formData.get("image") as File | null;

        if (!imageFile) {
            const validationError = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD, "Image file is required", {
                metadata: { field: "image" },
            });
            metrics.httpRequestErrors.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: "400" });
            return c.json(validationError.toJSON(), validationError.httpStatus as StatusCode);
        }

        const container = new DIContainer(databaseUrl, redisUrl, r2Bucket, r2PublicUrl);
        const useCase = container.getUploadPortfolioImageUseCase();
        const result = await useCase.execute(portfolioId, imageFile);

        const duration = (Date.now() - startTime) / 1000;
        metrics.httpRequestDuration.observe({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: "200" }, duration);
        metrics.httpRequestTotal.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: "200" });

        return c.json(result);
    } catch (error) {
        const duration = (Date.now() - startTime) / 1000;
        const appError = error instanceof AppError
            ? error
            : AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "Failed to upload image", {
                  metadata: { route: "/api/portfolios/:portfolioId/images", portfolioId },
                  originalError: error instanceof Error ? error : new Error(String(error)),
              });

        logger.logError(appError, { route: "/api/portfolios/:portfolioId/images", method: "POST", portfolioId });
        metrics.errorsTotal.inc({ category: appError.category, code: appError.code });
        metrics.errorsByCode.inc({ code: appError.code, category: appError.category });
        metrics.httpRequestDuration.observe({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: String(appError.httpStatus) }, duration);
        metrics.httpRequestTotal.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: String(appError.httpStatus) });
        metrics.httpRequestErrors.inc({ method: "POST", route: "/api/portfolios/:portfolioId/images", status: String(appError.httpStatus) });

        return c.json(appError.toJSON(), appError.httpStatus as StatusCode);
    }
}
