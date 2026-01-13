import type { AppRouter } from "@portfolio/api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    return "http://localhost:8787";
};

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
        }),
    ],
});
