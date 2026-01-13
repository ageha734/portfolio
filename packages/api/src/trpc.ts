import { initTRPC } from "@trpc/server";
import { z } from "zod";

export interface Context {
    db?: D1Database;
    user?: { id: string };
}

const t = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof z.ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const router = t.router;
export const publicProcedure = t.procedure;
