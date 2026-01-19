import * as Sentry from "@sentry/node";
import { AppError } from "../errors/app-error";
import { type ErrorCode } from "../errors/error-codes";

export class SentryClient {
    captureError(error: Error | AppError, context?: Record<string, unknown>): string | undefined {
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

    captureMessage(message: string, level: Sentry.SeverityLevel = "info", context?: Record<string, unknown>): string | undefined {
        return Sentry.captureMessage(message, {
            level,
            extra: context,
        }) ?? undefined;
    }

    setUser(user: { id?: string; email?: string; username?: string; [key: string]: unknown }): void {
        Sentry.setUser(user);
    }

    clearUser(): void {
        Sentry.setUser(null);
    }

    setContext(name: string, context: Record<string, unknown>): void {
        Sentry.setContext(name, context);
    }

    setTag(key: string, value: string): void {
        Sentry.setTag(key, value);
    }

    setTags(tags: Record<string, string>): void {
        Sentry.setTags(tags);
    }

    addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
        Sentry.addBreadcrumb(breadcrumb);
    }

    withScope(callback: (scope: Sentry.Scope) => void): void {
        Sentry.withScope(callback);
    }

    private getSeverityLevel(code: ErrorCode): Sentry.SeverityLevel {
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
