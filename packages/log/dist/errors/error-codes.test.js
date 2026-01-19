import { describe, expect, it } from "vitest";
import { ErrorCategory, ErrorCodes, getErrorCategory, getHttpStatusFromErrorCode, } from "./error-codes";
describe("ErrorCodes", () => {
    it("すべてのエラーコードが定義されている", () => {
        expect(ErrorCodes.AUTH_INVALID_TOKEN).toBe("AUTH_INVALID_TOKEN");
        expect(ErrorCodes.AUTH_TOKEN_EXPIRED).toBe("AUTH_TOKEN_EXPIRED");
        expect(ErrorCodes.AUTH_UNAUTHORIZED).toBe("AUTH_UNAUTHORIZED");
        expect(ErrorCodes.AUTH_FORBIDDEN).toBe("AUTH_FORBIDDEN");
        expect(ErrorCodes.AUTH_MISSING_CREDENTIALS).toBe("AUTH_MISSING_CREDENTIALS");
        expect(ErrorCodes.VALIDATION_MISSING_FIELD).toBe("VALIDATION_MISSING_FIELD");
        expect(ErrorCodes.VALIDATION_INVALID_FORMAT).toBe("VALIDATION_INVALID_FORMAT");
        expect(ErrorCodes.VALIDATION_OUT_OF_RANGE).toBe("VALIDATION_OUT_OF_RANGE");
        expect(ErrorCodes.VALIDATION_INVALID_TYPE).toBe("VALIDATION_INVALID_TYPE");
        expect(ErrorCodes.NOT_FOUND_RESOURCE).toBe("NOT_FOUND_RESOURCE");
        expect(ErrorCodes.NOT_FOUND_USER).toBe("NOT_FOUND_USER");
        expect(ErrorCodes.NOT_FOUND_PORTFOLIO).toBe("NOT_FOUND_PORTFOLIO");
        expect(ErrorCodes.NOT_FOUND_POST).toBe("NOT_FOUND_POST");
        expect(ErrorCodes.INTERNAL_SERVER_ERROR).toBe("INTERNAL_SERVER_ERROR");
        expect(ErrorCodes.INTERNAL_PROCESSING_ERROR).toBe("INTERNAL_PROCESSING_ERROR");
        expect(ErrorCodes.EXTERNAL_API_ERROR).toBe("EXTERNAL_API_ERROR");
        expect(ErrorCodes.EXTERNAL_TIMEOUT).toBe("EXTERNAL_TIMEOUT");
        expect(ErrorCodes.EXTERNAL_RATE_LIMIT).toBe("EXTERNAL_RATE_LIMIT");
        expect(ErrorCodes.RATE_LIMIT_EXCEEDED).toBe("RATE_LIMIT_EXCEEDED");
        expect(ErrorCodes.DATABASE_CONNECTION_ERROR).toBe("DATABASE_CONNECTION_ERROR");
        expect(ErrorCodes.DATABASE_QUERY_ERROR).toBe("DATABASE_QUERY_ERROR");
        expect(ErrorCodes.DATABASE_TRANSACTION_ERROR).toBe("DATABASE_TRANSACTION_ERROR");
        expect(ErrorCodes.CACHE_CONNECTION_ERROR).toBe("CACHE_CONNECTION_ERROR");
        expect(ErrorCodes.CACHE_OPERATION_ERROR).toBe("CACHE_OPERATION_ERROR");
    });
    describe("getErrorCategory", () => {
        it("認証エラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.AUTH_INVALID_TOKEN)).toBe(ErrorCategory.AUTHENTICATION);
            expect(getErrorCategory(ErrorCodes.AUTH_TOKEN_EXPIRED)).toBe(ErrorCategory.AUTHENTICATION);
            expect(getErrorCategory(ErrorCodes.AUTH_UNAUTHORIZED)).toBe(ErrorCategory.AUTHENTICATION);
            expect(getErrorCategory(ErrorCodes.AUTH_FORBIDDEN)).toBe(ErrorCategory.AUTHENTICATION);
            expect(getErrorCategory(ErrorCodes.AUTH_MISSING_CREDENTIALS)).toBe(ErrorCategory.AUTHENTICATION);
        });
        it("バリデーションエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.VALIDATION_MISSING_FIELD)).toBe(ErrorCategory.VALIDATION);
            expect(getErrorCategory(ErrorCodes.VALIDATION_INVALID_FORMAT)).toBe(ErrorCategory.VALIDATION);
            expect(getErrorCategory(ErrorCodes.VALIDATION_OUT_OF_RANGE)).toBe(ErrorCategory.VALIDATION);
            expect(getErrorCategory(ErrorCodes.VALIDATION_INVALID_TYPE)).toBe(ErrorCategory.VALIDATION);
        });
        it("リソースエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.NOT_FOUND_RESOURCE)).toBe(ErrorCategory.NOT_FOUND);
            expect(getErrorCategory(ErrorCodes.NOT_FOUND_USER)).toBe(ErrorCategory.NOT_FOUND);
            expect(getErrorCategory(ErrorCodes.NOT_FOUND_PORTFOLIO)).toBe(ErrorCategory.NOT_FOUND);
            expect(getErrorCategory(ErrorCodes.NOT_FOUND_POST)).toBe(ErrorCategory.NOT_FOUND);
        });
        it("サーバーエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.INTERNAL_SERVER_ERROR)).toBe(ErrorCategory.INTERNAL);
            expect(getErrorCategory(ErrorCodes.INTERNAL_PROCESSING_ERROR)).toBe(ErrorCategory.INTERNAL);
        });
        it("外部サービスエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.EXTERNAL_API_ERROR)).toBe(ErrorCategory.EXTERNAL);
            expect(getErrorCategory(ErrorCodes.EXTERNAL_TIMEOUT)).toBe(ErrorCategory.EXTERNAL);
            expect(getErrorCategory(ErrorCodes.EXTERNAL_RATE_LIMIT)).toBe(ErrorCategory.EXTERNAL);
        });
        it("レート制限エラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.RATE_LIMIT_EXCEEDED)).toBe(ErrorCategory.RATE_LIMIT);
        });
        it("データベースエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.DATABASE_CONNECTION_ERROR)).toBe(ErrorCategory.DATABASE);
            expect(getErrorCategory(ErrorCodes.DATABASE_QUERY_ERROR)).toBe(ErrorCategory.DATABASE);
            expect(getErrorCategory(ErrorCodes.DATABASE_TRANSACTION_ERROR)).toBe(ErrorCategory.DATABASE);
        });
        it("キャッシュエラーのカテゴリを正しく返す", () => {
            expect(getErrorCategory(ErrorCodes.CACHE_CONNECTION_ERROR)).toBe(ErrorCategory.CACHE);
            expect(getErrorCategory(ErrorCodes.CACHE_OPERATION_ERROR)).toBe(ErrorCategory.CACHE);
        });
    });
    describe("getHttpStatusFromErrorCode", () => {
        it("認証エラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.AUTH_UNAUTHORIZED)).toBe(401);
            expect(getHttpStatusFromErrorCode(ErrorCodes.AUTH_FORBIDDEN)).toBe(403);
            expect(getHttpStatusFromErrorCode(ErrorCodes.AUTH_INVALID_TOKEN)).toBe(401);
            expect(getHttpStatusFromErrorCode(ErrorCodes.AUTH_TOKEN_EXPIRED)).toBe(401);
            expect(getHttpStatusFromErrorCode(ErrorCodes.AUTH_MISSING_CREDENTIALS)).toBe(401);
        });
        it("バリデーションエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.VALIDATION_MISSING_FIELD)).toBe(400);
            expect(getHttpStatusFromErrorCode(ErrorCodes.VALIDATION_INVALID_FORMAT)).toBe(400);
            expect(getHttpStatusFromErrorCode(ErrorCodes.VALIDATION_OUT_OF_RANGE)).toBe(400);
            expect(getHttpStatusFromErrorCode(ErrorCodes.VALIDATION_INVALID_TYPE)).toBe(400);
        });
        it("リソースエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.NOT_FOUND_RESOURCE)).toBe(404);
            expect(getHttpStatusFromErrorCode(ErrorCodes.NOT_FOUND_USER)).toBe(404);
            expect(getHttpStatusFromErrorCode(ErrorCodes.NOT_FOUND_PORTFOLIO)).toBe(404);
            expect(getHttpStatusFromErrorCode(ErrorCodes.NOT_FOUND_POST)).toBe(404);
        });
        it("レート制限エラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.RATE_LIMIT_EXCEEDED)).toBe(429);
        });
        it("サーバーエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.INTERNAL_SERVER_ERROR)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.INTERNAL_PROCESSING_ERROR)).toBe(500);
        });
        it("外部サービスエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.EXTERNAL_API_ERROR)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.EXTERNAL_TIMEOUT)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.EXTERNAL_RATE_LIMIT)).toBe(500);
        });
        it("データベースエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.DATABASE_CONNECTION_ERROR)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.DATABASE_QUERY_ERROR)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.DATABASE_TRANSACTION_ERROR)).toBe(500);
        });
        it("キャッシュエラーのHTTPステータスコードを正しく返す", () => {
            expect(getHttpStatusFromErrorCode(ErrorCodes.CACHE_CONNECTION_ERROR)).toBe(500);
            expect(getHttpStatusFromErrorCode(ErrorCodes.CACHE_OPERATION_ERROR)).toBe(500);
        });
    });
});
