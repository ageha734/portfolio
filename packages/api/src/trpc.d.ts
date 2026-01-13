export interface Context {
    db?: D1Database;
    user?: { id: string };
}

export declare const router: <TProcRouterRecord extends Record<string, unknown>>(
    procedures: TProcRouterRecord,
) => unknown;

export declare const publicProcedure: {
    query: <TInput, TOutput>(fn: (opts: { ctx: Context; input: TInput }) => Promise<TOutput> | TOutput) => unknown;
    mutation: <TInput, TOutput>(fn: (opts: { ctx: Context; input: TInput }) => Promise<TOutput> | TOutput) => unknown;
    input: <TInput>(schema: unknown) => {
        query: <TOutput>(fn: (opts: { ctx: Context; input: TInput }) => Promise<TOutput> | TOutput) => unknown;
        mutation: <TOutput>(fn: (opts: { ctx: Context; input: TInput }) => Promise<TOutput> | TOutput) => unknown;
    };
};
