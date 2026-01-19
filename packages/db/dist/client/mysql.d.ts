import { PrismaClient } from "@prisma/client";
export interface CreatePrismaClientOptions {
    databaseUrl?: string;
}
export declare function createPrismaClient(options?: CreatePrismaClientOptions): PrismaClient;
export type PrismaClientType = ReturnType<typeof createPrismaClient>;
//# sourceMappingURL=mysql.d.ts.map