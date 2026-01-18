import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import customInstance, { customInstance as namedExport } from "./mutator";

// axiosをモック
vi.mock("axios");

describe("mutator", () => {
    const originalEnv = process.env;
    const originalWindow = globalThis.window;

    beforeEach(() => {
        vi.clearAllMocks();
        process.env = { ...originalEnv };
        // windowをクリーンアップ
        if (globalThis.window) {
            delete (globalThis as any).window;
        }
    });

    afterEach(() => {
        process.env = originalEnv;
        if (originalWindow) {
            (globalThis as any).window = originalWindow;
        } else {
            delete (globalThis as any).window;
        }
    });

    describe("getBaseUrl", () => {
        test("should return window.location.origin in browser environment", () => {
            const mockOrigin = "https://example.com";
            (globalThis as any).window = {
                location: {
                    origin: mockOrigin,
                },
            };

            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            customInstance({ url: "/test" });

            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: mockOrigin,
                }),
            );
        });

        test("should return VITE_API_URL from process.env in Node environment", async () => {
            const apiUrl = "https://api.example.com";
            process.env.VITE_API_URL = apiUrl;

            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            customInstance({ url: "/test" });

            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: apiUrl,
                }),
            );
        });

        test("should return default URL when VITE_API_URL is not set", () => {
            delete process.env.VITE_API_URL;

            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            customInstance({ url: "/test" });

            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: "http://localhost:8787",
                }),
            );
        });
    });

    describe("customInstance", () => {
        test("should merge config and options", async () => {
            const mockAxios = vi.mocked(axios);
            const mockData = { test: "data" };
            mockAxios.mockResolvedValue({
                data: mockData,
            } as any);

            const config = { url: "/test", method: "GET" };
            const options = { headers: { "X-Custom": "value" } };

            const result = await customInstance(config, options);

            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: "/test",
                    method: "GET",
                    headers: { "X-Custom": "value" },
                }),
            );
            expect(result).toEqual(mockData);
        });

        test("should set cancelToken", () => {
            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            customInstance({ url: "/test" });

            const callArgs = mockAxios.mock.calls[0]?.[0];
            expect(callArgs).toHaveProperty("cancelToken");
            expect(callArgs?.cancelToken).toBeDefined();
        });

        test("should return promise with cancel method", () => {
            const mockAxios = vi.mocked(axios);
            const mockCancelToken = {
                token: "mock-token",
                cancel: vi.fn(),
            };

            // CancelToken.sourceをモック
            const mockSource = {
                token: mockCancelToken.token,
                cancel: mockCancelToken.cancel,
            };

            vi.spyOn(axios, "CancelToken" as any).mockImplementation(() => ({
                source: () => mockSource,
            }));

            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            const promise = customInstance({ url: "/test" });

            expect(promise).toHaveProperty("cancel");
            expect(typeof promise.cancel).toBe("function");
        });

        test("should call cancelToken.cancel when cancel is called", () => {
            const mockCancel = vi.fn();
            const mockSource = {
                token: "mock-token",
                cancel: mockCancel,
            };

            vi.spyOn(axios, "CancelToken" as any).mockImplementation(() => ({
                source: () => mockSource,
            }));

            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            const promise = customInstance({ url: "/test" });
            promise.cancel();

            expect(mockCancel).toHaveBeenCalledWith("Query was cancelled");
        });

        test("should extract data from response", async () => {
            const mockData = { id: 1, name: "test" };
            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: mockData,
                status: 200,
                statusText: "OK",
                headers: {},
                config: {} as any,
            } as any);

            const result = await customInstance({ url: "/test" });

            expect(result).toEqual(mockData);
            expect(result).not.toHaveProperty("status");
            expect(result).not.toHaveProperty("statusText");
        });

        test("should work as default export", () => {
            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            customInstance({ url: "/test" });

            expect(mockAxios).toHaveBeenCalled();
        });

        test("should work as named export", () => {
            const mockAxios = vi.mocked(axios);
            mockAxios.mockResolvedValue({
                data: { test: "data" },
            } as any);

            namedExport({ url: "/test" });

            expect(mockAxios).toHaveBeenCalled();
        });
    });
});
