import type { Portfolio as ApiPortfolio } from "@portfolio/api";

/**
 * Portfolio entity type for admin application
 * Extends API Portfolio type with admin-specific properties
 */
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

/**
 * Portfolio list item (simplified version for list views)
 */
export interface PortfolioListItem {
    id?: string;
    title: string;
    slug: string;
    company: string;
    date: string;
    current: boolean;
    overview?: string;
}

/**
 * Portfolio form data (for create/edit forms)
 */
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
