import { useState } from "react";
import { copyTextToClipboard } from "~/shared/lib/clipboard";

/**
 * @name useClipboard
 * @description Simple hook for interacting with the browsers clipboard.
 */
export const useClipboard = () => {
    const [value, setValue] = useState<string>();

    const onCopy = (value: any) => {
        copyTextToClipboard(value);

        setValue(value);
    };

    return { onCopy, value };
};
