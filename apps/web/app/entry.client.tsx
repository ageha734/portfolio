import { RemixBrowser } from "@remix-run/react";
import { AppError, ErrorCodes } from "@portfolio/log";
import { getLogger, initLogger } from "~/lib/logger";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import {
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE,
    SENTRY_REPLAY_SAMPLE_RATE,
    SENTRY_TRACES_SAMPLE_RATE,
    XSTATE_INSPECTOR_ENABLED,
} from "~/shared/config/settings";

if (SENTRY_DSN !== "__undefined__") {
    initLogger({
        SENTRY_DSN,
        NODE_ENV: SENTRY_ENVIRONMENT,
    });
}

async function initXStateInspector() {
    if (XSTATE_INSPECTOR_ENABLED) {
        try {
            const module = await import("@xstate/inspect");
            module.inspect({
                iframe: false,
            });
        } catch (error) {
            const logger = getLogger();
            const appError = AppError.fromCode(ErrorCodes.EXTERNAL_API_ERROR, "Failed to load XState inspector", {
                originalError: error instanceof Error ? error : new Error(String(error)),
            });
            logger.warn(appError.message, { error: appError });
        }
    }
}

function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <RemixBrowser />
            </StrictMode>,
        );
    });
}

initXStateInspector();

if (globalThis.requestIdleCallback) {
    globalThis.requestIdleCallback(hydrate);
} else {
    globalThis.setTimeout(hydrate, 1);
}

if ("serviceWorker" in navigator) {
    globalThis.addEventListener("load", () => {
        navigator.serviceWorker.register("/worker.js");
    });
} else {
    const logger = getLogger();
    logger.warn("Service workers are not supported in this browser.");
}
