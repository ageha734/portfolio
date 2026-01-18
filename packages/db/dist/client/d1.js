import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
export function createPrismaClient(options = {}) {
    const { d1, databaseUrl } = options;
    if (d1) {
        const adapter = new PrismaD1(d1);
        return new PrismaClient({ adapter });
    }
    return new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl || process.env.DATABASE_URL,
            },
        },
    });
}
