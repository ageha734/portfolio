import type { Portfolio, PortfoliosListPortfolios200, PortfoliosListPortfoliosParams } from "@generated/api.schemas";
/**
 * Get all portfolios with optional pagination
 */
export declare const listPortfolios: (params?: PortfoliosListPortfoliosParams) => Promise<PortfoliosListPortfolios200>;
/**
 * Get a single portfolio by its slug
 */
export declare const getPortfolioBySlug: (slug: string) => Promise<Portfolio>;
export declare const portfolios: {
    readonly list: (params?: PortfoliosListPortfoliosParams) => Promise<PortfoliosListPortfolios200>;
    readonly getBySlug: (slug: string) => Promise<Portfolio>;
};
//# sourceMappingURL=portfolios.d.ts.map