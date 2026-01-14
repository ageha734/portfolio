import { publicProcedure, router } from "@portfolio/api";
import { z } from "zod";
import { DIContainer } from "~/di/container";

export const postsRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.db) {
			throw new Error("Database not available");
		}
		const container = new DIContainer(ctx.db);
		const useCase = container.getGetPostsUseCase();
		return useCase.execute();
	}),
	bySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			if (!ctx.db) {
				throw new Error("Database not available");
			}
			const container = new DIContainer(ctx.db);
			const useCase = container.getGetPostBySlugUseCase();
			return useCase.execute(input.slug);
		}),
});
