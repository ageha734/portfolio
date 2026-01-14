import type { Meta, StoryObj } from "@storybook/react";
import { ShareButton } from "./ShareButton";

const meta: Meta<typeof ShareButton> = {
    title: "components/ShareButton",
    component: ShareButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
    },
};

export const WithLabel: Story = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
        showLabel: true,
    },
};

export const WithUrl: Story = {
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

export const Disabled: Story = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: true,
        disabled: true,
    },
};

export const NotAvailable: Story = {
    args: {
        onShare: () => {
            alert("Share clicked!");
        },
        isAvailable: false,
    },
};
