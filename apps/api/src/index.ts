import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { createContext } from "./interface/trpc/context";
import { appRouter } from "./interface/trpc/router";

// Export AppRouter type for use in clients
export type { AppRouter } from "./interface/trpc/router";

type Env = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.all("/trpc/*", async (c) => {
    const response = await fetchRequestHandler({
        endpoint: "/trpc",
        req: c.req.raw,
        router: appRouter,
        createContext: () => createContext({ DB: c.env.DB }),
    });

    return response;
});

export default app;
