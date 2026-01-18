import { getPortfolios } from "@generated/portfolios/portfolios";
const portfoliosClient = getPortfolios();
/**
 * Get all portfolios with optional pagination
 */
export const listPortfolios = (params) => {
    return portfoliosClient.portfoliosListPortfolios(params);
};
/**
 * Get a single portfolio by its slug
 */
export const getPortfolioBySlug = (slug) => {
    return portfoliosClient.portfoliosGetPortfolioBySlug(slug);
};
export const portfolios = {
    list: listPortfolios,
    getBySlug: getPortfolioBySlug,
};
