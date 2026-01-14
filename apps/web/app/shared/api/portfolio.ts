import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Portfolio } from "~/entities/portfolio";
import { createTRPCApiClient } from "~/shared/lib/trpc";

export type LoaderData = Portfolio[];

export const loader: LoaderFunction = async (args) => {
	const apiUrl = (args.context.cloudflare?.env as { VITE_API_URL?: string })
		?.VITE_API_URL;
	const trpc = createTRPCApiClient(apiUrl);

	const portfolios = await trpc.portfolios.list.query();

	if (!portfolios.length) {
		throw new Response("Portfolio items not found", { status: 404 });
	}

	return Response.json(portfolios as LoaderData);
};
