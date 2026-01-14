import { router } from "@portfolio/api";
import { portfoliosRouter } from "./portfolios";
import { postsRouter } from "./posts";

export const appRouter = router({
    posts: postsRouter,
    portfolios: portfoliosRouter,
});

export type AppRouter = typeof appRouter;
