import { z } from "zod";
import { portfolioSchema } from "~/schema/zod/portfolio";
import { publicProcedure, router } from "~/trpc";

/**
 * Portfolios router
 *
 * @remarks
 * This is a placeholder implementation in the shared API package.
 * The actual implementation with database access is provided in apps/api.
 */
export const portfoliosRouter = router({
	/**
	 * Get all portfolios
	 *
	 * @returns Array of portfolios, ordered by date (descending)
	 */
	list: publicProcedure.output(z.array(portfolioSchema)).query(async () => {
		// Placeholder implementation
		// Actual implementation is in apps/api/src/interface/trpc/portfolios.ts
		return [];
	}),

	/**
	 * Get a portfolio by slug
	 *
	 * @param input - Object containing the portfolio slug
	 * @returns Portfolio if found, null otherwise
	 */
	bySlug: publicProcedure
		.input(
			z.object({
				slug: z.string().min(1, "Slug must be at least 1 character"),
			}),
		)
		.output(portfolioSchema.nullable())
		.query(async ({ input: _input }) => {
			// Placeholder implementation
			// Actual implementation is in apps/api/src/interface/trpc/portfolios.ts
			return null;
		}),
});
