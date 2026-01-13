export interface Portfolio {
    id: string;
    title: string;
    slug: string;
    company: string;
    date: Date;
    current: boolean;
    overview?: string;
    description?: string;
    content?: string;
    thumbnailTemp?: string;
    intro?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PortfolioRepository {
    findAll(): Promise<Portfolio[]>;
    findBySlug(slug: string): Promise<Portfolio | null>;
    findById(id: string): Promise<Portfolio | null>;
}
