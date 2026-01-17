import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const getBaseUrl = () => {
    if (typeof globalThis !== "undefined" && "window" in globalThis && globalThis.window !== undefined) {
        return (globalThis.window as any).location.origin;
    }
    return process.env.VITE_API_URL ?? "http://localhost:8787";
};

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = axios.CancelToken.source();
    const promise = axios({
        ...config,
        ...options,
        baseURL: getBaseUrl(),
        cancelToken: source.token,
    }).then(({ data }: AxiosResponse<T>) => data);

    // @ts-expect-error - CancelToken is deprecated but we need it for compatibility
    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };

    return promise;
};

export default customInstance;
