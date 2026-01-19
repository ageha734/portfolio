import { customInstance } from '.././mutator';
export const getPortfolios = () => {
    /**
     * @summary Get a portfolio by slug
     */
    const portfoliosGetPortfolioBySlug = (slug, options) => {
        return customInstance({ url: `/api/portfolio/${slug}`, method: 'GET'
        }, options);
    };
    /**
   * @summary Get all portfolios
   */
    const portfoliosListPortfolios = (params, options) => {
        return customInstance({ url: `/api/portfolios`, method: 'GET',
            params
        }, options);
    };
    return { portfoliosGetPortfolioBySlug, portfoliosListPortfolios };
};
