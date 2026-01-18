import type { D1Database } from "@cloudflare/workers-types";
export * from "@prisma/client";
export { type CreatePrismaClientOptions, createPrismaClient, type PrismaClientType, } from "./client/d1";
export declare function seed(d1?: D1Database, databaseUrl?: string): Promise<void>;
//# sourceMappingURL=index.d.ts.map