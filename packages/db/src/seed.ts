import { createPrismaClient } from "./client";

// This is a placeholder seed script
// Replace with actual seed data as needed

export async function seed(d1?: D1Database, databaseUrl?: string) {
    const prisma = createPrismaClient({ d1, databaseUrl });

    try {
        // Add seed data here
        // Example:
        // await prisma.user.create({
        //     data: {
        //         name: "John Doe",
        //         email: "john@example.com",
        //     },
        // });

        console.log("Seed completed successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run seed if executed directly
if (import.meta.main) {
    // This would typically be called from a script that provides the D1 database
    // For now, this is a placeholder
    console.log("Seed script - provide D1 database instance to run");
}
