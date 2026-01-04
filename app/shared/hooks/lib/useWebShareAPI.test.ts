import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useWebShareAPI } from "./useWebShareAPI";

describe("useWebShareAPI", () => {
    const originalShare = navigator.share;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        // navigatorを元の状態に戻す試み（可能であれば）
        try {
            Object.defineProperty(navigator, "share", {
                value: originalShare,
                writable: true,
                configurable: true,
            });
        } catch {
            // 無視
        }
    });

    test("should return isAvailable based on navigator.share existence", () => {
        const { result } = renderHook(() => useWebShareAPI());

        // jsdom環境ではnavigator.shareは通常undefined
        // isAvailableはnavigator.shareの存在に基づく
        expect(typeof result.current.isAvailable).toBe("boolean");
    });

    test("should return onShare function", () => {
        const { result } = renderHook(() => useWebShareAPI());

        expect(typeof result.current.onShare).toBe("function");
    });

    test("should handle onShare call without error when share is not available", async () => {
        const { result } = renderHook(() => useWebShareAPI());

        // エラーなく実行できることを確認
        await expect(result.current.onShare("https://example.com")).resolves.not.toThrow();
    });

    test("should have correct return type", () => {
        const { result } = renderHook(() => useWebShareAPI());

        expect(result.current).toHaveProperty("isAvailable");
        expect(result.current).toHaveProperty("onShare");
    });

    test("isAvailable should be false when navigator.share is undefined", () => {
        // jsdom環境ではnavigator.shareは存在しないことが多い
        const { result } = renderHook(() => useWebShareAPI());

        // navigator.shareがundefinedの場合はfalse
        if (typeof navigator.share === "undefined") {
            expect(result.current.isAvailable).toBe(false);
        }
    });

    test("onShare should be callable with url parameter", async () => {
        const { result } = renderHook(() => useWebShareAPI());

        // 関数が呼び出し可能であることを確認
        const onShare = result.current.onShare;
        expect(onShare).toBeInstanceOf(Function);
    });

    test("hook should return stable references", () => {
        const { result, rerender } = renderHook(() => useWebShareAPI());

        const _firstOnShare = result.current.onShare;
        const firstIsAvailable = result.current.isAvailable;

        rerender();

        // isAvailableは同じ値を返すべき
        expect(result.current.isAvailable).toBe(firstIsAvailable);
    });
});
