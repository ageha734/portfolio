import type { Post } from "@portfolio/api";

export interface PostsListProps {
	posts?: Post[];
	loading?: boolean;
	error?: Error | null;
}
