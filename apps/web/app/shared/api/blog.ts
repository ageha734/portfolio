import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Post } from "~/entities/blog";
import { createTRPCClient } from "~/shared/lib/trpc";

export type LoaderData = {
    posts: Post[];
    tags: string[];
};

export const loader: LoaderFunction = async (args) => {
    const apiUrl =
        args.context.cloudflare && typeof args.context.cloudflare === "object" && "env" in args.context.cloudflare
            ? (args.context.cloudflare.env as { VITE_API_URL?: string })?.VITE_API_URL
            : undefined;
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
