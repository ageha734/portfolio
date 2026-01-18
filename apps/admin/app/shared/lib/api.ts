import { getPosts } from "@portfolio/api/generated/posts/posts";
import { getPortfolios } from "@portfolio/api/generated/portfolios/portfolios";

const postsClient = getPosts();
const portfoliosClient = getPortfolios();

export const api = {
    posts: {
        listPosts: (params?: { page?: number; perPage?: number; tag?: string }) => {
            return postsClient.postsListPosts(params);
        },
        getPostBySlug: (slug: string) => {
            return postsClient.postsGetPostBySlug(slug);
        },
    },
    portfolios: {
        listPortfolios: (params?: { page?: number; perPage?: number }) => {
            return portfoliosClient.portfoliosListPortfolios(params);
        },
        getPortfolioBySlug: (slug: string) => {
            return portfoliosClient.portfoliosGetPortfolioBySlug(slug);
        },
    },
};
