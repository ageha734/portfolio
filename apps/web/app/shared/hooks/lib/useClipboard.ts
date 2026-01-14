import { useState } from "react";
import { copyTextToClipboard } from "~/shared/hooks/lib/clipboard";

/**
 * @name useClipboard
 * @description Simple hook for interacting with the browsers clipboard.
 */
export const useClipboard = () => {
	const [value, setValue] = useState<string>();

	const onCopy = (value: string) => {
		copyTextToClipboard(value);

		setValue(value);
	};

	return { onCopy, value };
};
