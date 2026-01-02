import "~/tailwind.css";

export default {
    title: "features/share-button/ShareButton",
};

const ShareButtonMock = () => {
    return (
        <button
            className="ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl py-2 px-4 text-sm font-normal text-white"
            onClick={() => alert("Share clicked!")}
        >
            <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        </button>
    );
};

export const Default = () => <ShareButtonMock />;

export const WithLabel = () => (
    <button
        className="ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl py-2 px-4 text-sm font-normal text-white flex items-center gap-2"
        onClick={() => alert("Share clicked!")}
    >
        <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
        <span>Share</span>
    </button>
);

export const Disabled = () => (
    <button
        className="ui-btn whitespace-nowrap rounded-2xl py-2 px-4 text-sm font-normal text-white bg-gray-400 cursor-not-allowed"
        disabled
    >
        <img alt="Share" height={20} src="/images/svg/share.svg" width={20} />
    </button>
);
