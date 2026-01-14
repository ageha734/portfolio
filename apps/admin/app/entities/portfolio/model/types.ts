import type { Portfolio as ApiPortfolio } from "@portfolio/api";

export interface Portfolio extends ApiPortfolio {
	id?: string;
	title: string;
	slug: string;
	company: string;
	date: string;
	current: boolean;
	overview?: string;
	description?: string;
	content?: {
		html: string;
	};
	thumbnailTemp?: string;
	intro?: string;
}

export interface PortfolioListItem {
	id?: string;
	title: string;
	slug: string;
	company: string;
	date: string;
	current: boolean;
	overview?: string;
}

export interface PortfolioFormData {
	title: string;
	slug: string;
	company: string;
	date: string;
	current: boolean;
	overview?: string;
	description?: string;
	content?: {
		html: string;
	};
	thumbnailTemp?: string;
	intro?: string;
}
