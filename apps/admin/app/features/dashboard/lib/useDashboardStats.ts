import { useEffect, useState } from "react";
import { trpc } from "~/shared/lib/trpc";
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

				const [postsData, portfoliosData] = await Promise.all([
					trpc.posts.list.query(),
					trpc.portfolios.list.query(),
				]);

				setStats({
					posts: postsData?.length || 0,
					portfolios: portfoliosData?.length || 0,
					totalViews: 0,
					users: 0,
				});
			} catch (err) {
				const error =
					err instanceof Error ? err : new Error("Failed to fetch stats");
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
