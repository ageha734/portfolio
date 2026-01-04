import { getClipboardStore, resetClipboardStore } from "@vi/mocks";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { copyTextToClipboard, fallbackCopyToClipboard } from "./clipboard";

describe("clipboard", () => {
    // eslint-disable-next-line deprecation/deprecation
    let originalExecCommand: typeof document.execCommand | undefined;

    let logHistory: unknown[][] = [];
    let errorHistory: unknown[][] = [];

    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        // eslint-disable-next-line deprecation/deprecation
        originalExecCommand = document.execCommand;

        logHistory = [];
        errorHistory = [];

        consoleLogSpy = vi.spyOn(console, "log").mockImplementation((...args) => {
            logHistory.push(args);
        });
        consoleErrorSpy = vi.spyOn(console, "error").mockImplementation((...args) => {
            errorHistory.push(args);
        });

        resetClipboardStore();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        if (originalExecCommand !== undefined) {
            // eslint-disable-next-line deprecation/deprecation
            document.execCommand = originalExecCommand;
        }
        vi.restoreAllMocks();
        resetClipboardStore();
        document.body.innerHTML = "";
    });

    describe("fallbackCopyToClipboard", () => {
        test("should create and remove textarea element", () => {
            const text = "test text";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            fallbackCopyToClipboard(text);

            expect(document.body.querySelector("textarea")).toBeNull();
            expect(execCommandSpy).toHaveBeenCalledWith("copy");
        });

        test("should set textarea styles correctly", () => {
            const text = "test";
            vi.spyOn(document, "execCommand").mockReturnValue(true);
            const createElementSpy = vi.spyOn(document, "createElement");

            fallbackCopyToClipboard(text);

            const textArea = createElementSpy.mock.results.find((r) => (r.value as HTMLElement).tagName === "TEXTAREA")
                ?.value as HTMLTextAreaElement;

            // 要素が生成されていることを確認してからプロパティをチェック
            expect(textArea).toBeDefined();
            expect(textArea.style.position).toBe("fixed");
            expect(textArea.style.top).toBe("0");
            expect(textArea.style.left).toBe("0");
        });

        test("should log success message when copy succeeds", () => {
            vi.spyOn(document, "execCommand").mockReturnValue(true);
            fallbackCopyToClipboard("test");

            // Spyの呼び出し確認に加え、実際にログ配列に保存されたか確認することも可能
            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");
            expect(logHistory).toContainEqual(["Fallback: Copying text command was successful"]);
        });

        test("should log failure message when copy fails", () => {
            vi.spyOn(document, "execCommand").mockReturnValue(false);
            fallbackCopyToClipboard("test");
            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was unsuccessful");
        });

        test("should handle execCommand errors gracefully", () => {
            const error = new Error("execCommand failed");
            vi.spyOn(document, "execCommand").mockImplementation(() => {
                throw error;
            });

            fallbackCopyToClipboard("test");
            expect(consoleErrorSpy).toHaveBeenCalledWith("Fallback: Oops, unable to copy", error);
            expect(errorHistory).toContainEqual(["Fallback: Oops, unable to copy", error]);
        });
    });

    describe("copyTextToClipboard", () => {
        test("should use navigator.clipboard when available", async () => {
            const text = "test clipboard text";

            copyTextToClipboard(text);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
            expect(getClipboardStore()).toBe(text);
            expect(consoleLogSpy).toHaveBeenCalledWith("Copied to clipboard ✅");
        });

        test("should handle navigator.clipboard errors", async () => {
            const error = new Error("Clipboard write failed");
            vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(error);

            copyTextToClipboard("test");
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(consoleErrorSpy).toHaveBeenCalledWith("Could not copy text:", error);
        });

        test("should fallback to execCommand when navigator.clipboard is not available", () => {
            const text = "test fallback";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            Object.defineProperty(navigator, "clipboard", {
                value: undefined,
                writable: true,
                configurable: true,
            });

            copyTextToClipboard(text);

            expect(execCommandSpy).toHaveBeenCalledWith("copy");
            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");
        });
    });
});
