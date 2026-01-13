import type { Portfolio, PortfolioListItem, PortfolioFormData } from "./types";

/**
 * Convert API Portfolio to Portfolio entity
 */
export function mapApiPortfolioToPortfolio(apiPortfolio: Portfolio): Portfolio {
    return {
        ...apiPortfolio,
        id: apiPortfolio.id,
        title: apiPortfolio.title,
        slug: apiPortfolio.slug,
        company: apiPortfolio.company,
        date: apiPortfolio.date,
        current: apiPortfolio.current,
        overview: apiPortfolio.overview,
        description: apiPortfolio.description,
        content: apiPortfolio.content,
        thumbnailTemp: apiPortfolio.thumbnailTemp,
        intro: apiPortfolio.intro,
    };
}

/**
 * Convert Portfolio to PortfolioListItem
 */
export function portfolioToListItem(portfolio: Portfolio): PortfolioListItem {
    return {
        id: portfolio.id,
        title: portfolio.title,
        slug: portfolio.slug,
        company: portfolio.company,
        date: portfolio.date,
        current: portfolio.current,
        overview: portfolio.overview,
    };
}

/**
 * Validate Portfolio form data
 */
export function validatePortfolioFormData(data: PortfolioFormData): boolean {
    return data.title.length > 0 && data.slug.length > 0 && data.company.length > 0 && data.date.length > 0;
}
