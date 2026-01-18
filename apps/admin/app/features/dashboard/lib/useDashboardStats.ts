import { useEffect, useState } from "react";
import { api } from "~/shared/lib/api";
import type { DashboardStats } from "../model/types";

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats>({
        posts: 0,
        portfolios: 0,
        totalViews: 0,
        users: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const [postsResponse, portfoliosResponse] = await Promise.all([
                    api.posts.listPosts(),
                    api.portfolios.listPortfolios(),
                ]);

                const postsData = Array.isArray(postsResponse) ? postsResponse : postsResponse.data || [];
                const portfoliosData = Array.isArray(portfoliosResponse) ? portfoliosResponse : portfoliosResponse.data || [];

                setStats({
                    posts: Array.isArray(postsData) ? postsData.length : 0,
                    portfolios: Array.isArray(portfoliosData) ? portfoliosData.length : 0,
                    totalViews: 0,
                    users: 0,
                });
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Failed to fetch stats");
                setError(error);
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
