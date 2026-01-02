import type { LoaderFunction } from "@remix-run/cloudflare";

import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPost } from "~/shared/api/queries/getPost";

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

    const data = await fetchFromGraphCMS(getPost, { slug });
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;

    if (!res.data.post) {
        throw new Response(`Post "${slug}" not found`, { status: 404 });
    }

    return Response.json(res.data.post as LoaderData);
};
