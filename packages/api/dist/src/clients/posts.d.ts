import type { Post, PostsListPosts200, PostsListPostsParams } from "@generated/api.schemas";
/**
 * Get all posts with optional filtering and pagination
 */
export declare const listPosts: (params?: PostsListPostsParams) => Promise<PostsListPosts200>;
/**
 * Get a single post by its slug
 */
export declare const getPostBySlug: (slug: string) => Promise<Post>;
export declare const posts: {
    readonly list: (params?: PostsListPostsParams) => Promise<PostsListPosts200>;
    readonly getBySlug: (slug: string) => Promise<Post>;
};
//# sourceMappingURL=posts.d.ts.map