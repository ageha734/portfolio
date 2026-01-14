import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

export interface CreatePrismaClientOptions {
    d1?: D1Database;
    databaseUrl?: string;
}

export function createPrismaClient(options: CreatePrismaClientOptions = {}): PrismaClient {
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

export type PrismaClientType = ReturnType<typeof createPrismaClient>;
