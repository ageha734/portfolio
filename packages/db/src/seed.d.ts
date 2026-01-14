import type { D1Database } from "@cloudflare/workers-types";

export declare function seed(d1?: D1Database, databaseUrl?: string): Promise<void>;
