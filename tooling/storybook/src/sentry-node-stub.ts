export function init(_options?: unknown) {
    void 0;
}
export function captureException(_exception: unknown, _hint?: unknown): string | null {
    return null;
}
export function captureMessage(_message: string, _level?: SeverityLevel | unknown): string | null {
    return null;
}
export function setUser(_user: unknown) {
    void 0;
}
export function setContext(_name: string, _context: unknown) {
    void 0;
}
export function setTag(_key: string, _value: string) {
    void 0;
}
export function setTags(_tags: Record<string, string>) {
    void 0;
}
export function addBreadcrumb(_breadcrumb: Breadcrumb) {
    void 0;
}
export function withScope<T>(callback: (scope: Scope) => T): T {
    const mockScope = {} as Scope;
    return callback(mockScope);
}
export function close() {
    return Promise.resolve(true);
}
export function httpIntegration() {
    return {};
}
export function consoleIntegration() {
    return {};
}
export function onUncaughtExceptionIntegration(_options?: { exitEvenIfOtherHandlersAreRegistered?: boolean }) {
    return {};
}
export function onUnhandledRejectionIntegration(_options?: { mode?: "warn" | "none" }) {
    return {};
}

export type SeverityLevel = "debug" | "info" | "warning" | "error";
export type Breadcrumb = unknown;
export type Scope = unknown;
export type ErrorEvent = unknown;
export type EventHint = unknown;

export default {
    init,
    captureException,
    captureMessage,
    setUser,
    setContext,
    setTag,
    setTags,
    addBreadcrumb,
    withScope,
    close,
    httpIntegration,
    consoleIntegration,
    onUncaughtExceptionIntegration,
    onUnhandledRejectionIntegration,
};
