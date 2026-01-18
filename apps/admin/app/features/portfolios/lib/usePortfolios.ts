import type { Portfolio } from "@portfolio/api";
import { useEffect, useState } from "react";
import { api } from "~/shared/lib/api";

export function usePortfolios() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.portfolios.listPortfolios();
                const data = Array.isArray(response) ? response : response.data || [];
                setPortfolios(data);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Failed to fetch portfolios");
                setError(error);
                console.error("Failed to fetch portfolios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    return { portfolios, loading, error };
}
