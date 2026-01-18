import axios, {} from "axios";
const getBaseUrl = () => {
    if (typeof globalThis !== "undefined" && "window" in globalThis) {
        const win = globalThis.window;
        if (win !== undefined) {
            return win.location.origin;
        }
    }
    return process.env.VITE_API_URL ?? "http://localhost:8787";
};
export const customInstance = (config, options) => {
    const source = axios.CancelToken.source();
    const promise = axios({
        ...config,
        ...options,
        baseURL: getBaseUrl(),
        cancelToken: source.token,
    }).then(({ data }) => data);
    // @ts-expect-error - CancelToken is deprecated but we need it for compatibility
    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };
    return promise;
};
export default customInstance;
