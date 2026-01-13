import type { AppRouter } from "@portfolio/api-app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const getBaseUrl = (apiUrl?: string) => {
    if (globalThis.window !== undefined) {
        return globalThis.window.location.origin;
    }
    // Remixでは環境変数はloader/actionで取得する必要があるため、
    // サーバー側では引数で渡されたURLまたはデフォルトURLを使用
    return apiUrl ?? process.env.VITE_API_URL ?? "http://localhost:8787";
};

export const createTRPCClient = (apiUrl?: string) => {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: `${getBaseUrl(apiUrl)}/trpc`,
            }),
        ],
    });
};

export const trpc = createTRPCClient();
