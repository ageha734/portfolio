import { getPortfolios } from "@generated/portfolios/portfolios";
import type { Portfolio, PortfoliosListPortfolios200, PortfoliosListPortfoliosParams } from "@generated/api.schemas";

const portfoliosClient = getPortfolios();

/**
 * Get all portfolios with optional pagination
 */
export const listPortfolios = (params?: PortfoliosListPortfoliosParams): Promise<PortfoliosListPortfolios200> => {
    return portfoliosClient.portfoliosListPortfolios(params);
};

/**
 * Get a single portfolio by its slug
 */
export const getPortfolioBySlug = (slug: string): Promise<Portfolio> => {
    return portfoliosClient.portfoliosGetPortfolioBySlug(slug);
};

export const portfolios = {
    list: listPortfolios,
    getBySlug: getPortfolioBySlug,
} as const;
