import { fetchFromGraphCMS } from "~/shared/api/graphcms";
import { getPortfolios } from "~/shared/api/queries/getPortfolios";
import type { LoaderFunction } from "@remix-run/cloudflare";

import type { Portfolio } from "~/entities/portfolio";

export type LoaderData = Portfolio[];

type GraphCMSResponse = {
    data: {
        portfolios: Portfolio[];
    };
};

export const loader: LoaderFunction = async (args) => {
    const data = await fetchFromGraphCMS(getPortfolios);
    const jsonData: unknown = await data.json();
    const res: GraphCMSResponse = jsonData as GraphCMSResponse;
    const items = res.data.portfolios ?? [];

    if (!items.length) {
        throw new Response("Portfolio items not found", { status: 404 });
    }

    return Response.json(items);
};
