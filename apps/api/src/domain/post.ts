export interface Post {
    id: string;
    title: string;
    slug: string;
    date: Date;
    description?: string;
    content: string;
    contentRaw?: unknown;
    imageTemp: string;
    sticky: boolean;
    intro?: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface PostRepository {
    findAll(): Promise<Post[]>;
    findBySlug(slug: string): Promise<Post | null>;
    findById(id: string): Promise<Post | null>;
}
