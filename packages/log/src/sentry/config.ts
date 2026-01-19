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

export function initSentry(config: SentryConfig = {}): void {
    const {
        dsn,
        environment = process.env.NODE_ENV || "development",
        release,
        tracesSampleRate = 1,
        profilesSampleRate = 1,
        tags = {},
        beforeSend,
    } = config;

    if (!dsn) {
        console.warn("[Sentry] DSNが設定されていません。Sentryは無効化されます。");
        return;
    }

    Sentry.init({
        dsn,
        environment,
        release,
        tracesSampleRate,
        profilesSampleRate,
        beforeSend,
        integrations: [
            Sentry.httpIntegration(),
            Sentry.consoleIntegration(),
            Sentry.onUncaughtExceptionIntegration({
                exitEvenIfOtherHandlersAreRegistered: false,
            }),
            Sentry.onUnhandledRejectionIntegration({
                mode: "warn",
            }),
        ],
    });

    if (Object.keys(tags).length > 0) {
        Sentry.setTags(tags);
    }
}

export async function closeSentry(): Promise<void> {
    await Sentry.close();
}
