import { useWebShareAPI } from "~/shared/hooks/lib/useWebShareAPI";

export const ShareButton = () => {
    const { isAvailable, onShare } = useWebShareAPI();

    const onClick = () => {
        onShare("https://mattscholta.com/resume");
    };

    if (!isAvailable) return null;

    return (
        <button
            className="ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl px-4 py-2 font-normal text-sm text-white"
            onClick={onClick}
        >
            <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        </button>
    );
};
