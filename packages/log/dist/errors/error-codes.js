export var ErrorCategory;
(function (ErrorCategory) {
    ErrorCategory["AUTHENTICATION"] = "AUTH";
    ErrorCategory["VALIDATION"] = "VALIDATION";
    ErrorCategory["NOT_FOUND"] = "NOT_FOUND";
    ErrorCategory["INTERNAL"] = "INTERNAL";
    ErrorCategory["EXTERNAL"] = "EXTERNAL";
    ErrorCategory["RATE_LIMIT"] = "RATE_LIMIT";
    ErrorCategory["DATABASE"] = "DATABASE";
    ErrorCategory["CACHE"] = "CACHE";
})(ErrorCategory || (ErrorCategory = {}));
export const ErrorCodes = {
    AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
    AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
    AUTH_UNAUTHORIZED: "AUTH_UNAUTHORIZED",
    AUTH_FORBIDDEN: "AUTH_FORBIDDEN",
    AUTH_MISSING_CREDENTIALS: "AUTH_MISSING_CREDENTIALS",
    VALIDATION_MISSING_FIELD: "VALIDATION_MISSING_FIELD",
    VALIDATION_INVALID_FORMAT: "VALIDATION_INVALID_FORMAT",
    VALIDATION_OUT_OF_RANGE: "VALIDATION_OUT_OF_RANGE",
    VALIDATION_INVALID_TYPE: "VALIDATION_INVALID_TYPE",
    NOT_FOUND_RESOURCE: "NOT_FOUND_RESOURCE",
    NOT_FOUND_USER: "NOT_FOUND_USER",
    NOT_FOUND_PORTFOLIO: "NOT_FOUND_PORTFOLIO",
    NOT_FOUND_POST: "NOT_FOUND_POST",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    INTERNAL_PROCESSING_ERROR: "INTERNAL_PROCESSING_ERROR",
    EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR",
    EXTERNAL_TIMEOUT: "EXTERNAL_TIMEOUT",
    EXTERNAL_RATE_LIMIT: "EXTERNAL_RATE_LIMIT",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    DATABASE_CONNECTION_ERROR: "DATABASE_CONNECTION_ERROR",
    DATABASE_QUERY_ERROR: "DATABASE_QUERY_ERROR",
    DATABASE_TRANSACTION_ERROR: "DATABASE_TRANSACTION_ERROR",
    CACHE_CONNECTION_ERROR: "CACHE_CONNECTION_ERROR",
    CACHE_OPERATION_ERROR: "CACHE_OPERATION_ERROR",
};
export function getErrorCategory(code) {
    const prefix = code.split("_")[0];
    return prefix;
}
export function getHttpStatusFromErrorCode(code) {
    const category = getErrorCategory(code);
    switch (category) {
        case ErrorCategory.AUTHENTICATION:
            if (code === ErrorCodes.AUTH_UNAUTHORIZED)
                return 401;
            if (code === ErrorCodes.AUTH_FORBIDDEN)
                return 403;
            return 401;
        case ErrorCategory.VALIDATION:
            return 400;
        case ErrorCategory.NOT_FOUND:
            return 404;
        case ErrorCategory.RATE_LIMIT:
            return 429;
        case ErrorCategory.EXTERNAL:
        case ErrorCategory.DATABASE:
        case ErrorCategory.CACHE:
        case ErrorCategory.INTERNAL:
        default:
            return 500;
    }
}
