import { getPosts } from "@generated/posts/posts";
const postsClient = getPosts();
/**
 * Get all posts with optional filtering and pagination
 */
export const listPosts = (params) => {
    return postsClient.postsListPosts(params);
};
/**
 * Get a single post by its slug
 */
export const getPostBySlug = (slug) => {
    return postsClient.postsGetPostBySlug(slug);
};
export const posts = {
    list: listPosts,
    getBySlug: getPostBySlug,
};
