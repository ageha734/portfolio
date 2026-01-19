import { createPrismaClient } from "./client/mysql";
import { seedTags } from "./seed/tags";
import { seedUser } from "./seed/user";
import { seedPosts } from "./seed/posts";
import { seedPortfolios } from "./seed/portfolios";
export * from "@prisma/client";
export { createPrismaClient, } from "./client/mysql";
export async function seed(databaseUrl) {
    const prisma = createPrismaClient({ databaseUrl });
    try {
        const tags = await seedTags(prisma);
        await seedUser(prisma);
        await seedPosts(prisma, tags);
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
    await seed();
}
