import type { PrismaClient } from "@prisma/client";
export declare function seedPortfolios(prisma: PrismaClient): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    title: string;
    date: Date;
    description: string | null;
    content: string | null;
    intro: string | null;
    company: string;
    current: boolean;
    overview: string | null;
    thumbnailTemp: string | null;
}>;
//# sourceMappingURL=portfolios.d.ts.map