import type { Post, PostListItem, PostFormData } from "./types";

/**
 * Convert API Post to Post entity
 */
export function mapApiPostToPost(apiPost: Post): Post {
    return {
        ...apiPost,
        id: apiPost.id,
        title: apiPost.title,
        slug: apiPost.slug,
        date: apiPost.date,
        description: apiPost.description,
        content: apiPost.content,
        imageTemp: apiPost.imageTemp,
        tags: apiPost.tags,
        sticky: apiPost.sticky,
        intro: apiPost.intro,
        createdAt: apiPost.createdAt,
        updatedAt: apiPost.updatedAt,
    };
}

/**
 * Convert Post to PostListItem
 */
export function postToListItem(post: Post): PostListItem {
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.date,
        description: post.description,
        tags: post.tags,
        sticky: post.sticky,
    };
}

/**
 * Validate Post form data
 */
export function validatePostFormData(data: PostFormData): boolean {
    return (
        data.title.length > 0 &&
        data.slug.length > 0 &&
        data.date.length > 0 &&
        data.content.html.length > 0 &&
        data.imageTemp.length > 0
    );
}
