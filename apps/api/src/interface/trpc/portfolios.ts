import { publicProcedure, router } from "@portfolio/api";
import { z } from "zod";
import { DIContainer } from "../../di/container";

export const portfoliosRouter = router({
    list: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.db) {
            throw new Error("Database not available");
        }
        const container = new DIContainer(ctx.db);
        const useCase = container.getGetPortfoliosUseCase();
        return useCase.execute();
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
        if (!ctx.db) {
            throw new Error("Database not available");
        }
        const container = new DIContainer(ctx.db);
        const useCase = container.getGetPortfolioBySlugUseCase();
        return useCase.execute(input.slug);
    }),
});
