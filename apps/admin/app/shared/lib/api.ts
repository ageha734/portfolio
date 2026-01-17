import { PostsApi, PortfoliosApi } from "@portfolio/api/generated/api";
import { customInstance } from "@portfolio/api/generated/mutator";

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    return "http://localhost:8787";
};

const baseURL = getBaseUrl();

export const api = {
    posts: new PostsApi(undefined, baseURL, customInstance as never),
    portfolios: new PortfoliosApi(undefined, baseURL, customInstance as never),
};
