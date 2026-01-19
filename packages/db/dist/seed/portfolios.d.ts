import type { PrismaClient } from "@prisma/client";
export declare function seedPortfolios(prisma: PrismaClient): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    company: string;
    date: Date;
    description: string | null;
    title: string;
    slug: string;
    content: string | null;
    intro: string | null;
    current: boolean;
    overview: string | null;
    thumbnailTemp: string | null;
}>;
//# sourceMappingURL=portfolios.d.ts.map