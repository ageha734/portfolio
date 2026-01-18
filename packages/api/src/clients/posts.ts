import { getPosts } from "@generated/posts/posts";
import type { Post, PostsListPosts200, PostsListPostsParams } from "@generated/api.schemas";

const postsClient = getPosts();

/**
 * Get all posts with optional filtering and pagination
 */
export const listPosts = (params?: PostsListPostsParams): Promise<PostsListPosts200> => {
    return postsClient.postsListPosts(params);
};

/**
 * Get a single post by its slug
 */
export const getPostBySlug = (slug: string): Promise<Post> => {
    return postsClient.postsGetPostBySlug(slug);
};

export const posts = {
    list: listPosts,
    getBySlug: getPostBySlug,
} as const;
