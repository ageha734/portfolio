import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { copyTextToClipboard, fallbackCopyToClipboard } from "./clipboard";

describe("clipboard", () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    let mockExecCommand: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        // jsdomではexecCommandが存在しないのでモックを定義
        mockExecCommand = vi.fn().mockReturnValue(true);
        // eslint-disable-next-line deprecation/deprecation
        document.execCommand = mockExecCommand;

        document.body.innerHTML = "";
    });

    afterEach(() => {
        vi.restoreAllMocks();
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
            // スタイルは'0px'として返される
            expect(textArea.style.top).toBe("0px");
            expect(textArea.style.left).toBe("0px");
        });

        test("should log success message when copy succeeds", () => {
            vi.spyOn(document, "execCommand").mockReturnValue(true);
            fallbackCopyToClipboard("test");

            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");
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
        });
    });

    describe("copyTextToClipboard", () => {
        test("should use navigator.clipboard when available", async () => {
            const text = "test clipboard text";
            const writeTextMock = vi.fn().mockResolvedValue(undefined);

            // clipboardをモック
            const originalClipboard = navigator.clipboard;
            Object.defineProperty(navigator, "clipboard", {
                value: { writeText: writeTextMock },
                configurable: true,
            });

            try {
                copyTextToClipboard(text);
                await new Promise((resolve) => setTimeout(resolve, 10));

                expect(writeTextMock).toHaveBeenCalledWith(text);
                expect(consoleLogSpy).toHaveBeenCalledWith("Copied to clipboard ✅");
            } finally {
                Object.defineProperty(navigator, "clipboard", {
                    value: originalClipboard,
                    configurable: true,
                });
            }
        });

        test("should handle navigator.clipboard errors", async () => {
            const error = new Error("Clipboard write failed");
            const writeTextMock = vi.fn().mockRejectedValue(error);

            const originalClipboard = navigator.clipboard;
            Object.defineProperty(navigator, "clipboard", {
                value: { writeText: writeTextMock },
                configurable: true,
            });

            try {
                copyTextToClipboard("test");
                await new Promise((resolve) => setTimeout(resolve, 10));

                expect(consoleErrorSpy).toHaveBeenCalledWith("Could not copy text:", error);
            } finally {
                Object.defineProperty(navigator, "clipboard", {
                    value: originalClipboard,
                    configurable: true,
                });
            }
        });

        test("should fallback to execCommand when navigator.clipboard is not available", () => {
            const text = "test fallback";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            // clipboardを一時的に無効化
            const originalClipboard = navigator.clipboard;
            Object.defineProperty(navigator, "clipboard", {
                value: undefined,
                configurable: true,
            });

            try {
                copyTextToClipboard(text);

                expect(execCommandSpy).toHaveBeenCalledWith("copy");
                expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");
            } finally {
                Object.defineProperty(navigator, "clipboard", {
                    value: originalClipboard,
                    configurable: true,
                });
            }
        });
    });
});
