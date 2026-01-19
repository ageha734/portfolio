import * as Sentry from "@sentry/node";
export interface SentryConfig {
    dsn?: string;
    environment?: string;
    release?: string;
    tracesSampleRate?: number;
    profilesSampleRate?: number;
    tags?: Record<string, string>;
    beforeSend?: (event: Sentry.ErrorEvent, hint: Sentry.EventHint) => Sentry.ErrorEvent | PromiseLike<Sentry.ErrorEvent | null> | null;
}
export declare function initSentry(config?: SentryConfig): void;
export declare function closeSentry(): Promise<void>;
//# sourceMappingURL=config.d.ts.map