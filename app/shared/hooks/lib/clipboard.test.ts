import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import { fallbackCopyToClipboard, copyTextToClipboard } from "./clipboard";

describe("clipboard", () => {
    let originalClipboard: Clipboard | undefined;
    // eslint-disable-next-line deprecation/deprecation -- execCommand is deprecated but needed as fallback for older browsers
    let originalExecCommand: typeof document.execCommand | undefined;
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        originalClipboard = navigator.clipboard;
        // eslint-disable-next-line deprecation/deprecation -- execCommand is deprecated but needed as fallback for older browsers
        originalExecCommand = document.execCommand;

        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        document.body.innerHTML = "";
    });

    afterEach(() => {
        if (originalClipboard !== undefined) {
            Object.defineProperty(navigator, "clipboard", {
                value: originalClipboard,
                writable: true,
                configurable: true,
            });
        }
        if (originalExecCommand !== undefined) {
            // eslint-disable-next-line deprecation/deprecation -- execCommand is deprecated but needed as fallback for older browsers
            document.execCommand = originalExecCommand;
        }

        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();

        document.body.innerHTML = "";
    });

    describe("fallbackCopyToClipboard", () => {
        test("should create and remove textarea element", () => {
            const text = "test text";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            fallbackCopyToClipboard(text);

            expect(document.body.querySelector("textarea")).toBeNull();
            expect(execCommandSpy).toHaveBeenCalledWith("copy");
            execCommandSpy.mockRestore();
        });

        test("should set textarea value correctly", () => {
            const text = "test clipboard text";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            fallbackCopyToClipboard(text);

            expect(execCommandSpy).toHaveBeenCalledWith("copy");
            execCommandSpy.mockRestore();
        });

        test("should set textarea styles correctly", () => {
            const text = "test";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);
            const createElementSpy = vi.spyOn(document, "createElement");

            fallbackCopyToClipboard(text);

            const textArea = createElementSpy.mock.results[0].value as HTMLTextAreaElement;
            expect(textArea.style.position).toBe("fixed");
            expect(textArea.style.top).toBe("0");
            expect(textArea.style.left).toBe("0");

            execCommandSpy.mockRestore();
            createElementSpy.mockRestore();
        });

        test("should log success message when copy succeeds", () => {
            const text = "test";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

            fallbackCopyToClipboard(text);

            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");
            execCommandSpy.mockRestore();
        });

        test("should log failure message when copy fails", () => {
            const text = "test";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(false);

            fallbackCopyToClipboard(text);

            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was unsuccessful");
            execCommandSpy.mockRestore();
        });

        test("should handle execCommand errors gracefully", () => {
            const text = "test";
            const error = new Error("execCommand failed");
            const execCommandSpy = vi.spyOn(document, "execCommand").mockImplementation(() => {
                throw error;
            });

            fallbackCopyToClipboard(text);

            expect(consoleErrorSpy).toHaveBeenCalledWith("Fallback: Oops, unable to copy", error);
            expect(document.body.querySelector("textarea")).toBeNull();
            execCommandSpy.mockRestore();
        });

        test("should focus and select textarea", () => {
            const text = "test";
            const execCommandSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);
            const createElementSpy = vi.spyOn(document, "createElement");
            const focusSpy = vi.fn();
            const selectSpy = vi.fn();

            createElementSpy.mockImplementation((tagName) => {
                const element = document.createElement(tagName);
                if (tagName === "textarea") {
                    const textarea = element as HTMLTextAreaElement;
                    Object.defineProperty(textarea, "focus", {
                        value: focusSpy,
                        writable: true,
                        configurable: true,
                    });
                    Object.defineProperty(textarea, "select", {
                        value: selectSpy,
                        writable: true,
                        configurable: true,
                    });
                }
                return element;
            });

            fallbackCopyToClipboard(text);

            expect(focusSpy).toHaveBeenCalled();
            expect(selectSpy).toHaveBeenCalled();

            execCommandSpy.mockRestore();
            createElementSpy.mockRestore();
        });
    });

    describe("copyTextToClipboard", () => {
        test("should use navigator.clipboard when available", async () => {
            const text = "test clipboard text";
            const writeTextSpy = vi.fn().mockResolvedValue(undefined);
            const clipboardMock = {
                writeText: writeTextSpy,
            };

            Object.defineProperty(navigator, "clipboard", {
                value: clipboardMock,
                writable: true,
                configurable: true,
            });

            copyTextToClipboard(text);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(writeTextSpy).toHaveBeenCalledWith(text);
            expect(consoleLogSpy).toHaveBeenCalledWith("📋 copy text to Clipboard", text);
            expect(consoleLogSpy).toHaveBeenCalledWith("Copied to clipboard ✅");
        });

        test("should handle navigator.clipboard errors", async () => {
            const text = "test";
            const error = new Error("Clipboard write failed");
            const writeTextSpy = vi.fn().mockRejectedValue(error);
            const clipboardMock = {
                writeText: writeTextSpy,
            };

            Object.defineProperty(navigator, "clipboard", {
                value: clipboardMock,
                writable: true,
                configurable: true,
            });

            copyTextToClipboard(text);

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

            expect(consoleLogSpy).toHaveBeenCalledWith("📋 copy text to Clipboard", text);
            expect(execCommandSpy).toHaveBeenCalledWith("copy");
            expect(consoleLogSpy).toHaveBeenCalledWith("Fallback: Copying text command was successful");

            execCommandSpy.mockRestore();
        });

        test("should log clipboard copy attempt", () => {
            const text = "test log";
            const writeTextSpy = vi.fn().mockResolvedValue(undefined);
            const clipboardMock = {
                writeText: writeTextSpy,
            };

            Object.defineProperty(navigator, "clipboard", {
                value: clipboardMock,
                writable: true,
                configurable: true,
            });

            copyTextToClipboard(text);

            expect(consoleLogSpy).toHaveBeenCalledWith("📋 copy text to Clipboard", text);
        });
    });
});
