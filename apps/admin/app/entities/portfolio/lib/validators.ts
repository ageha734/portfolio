import type { PortfolioFormData } from "../model/types";

export function validatePortfolioFormData(data: PortfolioFormData): boolean {
	return (
		data.title.length > 0 &&
		data.slug.length > 0 &&
		data.company.length > 0 &&
		data.date.length > 0
	);
}
