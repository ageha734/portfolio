import type {
	Response as CloudflareResponse,
	D1Database,
	PagesFunction,
} from "@cloudflare/workers-types";
import { initAuth } from "@portfolio/auth";

interface Env {
	DB: D1Database;
	BETTER_AUTH_SECRET?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
}

const PUBLIC_PATHS = [
	"/api/auth",
	"/_next",
	"/static",
	"/assets",
	"/favicon.ico",
	"/manifest.json",
	"/robots.txt",
];

function isPublicPath(pathname: string): boolean {
	return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (isPublicPath(pathname)) {
		return (await next()) as CloudflareResponse;
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

	const session = await auth.api.getSession({
		headers: request.headers as unknown as Headers,
	});

	if (!session) {
		const loginUrl = new URL("/api/auth/sign-in", url.origin);
		loginUrl.searchParams.set("redirect", pathname);
		return Response.redirect(
			loginUrl.toString(),
			302,
		) as unknown as CloudflareResponse;
	}

	return (await next()) as CloudflareResponse;
};
