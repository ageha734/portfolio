import { z } from "zod";
import { postSchema } from "~/schema/zod/post";
import { publicProcedure, router } from "~/trpc";

/**
 * Posts router
 *
 * @remarks
 * This is a placeholder implementation in the shared API package.
 * The actual implementation with database access is provided in apps/api.
 */
export const postsRouter = router({
    /**
     * Get all posts
     *
     * @returns Array of posts, ordered by date (descending)
     */
    list: publicProcedure.output(z.array(postSchema)).query(async () => {
        // Placeholder implementation
        // Actual implementation is in apps/api/src/interface/trpc/posts.ts
        return [];
    }),

    /**
     * Get a post by slug
     *
     * @param input - Object containing the post slug
     * @returns Post if found, null otherwise
     */
    bySlug: publicProcedure
        .input(
            z.object({
                slug: z.string().min(1, "Slug must be at least 1 character"),
            }),
        )
        .output(postSchema.nullable())
        .query(async ({ input: _input }) => {
            // Placeholder implementation
            // Actual implementation is in apps/api/src/interface/trpc/posts.ts
            return null;
        }),
});
