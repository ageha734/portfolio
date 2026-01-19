import { customInstance } from ".././mutator";
export const getPosts = () => {
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
    return { postsGetPostBySlug, postsListPosts };
};
