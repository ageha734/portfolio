import { SITE_DESCRIPTION, SITE_TITLE } from "~/shared/config/constants";

export interface UseWebShareAPI {
    isAvailable: boolean;
    onShare: (url: string) => Promise<void>;
}

/**
 * @name useWebShareAPI
 * @external https://web.dev/web-share/ Share API
 * @external https://developers.google.com/analytics/devguides/collection/ga4/reference/events#share GA Event
 * @description Simple hook to take advantage of the Web Share API
 * where available.
 */
export const useWebShareAPI = (): UseWebShareAPI => {
    const isAvailable = globalThis.window !== undefined && !!navigator.share;

    const data: ShareData = {
        text: SITE_DESCRIPTION,
        title: `Join me on ${SITE_TITLE}`,
    };

    const onShare = async (url: string) => {
        if (!isAvailable) return;

        try {
            await navigator.share({ ...data, url });
            const gtag = (globalThis as unknown as Window).gtag;
            if (!gtag) return;
            gtag("event", "share", { method: "Web Share" });
        } catch (error) {
            console.error("Web Share error", error);
        }
    };

    return {
        isAvailable,
        onShare,
    };
};
