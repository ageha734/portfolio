import { portfoliosRouter, postsRouter } from "./router";
import { router } from "./trpc";

export const appRouter = router({
    posts: postsRouter,
    portfolios: portfoliosRouter,
});

export type AppRouter = typeof appRouter;
