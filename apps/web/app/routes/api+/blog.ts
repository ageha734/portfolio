import type { LoaderFunction } from "@remix-run/cloudflare";
import { createTRPCApiClient } from "~/shared/lib/trpc";

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
	const apiUrl =
		args.context.cloudflare &&
		typeof args.context.cloudflare === "object" &&
		"env" in args.context.cloudflare
			? (args.context.cloudflare.env as { VITE_API_URL?: string })?.VITE_API_URL
			: undefined;
	const trpc = createTRPCApiClient(apiUrl);

	const posts = await trpc.posts.list.query();

	const tagSet = new Set<string>();
	posts.forEach((post: Post) => {
		post.tags.forEach((tag: string) => {
			tagSet.add(tag);
		});
	});
	const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));

	if (!posts.length) {
		throw new Response("Blog posts not found", { status: 404 });
	}

	return Response.json({ posts, tags } as LoaderData);
};
