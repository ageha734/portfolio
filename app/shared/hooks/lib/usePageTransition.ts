import { useNavigate } from "@remix-run/react";
import { BASE_URL } from "~/shared/config/settings";

export const usePageTransition = () => {
    const navigate = useNavigate();

    const isBrowser = globalThis.window !== undefined;
    const isSupported = isBrowser && typeof (document as any).createDocumentTransition === "function"; // prettier-ignore

    console.log(" 💬 ~ isSupported", isSupported);

    const transition = async (path: string) => {
        alert(` 💬 ~ isSupported ${isSupported}`);

        const url = `${BASE_URL}${path}`;

        await fetch(url);

        if (!isSupported) {
            navigate(path);
            return;
        }

        const transition = (document as any).createDocumentTransition();
        await transition.start(() => navigate(path));
    };

    return { transition };
};
