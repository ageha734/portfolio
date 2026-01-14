import { useNavigate } from "@remix-run/react";
import { BASE_URL } from "~/shared/config/settings";

interface DocumentTransition {
	start(callback: () => void | Promise<void>): Promise<void>;
}

interface DocumentWithTransition extends Document {
	createDocumentTransition?(): DocumentTransition;
}

export const usePageTransition = () => {
	const navigate = useNavigate();

	const isBrowser = globalThis.window !== undefined;
	const doc = document as DocumentWithTransition;
	const isSupported =
		isBrowser && typeof doc.createDocumentTransition === "function";

	console.log(" 💬 ~ isSupported", isSupported);

	const transition = async (path: string) => {
		alert(` 💬 ~ isSupported ${isSupported}`);

		const url = `${BASE_URL}${path}`;

		await fetch(url);

		if (!isSupported || !doc.createDocumentTransition) {
			navigate(path);
			return;
		}

		const documentTransition = doc.createDocumentTransition();
		await documentTransition.start(() => navigate(path));
	};

	return { transition };
};
