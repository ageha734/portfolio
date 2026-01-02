import type { LoaderFunction } from "@remix-run/cloudflare";

import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPosts } from "~/shared/api/queries/getPosts";

import type { Post, EnumValue } from "~/entities/blog";

type GraphCMSResponse = {
    data: {
        posts: Post[];
        __type: {
            enumValues: EnumValue[];
        };
    };
};

export type LoaderData = {
    posts: Post[];
    tags: string[];
};

export const loader: LoaderFunction = async () => {
    const data = await fetchFromGraphCMS(getPosts);
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;

    const posts = res.data.posts ?? [];
    const tagsData: EnumValue[] = res.data.__type.enumValues ?? [];
    const tags = tagsData.map((tag: EnumValue) => tag.name).sort((a, b) => a.localeCompare(b));

    if (!posts.length) {
        throw new Response(`Blog posts not found`, { status: 404 });
    }

    return Response.json({ posts, tags } as LoaderData);
};
