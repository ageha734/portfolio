import type { Context } from "@portfolio/api";

export function createContext(env: { DB: D1Database }): Context {
    return {
        db: env.DB,
    };
}
