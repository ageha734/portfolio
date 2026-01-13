import { initAuth } from "@portfolio/auth";
import type { PagesFunction } from "@cloudflare/workers-types";

interface Env {
    DB: D1Database;
    BETTER_AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
}

// 認証が不要なパス
const PUBLIC_PATHS = ["/api/auth", "/_next", "/static", "/assets", "/favicon.ico", "/manifest.json", "/robots.txt"];

function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 公開パスの場合は認証チェックをスキップ
    if (isPublicPath(pathname)) {
        return next();
    }

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

    // セッションを確認
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        // 未認証の場合はログインページにリダイレクト
        const loginUrl = new URL("/api/auth/sign-in", url.origin);
        loginUrl.searchParams.set("redirect", pathname);
        return Response.redirect(loginUrl.toString(), 302);
    }

    // 認証済みの場合は次の処理へ
    return next();
};
