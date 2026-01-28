import {
  customInstance
} from "../mutator.js";

// generated/portfolios/portfolios.ts
var getPortfolios = () => {
  const portfoliosGetPortfolioBySlug = (slug, options) => {
    return customInstance({
      url: `/api/portfolio/${slug}`,
      method: "GET"
    }, options);
  };
  const portfoliosListPortfolios = (params, options) => {
    return customInstance({
      url: `/api/portfolios`,
      method: "GET",
      params
    }, options);
  };
  const portfoliosUploadPortfolioImage = (portfolioId, portfoliosUploadPortfolioImageBody, options) => {
    return customInstance({
      url: `/api/portfolios/${portfolioId}/images`,
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      data: portfoliosUploadPortfolioImageBody
    }, options);
  };
  return { portfoliosGetPortfolioBySlug, portfoliosListPortfolios, portfoliosUploadPortfolioImage };
};
export {
  getPortfolios
};

export { getPortfolios };
