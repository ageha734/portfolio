import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPortfolioBySlug } from "~/shared/api/queries/getPortfolio";
import { slugSchema } from "~/shared/validation";

export type LoaderData = {
    company: string;
    content: {
        html: string;
    };
    id: string;
    images: [
        {
            url: string;
        },
    ];
    intro: string;
    slug: string;
    title: string;
};

type GraphCMSResponse = {
    data: {
        portfolios: LoaderData[];
    };
};

export const loader: LoaderFunction = async (args) => {
    const { slug } = args.params;

    const slugResult = slugSchema.safeParse(slug);
    if (!slugResult.success) {
        throw new Response("Invalid slug parameter", { status: 400 });
    }

    const validatedSlug = slugResult.data;
    const data = await fetchFromGraphCMS(getPortfolioBySlug, { slug: validatedSlug });
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;
    const portfolios = res.data.portfolios ?? [];

    if (portfolios.length !== 1) {
        throw new Response(`Portfolio "${validatedSlug}" not found`, { status: 404 });
    }

    return json(portfolios[0]);
};
