import * as Sentry from "@sentry/node";
import { AppError } from "../errors/app-error";
export declare class SentryClient {
    captureError(error: Error | AppError, context?: Record<string, unknown>): string | undefined;
    captureMessage(message: string, level?: Sentry.SeverityLevel, context?: Record<string, unknown>): string | undefined;
    setUser(user: {
        id?: string;
        email?: string;
        username?: string;
        [key: string]: unknown;
    }): void;
    clearUser(): void;
    setContext(name: string, context: Record<string, unknown>): void;
    setTag(key: string, value: string): void;
    setTags(tags: Record<string, string>): void;
    addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void;
    withScope(callback: (scope: Sentry.Scope) => void): void;
    private getSeverityLevel;
}
export declare const sentryClient: SentryClient;
//# sourceMappingURL=client.d.ts.map