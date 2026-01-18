import { ShareButton } from "./ShareButton";
const meta = {
    title: "components/ShareButton",
    component: ShareButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
    },
};
export const WithLabel = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
        showLabel: true,
    },
};
export const WithUrl = {
    args: {
        url: "https://example.com",
        title: "Example Page",
        text: "Check out this page!",
        onShare: (options) => {
            alert(`Sharing: ${JSON.stringify(options)}`);
        },
        isAvailable: true,
    },
};
export const Disabled = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
        disabled: true,
    },
};
export const NotAvailable = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: false,
    },
};
