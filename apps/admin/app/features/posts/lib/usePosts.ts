import type { Post } from "@portfolio/api";
import { useEffect, useState } from "react";
import { api } from "~/shared/lib/api";

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.posts.listPosts();
                const data = response.data as Post[];
                setPosts(data || []);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Failed to fetch posts");
                setError(error);
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
}
