import type { Portfolio } from "@portfolio/api";

export interface PortfoliosListProps {
    portfolios?: Portfolio[];
    loading?: boolean;
    error?: Error | null;
}
