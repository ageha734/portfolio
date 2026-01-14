import type { AppRouter } from "@portfolio/cms";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

const getBaseUrl = (apiUrl?: string) => {
    if (globalThis.window !== undefined) {
        return globalThis.window.location.origin;
    }
    return apiUrl ?? process.env.VITE_API_URL ?? "http://localhost:8787";
};

export const createTRPCApiClient = (apiUrl?: string) => {
    return createTRPCClient<AppRouter>({
        links: [
            httpBatchLink({
                url: `${getBaseUrl(apiUrl)}/trpc`,
            }),
        ],
    });
};

export const trpc = createTRPCApiClient();
