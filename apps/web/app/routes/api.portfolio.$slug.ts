import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { createTRPCClient } from "~/shared/lib/trpc";
import { slugSchema } from "~/shared/validation";

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

export type LoaderData = Portfolio;

export const loader: LoaderFunction = async (args) => {
    const { slug } = args.params;

    const slugResult = slugSchema.safeParse(slug);
    if (!slugResult.success) {
        throw new Response("Invalid slug parameter", { status: 400 });
    }

    const validatedSlug = slugResult.data;
    const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })?.VITE_API_URL;
    const trpc = createTRPCClient(apiUrl);

    const portfolio = await trpc.portfolios.bySlug.query({ slug: validatedSlug });

    if (!portfolio) {
        throw new Response(`Portfolio "${validatedSlug}" not found`, { status: 404 });
    }

    return json(portfolio as LoaderData);
};
