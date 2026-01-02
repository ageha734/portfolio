/**
 * @name fallbackCopyToClipboard
 * @external https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @description Some code taken from StackOverflow which provides modern
 * clipboard functionality and a fallback for older browsers.
 * Note: Uses deprecated execCommand API, but needed as fallback for older browsers
 * that don't support navigator.clipboard API.
 */
export const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        // NOSONAR: typescript:S1874 - execCommand is deprecated but needed as fallback for older browsers
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    textArea.remove();
};

export const copyTextToClipboard = (text: string) => {
    console.log(`📋 copy text to Clipboard`, text);

    if (!navigator.clipboard) {
        fallbackCopyToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(
        function () {
            console.log("Copied to clipboard ✅");
        },
        function (err) {
            console.error("Could not copy text:", err);
        },
    );
};
