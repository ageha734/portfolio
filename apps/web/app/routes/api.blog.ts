import type { LoaderFunction } from "@remix-run/cloudflare";
import { createApiClient } from "~/shared/lib/api";

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
    tags: string[];
}

export type LoaderData = {
    posts: Post[];
    tags: string[];
};

export const loader: LoaderFunction = async (args) => {
    const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })?.VITE_API_URL;
    const api = createApiClient(apiUrl);

    const response = await api.posts.listPosts();
    const posts = response.data as Post[];

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
