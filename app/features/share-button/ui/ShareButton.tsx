import { useWebShareAPI } from "~/shared/hooks/useWebShareAPI";

export const ShareButton = () => {
    const { isAvailable, onShare } = useWebShareAPI();

    const onClick = () => {
        onShare("https://mattscholta.com/resume");
    };

    if (!isAvailable) return null;

    return (
        <button
            className="ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl py-2 px-4 text-sm font-normal text-white"
            onClick={onClick}
        >
            <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        </button>
    );
};
