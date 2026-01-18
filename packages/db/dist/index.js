import { createPrismaClient } from "./client/d1";
import { seedTags } from "./seed/tags";
import { seedUser } from "./seed/user";
import { seedPosts } from "./seed/posts";
import { seedPortfolios } from "./seed/portfolios";
export * from "@prisma/client";
export { createPrismaClient, } from "./client/d1";
export async function seed(d1, databaseUrl) {
    const prisma = createPrismaClient({ d1, databaseUrl });
    try {
        // タグの作成
        const tags = await seedTags(prisma);
        // ユーザーの作成
        await seedUser(prisma);
        // ブログ投稿の作成
        await seedPosts(prisma, tags);
        // ポートフォリオの作成
        await seedPortfolios(prisma);
        console.log("Seed completed successfully");
    }
    catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
if (import.meta.main) {
    console.log("Seed script - provide D1 database instance to run");
}
