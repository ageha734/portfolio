import { PrismaClient } from "@prisma/client";
let prismaInstance = null;
export function createPrismaClient(options = {}) {
    const { databaseUrl } = options;
    if (prismaInstance) {
        return prismaInstance;
    }
    prismaInstance = new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl || process.env.DATABASE_URL,
            },
        },
    });
    return prismaInstance;
}
