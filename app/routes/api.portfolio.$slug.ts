import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPortfolioBySlug } from "~/shared/api/queries/getPortfolio";

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

    const data = await fetchFromGraphCMS(getPortfolioBySlug, { slug: slug });
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;
    const portfolios = res.data.portfolios ?? [];

    if (portfolios.length !== 1) {
        throw new Response(`Portfolio "${slug}" not found`, { status: 404 });
    }

    return json(portfolios[0]);
};
