/// <reference types="vite/client" />
import type { AppRouter } from "@portfolio/api";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

const getBaseUrl = () => {
	if (globalThis.window !== undefined) {
		return globalThis.window.location.origin;
	}
	if (import.meta.env.VITE_API_URL) {
		return import.meta.env.VITE_API_URL;
	}
	return "http://localhost:8787";
};

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/trpc`,
		}),
	],
});
