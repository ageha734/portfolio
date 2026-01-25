import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Portfolio } from "~/entities/portfolio";
import { createApiClient } from "~/shared/lib/api";

export type LoaderData = Portfolio[];

export const loader: LoaderFunction = async (args) => {
    const apiUrl =
        args.context.cloudflare && typeof args.context.cloudflare === "object" && "env" in args.context.cloudflare
            ? (args.context.cloudflare.env as { VITE_API_URL?: string })?.VITE_API_URL
            : undefined;
    const api = createApiClient(apiUrl);

    const response = await api.portfolios.listPortfolios();
    const portfolios = response.data as Portfolio[];

    if (!portfolios.length) {
        throw new Response("Portfolio items not found", { status: 404 });
    }

    return Response.json(portfolios as LoaderData);
};
