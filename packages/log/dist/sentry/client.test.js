import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "../errors/app-error";
import { ErrorCodes } from "../errors/error-codes";
import { SentryClient, sentryClient } from "./client";
vi.mock("@sentry/node", () => ({
    captureException: vi.fn(() => "event-id"),
    captureMessage: vi.fn(() => "event-id"),
    setUser: vi.fn(),
    setContext: vi.fn(),
    setTag: vi.fn(),
    setTags: vi.fn(),
    addBreadcrumb: vi.fn(),
    withScope: vi.fn((callback) => {
        const mockScope = {
            setTag: vi.fn(),
            setTags: vi.fn(),
            setContext: vi.fn(),
            setUser: vi.fn(),
            addBreadcrumb: vi.fn(),
        };
        callback(mockScope);
    }),
}));
import * as Sentry from "@sentry/node";
describe("SentryClient", () => {
    let client;
    beforeEach(() => {
        vi.clearAllMocks();
        Sentry.captureException.mockReturnValue("event-id");
        Sentry.captureMessage.mockReturnValue("event-id");
        client = new SentryClient();
    });
    describe("captureError", () => {
        it("通常のErrorをSentryに送信できる", () => {
            const error = new Error("test error");
            const eventId = client.captureError(error);
            expect(Sentry.captureException).toHaveBeenCalledWith(error, expect.objectContaining({
                level: "error",
            }));
            expect(eventId).toBe("event-id");
        });
        it("AppErrorをSentryに送信できる", () => {
            const appError = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー", {
                metadata: { field: "test" },
            });
            const eventId = client.captureError(appError);
            expect(Sentry.captureException).toHaveBeenCalledWith(appError, expect.objectContaining({
                tags: { errorCode: ErrorCodes.AUTH_INVALID_TOKEN, category: "AUTH" },
                extra: { field: "test" },
                level: "warning",
            }));
            expect(eventId).toBe("event-id");
        });
        it("コンテキストを追加できる", () => {
            const error = new Error("test error");
            client.captureError(error, { userId: "123", action: "login" });
            expect(Sentry.captureException).toHaveBeenCalledWith(error, expect.objectContaining({
                extra: { userId: "123", action: "login" },
            }));
        });
        it("nullが返された場合、undefinedを返す", () => {
            Sentry.captureException.mockReturnValue(null);
            const error = new Error("test error");
            const eventId = client.captureError(error);
            expect(eventId).toBeUndefined();
        });
    });
    describe("captureMessage", () => {
        it("メッセージをSentryに送信できる", () => {
            const eventId = client.captureMessage("test message");
            expect(Sentry.captureMessage).toHaveBeenCalledWith("test message", {
                level: "info",
                extra: undefined,
            });
            expect(eventId).toBe("event-id");
        });
        it("すべてのログレベルでメッセージを送信できる", () => {
            const levels = ["debug", "info", "warning", "error"];
            for (const level of levels) {
                client.captureMessage("test message", level);
                expect(Sentry.captureMessage).toHaveBeenCalledWith("test message", {
                    level,
                    extra: undefined,
                });
            }
        });
        it("コンテキストを追加できる", () => {
            client.captureMessage("test message", "info", { userId: "123" });
            expect(Sentry.captureMessage).toHaveBeenCalledWith("test message", {
                level: "info",
                extra: { userId: "123" },
            });
        });
        it("nullが返された場合、undefinedを返す", () => {
            Sentry.captureMessage.mockReturnValue(null);
            const eventId = client.captureMessage("test message");
            expect(eventId).toBeUndefined();
        });
    });
    describe("setUser", () => {
        it("ユーザーコンテキストを設定できる", () => {
            client.setUser({ id: "123", email: "test@example.com" });
            expect(Sentry.setUser).toHaveBeenCalledWith({ id: "123", email: "test@example.com" });
        });
        it("ユーザーコンテキストをクリアできる", () => {
            client.clearUser();
            expect(Sentry.setUser).toHaveBeenCalledWith(null);
        });
    });
    describe("setContext", () => {
        it("コンテキストを設定できる", () => {
            client.setContext("request", { method: "GET", path: "/api/users" });
            expect(Sentry.setContext).toHaveBeenCalledWith("request", {
                method: "GET",
                path: "/api/users",
            });
        });
    });
    describe("setTag", () => {
        it("タグを設定できる", () => {
            client.setTag("service", "api");
            expect(Sentry.setTag).toHaveBeenCalledWith("service", "api");
        });
        it("タグを一括設定できる", () => {
            client.setTags({ service: "api", version: "1.0.0" });
            expect(Sentry.setTags).toHaveBeenCalledWith({ service: "api", version: "1.0.0" });
        });
    });
    describe("addBreadcrumb", () => {
        it("ブレッドクラムを追加できる", () => {
            const breadcrumb = {
                message: "User clicked button",
                category: "ui",
                level: "info",
            };
            client.addBreadcrumb(breadcrumb);
            expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(breadcrumb);
        });
    });
    describe("withScope", () => {
        it("スコープを設定してコールバックを実行できる", () => {
            const callback = vi.fn();
            client.withScope(callback);
            expect(Sentry.withScope).toHaveBeenCalledWith(callback);
        });
    });
    describe("getSeverityLevel", () => {
        it("認証エラーはwarningレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            client.captureError(appError);
            expect(Sentry.captureException).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "warning",
            }));
        });
        it("バリデーションエラーはwarningレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD);
            client.captureError(appError);
            expect(Sentry.captureException).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "warning",
            }));
        });
        it("NOT_FOUNDエラーはinfoレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.NOT_FOUND_RESOURCE);
            client.captureError(appError);
            expect(Sentry.captureException).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "info",
            }));
        });
        it("その他のエラーはerrorレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR);
            client.captureError(appError);
            expect(Sentry.captureException).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "error",
            }));
        });
    });
});
describe("sentryClient", () => {
    it("デフォルトのSentryClientインスタンスが作成される", () => {
        expect(sentryClient).toBeInstanceOf(SentryClient);
    });
});
