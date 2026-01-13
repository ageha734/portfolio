import type { LoaderFunction } from "@remix-run/cloudflare";
import { createTRPCClient } from "~/shared/lib/trpc";

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
    const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })?.VITE_API_URL;
    const trpc = createTRPCClient(apiUrl);

    const portfolios = await trpc.portfolios.list.query();

    if (!portfolios.length) {
        throw new Response("Portfolio items not found", { status: 404 });
    }

    return Response.json(portfolios as LoaderData);
};
