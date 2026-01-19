import { describe, expect, it } from "vitest";
import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

describe("AppError", () => {
    describe("fromCode", () => {
        it("エラーコードからエラーを作成できる", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.code).toBe(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.category).toBe("AUTH");
            expect(error.httpStatus).toBe(401);
            expect(error.message).toBeTruthy();
        });

        it("デフォルトメッセージが設定される", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.message).toBe("無効なトークンです");
        });

        it("カスタムメッセージを設定できる", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "カスタムメッセージ");
            expect(error.message).toBe("カスタムメッセージ");
        });

        it("メタデータを設定できる", () => {
            const error = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD, "エラー", {
                metadata: { field: "username" },
            });
            expect(error.metadata).toEqual({ field: "username" });
        });

        it("メタデータなしでもエラーを作成できる", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー");
            expect(error.metadata).toBeUndefined();
        });

        it("元のエラーを保持できる", () => {
            const originalError = new Error("元のエラー");
            const error = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "エラー", {
                originalError,
            });
            expect(error.originalError).toBe(originalError);
        });

        it("元のエラーなしでもエラーを作成できる", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー");
            expect(error.originalError).toBeUndefined();
        });

        it("causeプロパティを設定できる", () => {
            const cause = new Error("原因エラー");
            const error = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR, "エラー", {
                cause,
            });
            expect(error.cause).toBe(cause);
        });

        it("すべてのエラーコードでデフォルトメッセージが設定される", () => {
            const error1 = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD);
            expect(error1.message).toBeTruthy();

            const error2 = AppError.fromCode(ErrorCodes.NOT_FOUND_RESOURCE);
            expect(error2.message).toBeTruthy();

            const error3 = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR);
            expect(error3.message).toBeTruthy();
        });
    });

    describe("constructor", () => {
        it("コンストラクタで直接エラーを作成できる", () => {
            const error = new AppError(ErrorCodes.AUTH_INVALID_TOKEN, "エラーメッセージ");
            expect(error.code).toBe(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.message).toBe("エラーメッセージ");
            expect(error.category).toBe("AUTH");
            expect(error.httpStatus).toBe(401);
        });

        it("コンストラクタでメタデータを設定できる", () => {
            const error = new AppError(ErrorCodes.VALIDATION_MISSING_FIELD, "エラー", {
                metadata: { field: "test" },
            });
            expect(error.metadata).toEqual({ field: "test" });
        });

        it("コンストラクタで元のエラーを設定できる", () => {
            const originalError = new Error("元のエラー");
            const error = new AppError(ErrorCodes.INTERNAL_SERVER_ERROR, "エラー", {
                originalError,
            });
            expect(error.originalError).toBe(originalError);
        });
    });

    describe("toJSON", () => {
        it("すべてのフィールドを含むJSONを生成する", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー", {
                metadata: { field: "test" },
            });
            const json = error.toJSON();
            expect(json.code).toBe(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(json.category).toBe("AUTH");
            expect(json.message).toBe("エラー");
            expect(json.httpStatus).toBe(401);
            expect(json.metadata).toEqual({ field: "test" });
        });

        it("メタデータなしの場合、metadataフィールドを含まない", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN, "エラー");
            const json = error.toJSON();
            expect(json.metadata).toBeUndefined();
        });

        it("すべてのエラーコードでJSONを生成できる", () => {
            const error1 = AppError.fromCode(ErrorCodes.VALIDATION_MISSING_FIELD);
            expect(error1.toJSON()).toBeDefined();

            const error2 = AppError.fromCode(ErrorCodes.NOT_FOUND_RESOURCE);
            expect(error2.toJSON()).toBeDefined();

            const error3 = AppError.fromCode(ErrorCodes.INTERNAL_SERVER_ERROR);
            expect(error3.toJSON()).toBeDefined();
        });
    });

    describe("スタックトレース", () => {
        it("スタックトレースが設定される", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.stack).toBeDefined();
            expect(error.stack).toContain("AppError");
        });
    });

    describe("エラープロパティ", () => {
        it("nameプロパティがAppErrorに設定される", () => {
            const error = AppError.fromCode(ErrorCodes.AUTH_INVALID_TOKEN);
            expect(error.name).toBe("AppError");
        });

        it("すべてのプロパティが正しく設定される", () => {
            const originalError = new Error("元のエラー");
            const error = new AppError(ErrorCodes.VALIDATION_MISSING_FIELD, "エラー", {
                metadata: { field: "test" },
                originalError,
            });

            expect(error.code).toBe(ErrorCodes.VALIDATION_MISSING_FIELD);
            expect(error.message).toBe("エラー");
            expect(error.category).toBe("VALIDATION");
            expect(error.httpStatus).toBe(400);
            expect(error.metadata).toEqual({ field: "test" });
            expect(error.originalError).toBe(originalError);
        });
    });
});
