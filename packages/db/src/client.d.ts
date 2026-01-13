import type { PrismaClient } from "@prisma/client";

export interface CreatePrismaClientOptions {
    d1?: D1Database;
    databaseUrl?: string;
}

export declare function createPrismaClient(options?: CreatePrismaClientOptions): PrismaClient;

export type PrismaClientType = ReturnType<typeof createPrismaClient>;
