/**
 * @name copyTextToClipboard
 * @description Copies text to clipboard using the modern Clipboard API.
 * Requires HTTPS or localhost for security reasons.
 */
export const copyTextToClipboard = (text: string) => {
	console.log("📋 copy text to Clipboard", text);

	if (!navigator.clipboard) {
		console.error(
			"Clipboard API is not available. This feature requires a secure context (HTTPS or localhost).",
		);
		return;
	}

	navigator.clipboard.writeText(text).then(
		() => {
			console.log("Copied to clipboard ✅");
		},
		(err) => {
			console.error("Could not copy text:", err);
		},
	);
};
