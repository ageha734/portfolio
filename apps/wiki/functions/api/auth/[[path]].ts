import { initAuth } from "@portfolio/auth";
import type { PagesFunction } from "@cloudflare/workers-types";

interface Env {
    DB: D1Database;
    BETTER_AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const productionUrl = "https://wiki.ageha734.jp";

    const auth = initAuth({
        baseUrl,
        productionUrl,
        secret: env.BETTER_AUTH_SECRET,
        googleClientId: env.GOOGLE_CLIENT_ID ?? "",
        googleClientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
        d1: env.DB,
    });

    return auth.handler(request);
};
