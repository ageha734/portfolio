import "~/tailwind.css";

export default {
    title: "features/share-button/ShareButton",
};

const ShareButtonMock = () => {
    return (
        <button
            className="ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl px-4 py-2 font-normal text-sm text-white"
            onClick={() => alert("Share clicked!")}
        >
            <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        </button>
    );
};

export const Default = () => <ShareButtonMock />;

export const WithLabel = () => (
    <button
        className="ui-btn custom-bg-gradient flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2 font-normal text-sm text-white"
        onClick={() => alert("Share clicked!")}
    >
        <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        <span>Share</span>
    </button>
);

export const Disabled = () => (
    <button
        className="ui-btn cursor-not-allowed whitespace-nowrap rounded-2xl bg-gray-400 px-4 py-2 font-normal text-sm text-white"
        disabled
    >
        <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
    </button>
);
