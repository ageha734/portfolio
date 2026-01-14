// Cloudflare Pages Functions entry point for SPA routing
export const onRequest: PagesFunction = async ({ request, next }) => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	// If the request is for a static asset, serve it
	if (
		pathname.startsWith("/assets/") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
	) {
		return next();
	}

	// For all other routes, serve index.html (SPA routing)
	return next(new Request(new URL("/index.html", request.url), request));
};
