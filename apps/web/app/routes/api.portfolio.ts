import type { LoaderFunction } from "@remix-run/cloudflare";
import { createApiClient } from "~/shared/lib/api";

export interface Portfolio {
    id: string;
    title: string;
    slug: string;
    company: string;
    date: Date | string;
    current: boolean;
    overview?: string;
    description?: string;
    content?: string;
    thumbnailTemp?: string;
    intro?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export type LoaderData = Portfolio[];

export const loader: LoaderFunction = async (args) => {
    const apiUrl =
        args.context.cloudflare && typeof args.context.cloudflare === "object" && "env" in args.context.cloudflare
            ? (args.context.cloudflare.env as { VITE_API_URL?: string })?.VITE_API_URL
            : undefined;
    const api = createApiClient(apiUrl);

    const response = await api.portfolios.listPortfolios();
    const portfolios = Array.isArray(response.data) ? response.data : response.data.data;

    if (!portfolios.length) {
        throw new Response("Portfolio items not found", { status: 404 });
    }

    return Response.json(portfolios as LoaderData);
};
