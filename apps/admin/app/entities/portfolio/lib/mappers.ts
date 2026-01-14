import type { Portfolio, PortfolioListItem } from "../model/types";

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
