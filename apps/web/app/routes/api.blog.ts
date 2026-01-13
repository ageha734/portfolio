import type { LoaderFunction } from "@remix-run/cloudflare";
import { createTRPCClient } from "~/shared/lib/trpc";

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

export type LoaderData = {
    posts: Post[];
    tags: string[];
};

export const loader: LoaderFunction = async (args) => {
    const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })?.VITE_API_URL;
    const trpc = createTRPCClient(apiUrl);

    const posts = await trpc.posts.list.query();

    // タグを抽出してソート
    const tagSet = new Set<string>();
    posts.forEach((post) => {
        post.tags.forEach((tag) => tagSet.add(tag));
    });
    const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));

    if (!posts.length) {
        throw new Response("Blog posts not found", { status: 404 });
    }

    return Response.json({ posts, tags } as LoaderData);
};
