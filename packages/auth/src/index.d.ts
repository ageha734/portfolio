import type { D1Database } from "@cloudflare/workers-types";
import type { BetterAuthPlugin } from "better-auth";

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

export declare function initAuth<TExtraPlugins extends BetterAuthPlugin[] = []>(
    options: InitAuthOptions<TExtraPlugins>,
): {
    api: {
        getSession: (options?: {
            headers?: Headers | globalThis.Headers | Record<string, string> | unknown;
        }) => Promise<unknown>;
    };
    handler: (request: Request | globalThis.Request | unknown) => Promise<Response | globalThis.Response>;
    $Infer: {
        Session: unknown;
    };
};

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
