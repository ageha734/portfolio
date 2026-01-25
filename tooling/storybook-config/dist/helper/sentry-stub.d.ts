export declare function init(_options?: unknown): void;
export declare function captureException(_exception: unknown, _hint?: unknown): string | null;
export declare function captureMessage(_message: string, _level?: "debug" | "info" | "warning" | "error"): string | null;
export declare function setUser(_user: unknown): void;
export declare function setContext(_name: string, _context: unknown): void;
export declare function setTag(_key: string, _value: string): void;
export declare function setTags(_tags: Record<string, string>): void;
export declare function addBreadcrumb(_breadcrumb: unknown): void;
export declare function withScope<T>(callback: (scope: unknown) => T): T;
export declare function close(): Promise<boolean>;
export declare function httpIntegration(): {};
export declare function consoleIntegration(): {};
export declare function onUncaughtExceptionIntegration(_options?: {
    exitEvenIfOtherHandlersAreRegistered?: boolean;
}): {};
export declare function onUnhandledRejectionIntegration(_options?: {
    mode?: "warn" | "none";
}): {};
declare const _default: {
    init: typeof init;
    captureException: typeof captureException;
    captureMessage: typeof captureMessage;
    setUser: typeof setUser;
    setContext: typeof setContext;
    setTag: typeof setTag;
    setTags: typeof setTags;
    addBreadcrumb: typeof addBreadcrumb;
    withScope: typeof withScope;
    close: typeof close;
    httpIntegration: typeof httpIntegration;
    consoleIntegration: typeof consoleIntegration;
    onUncaughtExceptionIntegration: typeof onUncaughtExceptionIntegration;
    onUnhandledRejectionIntegration: typeof onUnhandledRejectionIntegration;
};
export default _default;
//# sourceMappingURL=sentry-stub.d.ts.map