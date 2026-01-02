import type { LoaderFunction } from "@remix-run/cloudflare";

import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPost } from "~/shared/api/queries/getPost";
import { slugSchema } from "~/shared/validation";

export interface Post {
    content: {
        raw: any;
        html: string;
    };
    createdAt: string;
    date: string;
    images: {
        url: string;
    };
    imageTemp: string;
    intro: string;
    tags: string[];
    title: string;
    updatedAt: string;
}

export type LoaderData = Post;

type GraphCMSResponse = {
    data: {
        post: Post | null;
    };
};

export const loader: LoaderFunction = async (args) => {
    const { slug } = args.params;

    const slugResult = slugSchema.safeParse(slug);
    if (!slugResult.success) {
        throw new Response("Invalid slug parameter", { status: 400 });
    }

    const validatedSlug = slugResult.data;
    const data = await fetchFromGraphCMS(getPost, { slug: validatedSlug });
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;

    if (!res.data.post) {
        throw new Response(`Post "${validatedSlug}" not found`, { status: 404 });
    }

    return Response.json(res.data.post as LoaderData);
};
