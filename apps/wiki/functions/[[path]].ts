// Cloudflare Pages Functions entry point for Docusaurus
export const onRequest: PagesFunction = async ({ request, next }) => {
    return next();
};
