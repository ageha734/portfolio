import type { Post as ApiPost } from "@portfolio/api";

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

export interface PostListItem {
	id: string;
	title: string;
	slug: string;
	date: string;
	description?: string;
	tags: string[];
	sticky: boolean;
}

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
