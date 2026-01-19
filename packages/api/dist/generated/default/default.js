import { customInstance } from ".././mutator";
export const getDefault = () => {
    /**
     * @summary Get a portfolio by slug
     */
    const portfoliosGetPortfolioBySlug = (slug, options) => {
        return customInstance({ url: `/api/portfolio/${slug}`, method: "GET" }, options);
    };
    /**
     * @summary Get all portfolios
     */
    const portfoliosListPortfolios = (params, options) => {
        return customInstance({ url: `/api/portfolios`, method: "GET", params }, options);
    };
    /**
     * @summary Get a post by slug
     */
    const postsGetPostBySlug = (slug, options) => {
        return customInstance({ url: `/api/post/${slug}`, method: "GET" }, options);
    };
    /**
     * @summary Get all posts
     */
    const postsListPosts = (params, options) => {
        return customInstance({ url: `/api/posts`, method: "GET", params }, options);
    };
    return {};
};
