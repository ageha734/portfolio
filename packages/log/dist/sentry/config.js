import * as Sentry from "@sentry/node";
export function initSentry(config = {}) {
    const { dsn, environment = process.env.NODE_ENV || "development", release, tracesSampleRate = 1, profilesSampleRate = 1, tags = {}, beforeSend, } = config;
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
export async function closeSentry() {
    await Sentry.close();
}
