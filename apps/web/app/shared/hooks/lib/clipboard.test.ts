import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { copyTextToClipboard } from "./clipboard";

describe("clipboard", () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
			// テスト用の空実装
		});
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {
			// テスト用の空実装
		});

		document.body.innerHTML = "";
	});

	afterEach(() => {
		vi.restoreAllMocks();
		document.body.innerHTML = "";
	});

	describe("copyTextToClipboard", () => {
		test("should use navigator.clipboard when available", async () => {
			const text = "test clipboard text";
			const writeTextMock = vi.fn().mockResolvedValue(undefined);

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

				expect(consoleErrorSpy).toHaveBeenCalledWith(
					"Could not copy text:",
					error,
				);
			} finally {
				Object.defineProperty(navigator, "clipboard", {
					value: originalClipboard,
					configurable: true,
				});
			}
		});

		test("should log error when navigator.clipboard is not available", () => {
			const text = "test fallback";

			// clipboardを一時的に無効化
			const originalClipboard = navigator.clipboard;
			Object.defineProperty(navigator, "clipboard", {
				value: undefined,
				configurable: true,
			});

			try {
				copyTextToClipboard(text);

				expect(consoleErrorSpy).toHaveBeenCalledWith(
					"Clipboard API is not available. This feature requires a secure context (HTTPS or localhost).",
				);
			} finally {
				Object.defineProperty(navigator, "clipboard", {
					value: originalClipboard,
					configurable: true,
				});
			}
		});
	});
});
