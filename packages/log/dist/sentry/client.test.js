import { describe, expect, it, vi, beforeEach } from "vitest";
import * as Sentry from "@sentry/node";
import { SentryClient, sentryClient } from "./client";
import { AppError } from "../errors/app-error";
import { ErrorCodes } from "../errors/error-codes";
describe("SentryClient", () => {
    let captureExceptionSpy;
    let captureMessageSpy;
    let setUserSpy;
    let setContextSpy;
    let setTagSpy;
    let setTagsSpy;
    let addBreadcrumbSpy;
    let withScopeSpy;
    let client;
    beforeEach(() => {
        captureExceptionSpy = vi.spyOn(Sentry, "captureException").mockReturnValue("event-id");
        captureMessageSpy = vi.spyOn(Sentry, "captureMessage").mockReturnValue("event-id");
        setUserSpy = vi.spyOn(Sentry, "setUser").mockImplementation(() => { });
        setContextSpy = vi.spyOn(Sentry, "setContext").mockImplementation(() => { });
        setTagSpy = vi.spyOn(Sentry, "setTag").mockImplementation(() => { });
        setTagsSpy = vi.spyOn(Sentry, "setTags").mockImplementation(() => { });
        addBreadcrumbSpy = vi.spyOn(Sentry, "addBreadcrumb").mockImplementation(() => { });
        withScopeSpy = vi.spyOn(Sentry, "withScope").mockImplementation(((callback) => {
            const mockScope = {
                setTag: vi.fn(),
                setTags: vi.fn(),
                setContext: vi.fn(),
                setUser: vi.fn(),
                addBreadcrumb: vi.fn(),
            };
            callback(mockScope);
        }));
        client = new SentryClient();
    });
    describe("captureError", () => {
        it("通常のErrorをSentryに送信できる", () => {
            const error = new Error("test error");
            const eventId = client.captureError(error);
            expect(captureExceptionSpy).toHaveBeenCalledWith(error, expect.objectContaining({
                level: "error",
            }));
            expect(eventId).toBe("event-id");
        });
        it("AppErrorをSentryに送信できる", () => {
            const appError = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー", {
                metadata: { field: "test" },
            });
            const eventId = client.captureError(appError);
            expect(captureExceptionSpy).toHaveBeenCalledWith(appError, expect.objectContaining({
                tags: { errorCode: ErrorCodes.AUTH_INVALID_TOKEN, category: "AUTH" },
                extra: { field: "test" },
                level: "warning",
            }));
            expect(eventId).toBe("event-id");
        });
        it("コンテキストを追加できる", () => {
            const error = new Error("test error");
            client.captureError(error, { userId: "123", action: "login" });
            expect(captureExceptionSpy).toHaveBeenCalledWith(error, expect.objectContaining({
                extra: { userId: "123", action: "login" },
            }));
        });
        it("nullが返された場合、undefinedを返す", () => {
            captureExceptionSpy.mockReturnValue(null);
            const error = new Error("test error");
            const eventId = client.captureError(error);
            expect(eventId).toBeUndefined();
        });
    });
    describe("captureMessage", () => {
        it("メッセージをSentryに送信できる", () => {
            const eventId = client.captureMessage("test message");
            expect(captureMessageSpy).toHaveBeenCalledWith("test message", {
                level: "info",
                extra: undefined,
            });
            expect(eventId).toBe("event-id");
        });
        it("すべてのログレベルでメッセージを送信できる", () => {
            const levels = ["debug", "info", "warning", "error"];
            for (const level of levels) {
                client.captureMessage("test message", level);
                expect(captureMessageSpy).toHaveBeenCalledWith("test message", {
                    level,
                    extra: undefined,
                });
            }
        });
        it("コンテキストを追加できる", () => {
            client.captureMessage("test message", "info", { userId: "123" });
            expect(captureMessageSpy).toHaveBeenCalledWith("test message", {
                level: "info",
                extra: { userId: "123" },
            });
        });
        it("nullが返された場合、undefinedを返す", () => {
            captureMessageSpy.mockReturnValue(null);
            const eventId = client.captureMessage("test message");
            expect(eventId).toBeUndefined();
        });
    });
    describe("setUser", () => {
        it("ユーザーコンテキストを設定できる", () => {
            client.setUser({ id: "123", email: "test@example.com" });
            expect(setUserSpy).toHaveBeenCalledWith({ id: "123", email: "test@example.com" });
        });
        it("ユーザーコンテキストをクリアできる", () => {
            client.clearUser();
            expect(setUserSpy).toHaveBeenCalledWith(null);
        });
    });
    describe("setContext", () => {
        it("コンテキストを設定できる", () => {
            client.setContext("request", { method: "GET", path: "/api/users" });
            expect(setContextSpy).toHaveBeenCalledWith("request", {
                method: "GET",
                path: "/api/users",
            });
        });
    });
    describe("setTag", () => {
        it("タグを設定できる", () => {
            client.setTag("service", "api");
            expect(setTagSpy).toHaveBeenCalledWith("service", "api");
        });
        it("タグを一括設定できる", () => {
            client.setTags({ service: "api", version: "1.0.0" });
            expect(setTagsSpy).toHaveBeenCalledWith({ service: "api", version: "1.0.0" });
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
            expect(addBreadcrumbSpy).toHaveBeenCalledWith(breadcrumb);
        });
    });
    describe("withScope", () => {
        it("スコープを設定してコールバックを実行できる", () => {
            const callback = vi.fn();
            client.withScope(callback);
            expect(withScopeSpy).toHaveBeenCalledWith(callback);
        });
    });
    describe("getSeverityLevel", () => {
        it("認証エラーはwarningレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            client.captureError(appError);
            expect(captureExceptionSpy).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "warning",
            }));
        });
        it("バリデーションエラーはwarningレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD);
            client.captureError(appError);
            expect(captureExceptionSpy).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "warning",
            }));
        });
        it("NOT_FOUNDエラーはinfoレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.NOT_FOUND_RESOURCE);
            client.captureError(appError);
            expect(captureExceptionSpy).toHaveBeenCalledWith(appError, expect.objectContaining({
                level: "info",
            }));
        });
        it("その他のエラーはerrorレベルになる", () => {
            const appError = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR);
            client.captureError(appError);
            expect(captureExceptionSpy).toHaveBeenCalledWith(appError, expect.objectContaining({
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
