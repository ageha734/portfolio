export const customInstance = async <T>(
    config: {
        url: string;
        method: string;
        headers?: Record<string, string>;
        data?: unknown;
    },
    options?: {
        baseURL?: string;
    },
): Promise<T> => {
    const { url, method } = config;
    const baseURL = options?.baseURL || "https://api.graphcms.com/v2";

    return {
        url: `${baseURL}${url}`,
        method,
        data: config.data,
    } as unknown as T;
};
