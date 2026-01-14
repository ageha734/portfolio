import type { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = async ({ request, next }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (
        pathname.startsWith("/assets/") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
    ) {
        return next();
    }

    return next(new URL("/index.html", request.url).toString());
};
