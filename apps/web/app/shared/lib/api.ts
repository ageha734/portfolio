import { PostsApi, PortfoliosApi } from "@portfolio/api/generated/api";
import { customInstance } from "@portfolio/api/generated/mutator";

const getBaseUrl = (apiUrl?: string) => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    return apiUrl ?? process.env.VITE_API_URL ?? "http://localhost:8787";
};

export const createApiClient = (apiUrl?: string) => {
    const baseURL = getBaseUrl(apiUrl);

    return {
        posts: new PostsApi(undefined, baseURL, customInstance as never),
        portfolios: new PortfoliosApi(undefined, baseURL, customInstance as never),
    };
};

export const api = createApiClient();
