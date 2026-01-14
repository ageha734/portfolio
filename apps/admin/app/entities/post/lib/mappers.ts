import type { Post, PostListItem } from "../model/types";

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
