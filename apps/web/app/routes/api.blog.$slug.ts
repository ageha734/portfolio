import type { LoaderFunction } from "@remix-run/cloudflare";
import { createTRPCClient } from "~/shared/lib/trpc";
import { slugSchema } from "~/shared/validation";

export interface Post {
    id: string;
    title: string;
    slug: string;
    date: Date | string;
    description?: string;
    content: string;
    contentRaw?: unknown;
    imageTemp: string;
    sticky: boolean;
    intro?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export type LoaderData = Post;

export const loader: LoaderFunction = async (args) => {
    const { slug } = args.params;

    const slugResult = slugSchema.safeParse(slug);
    if (!slugResult.success) {
        throw new Response("Invalid slug parameter", { status: 400 });
    }

    const validatedSlug = slugResult.data;
    const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })?.VITE_API_URL;
    const trpc = createTRPCClient(apiUrl);

    const post = await trpc.posts.bySlug.query({ slug: validatedSlug });

    if (!post) {
        throw new Response(`Post "${validatedSlug}" not found`, { status: 404 });
    }

    return Response.json(post as LoaderData);
};
