import type { Meta, StoryObj } from "@storybook/react";
import { ShareButton } from "./ShareButton";
import "~/tailwind.css";

const meta: Meta<typeof ShareButton> = {
	title: "features/share-button/ShareButton",
	component: ShareButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		showLabel: true,
	},
};

export const WithCustomUrl: Story = {
	args: {
		url: "https://example.com",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
