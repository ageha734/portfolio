import * as Sentry from "@sentry/node";
import { AppError } from "../errors/app-error";
import {} from "../errors/error-codes";
export class SentryClient {
    captureError(error, context) {
        const eventId = Sentry.captureException(error, {
            tags: error instanceof AppError ? { errorCode: error.code, category: error.category } : {},
            extra: {
                ...(error instanceof AppError && error.metadata ? error.metadata : {}),
                ...context,
            },
            level: error instanceof AppError ? this.getSeverityLevel(error.code) : "error",
        });
        return eventId ?? undefined;
    }
    captureMessage(message, level = "info", context) {
        return Sentry.captureMessage(message, {
            level,
            extra: context,
        }) ?? undefined;
    }
    setUser(user) {
        Sentry.setUser(user);
    }
    clearUser() {
        Sentry.setUser(null);
    }
    setContext(name, context) {
        Sentry.setContext(name, context);
    }
    setTag(key, value) {
        Sentry.setTag(key, value);
    }
    setTags(tags) {
        Sentry.setTags(tags);
    }
    addBreadcrumb(breadcrumb) {
        Sentry.addBreadcrumb(breadcrumb);
    }
    withScope(callback) {
        Sentry.withScope(callback);
    }
    getSeverityLevel(code) {
        if (code.startsWith("AUTH_") || code.startsWith("VALIDATION_")) {
            return "warning";
        }
        if (code.startsWith("NOT_FOUND_")) {
            return "info";
        }
        return "error";
    }
}
export const sentryClient = new SentryClient();
