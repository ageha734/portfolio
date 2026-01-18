import type { D1Database } from "@cloudflare/workers-types";
import type { BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
export interface InitAuthOptions<TExtraPlugins extends BetterAuthPlugin[] = []> {
    baseUrl: string;
    productionUrl: string;
    secret: string | undefined;
    googleClientId: string;
    googleClientSecret: string;
    d1?: D1Database;
    databaseUrl?: string;
    extraPlugins?: TExtraPlugins;
}
export declare function initAuth<TExtraPlugins extends BetterAuthPlugin[] = []>(options: InitAuthOptions<TExtraPlugins>): ReturnType<typeof betterAuth>;
export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
//# sourceMappingURL=index.d.ts.map