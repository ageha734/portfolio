import { type ErrorCode } from "./error-codes";
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly category: string;
    readonly httpStatus: number;
    readonly metadata?: Record<string, unknown>;
    readonly originalError?: Error;
    constructor(code: ErrorCode, message: string, options?: {
        metadata?: Record<string, unknown>;
        originalError?: Error;
        cause?: unknown;
    });
    toJSON(): {
        code: ErrorCode;
        category: string;
        message: string;
        httpStatus: number;
        metadata?: Record<string, unknown>;
    };
    static fromCode(code: ErrorCode, message?: string, options?: {
        metadata?: Record<string, unknown>;
        originalError?: Error;
        cause?: unknown;
    }): AppError;
}
//# sourceMappingURL=app-error.d.ts.map