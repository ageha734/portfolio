export function init(_options) {
    void 0;
}
export function captureException(_exception, _hint) {
    return null;
}
export function captureMessage(_message, _level) {
    return null;
}
export function setUser(_user) {
    void 0;
}
export function setContext(_name, _context) {
    void 0;
}
export function setTag(_key, _value) {
    void 0;
}
export function setTags(_tags) {
    void 0;
}
export function addBreadcrumb(_breadcrumb) {
    void 0;
}
export function withScope(callback) {
    const mockScope = {};
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
export function onUncaughtExceptionIntegration(_options) {
    return {};
}
export function onUnhandledRejectionIntegration(_options) {
    return {};
}
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
