import type { PrismaClient, Portfolio } from "@prisma/client";

export declare function seedPortfolios(prisma: PrismaClient): Promise<Portfolio>;
