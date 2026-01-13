import { z } from "zod";
import { postSchema } from "~/schema/zod/post";
import { publicProcedure, router } from "~/trpc";

export const postsRouter = router({
    list: publicProcedure.query(async () => {
        // Placeholder implementation
        // This will be implemented in apps/api
        return [];
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(async ({ input }) => {
        // Placeholder implementation
        // This will be implemented in apps/api
        return null as z.infer<typeof postSchema> | null;
    }),
});
