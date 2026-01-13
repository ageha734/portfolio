import type { Post as ApiPost } from "@portfolio/api";

/**
 * Post entity type for admin application
 * Extends API Post type with admin-specific properties
 */
export interface Post extends ApiPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    description?: string;
    content: {
        html: string;
        raw?: unknown;
    };
    imageTemp: string;
    tags: string[];
    sticky: boolean;
    intro?: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Post list item (simplified version for list views)
 */
export interface PostListItem {
    id: string;
    title: string;
    slug: string;
    date: string;
    description?: string;
    tags: string[];
    sticky: boolean;
}

/**
 * Post form data (for create/edit forms)
 */
export interface PostFormData {
    title: string;
    slug: string;
    date: string;
    description?: string;
    content: {
        html: string;
        raw?: unknown;
    };
    imageTemp: string;
    tags: string[];
    sticky: boolean;
    intro?: string;
}
