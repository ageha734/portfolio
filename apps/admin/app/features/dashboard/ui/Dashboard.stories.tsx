import type { Meta, StoryObj } from "@storybook/react";
import { vi } from "vitest";
import * as useDashboardStatsModule from "../lib/useDashboardStats";
import { Dashboard } from "./Dashboard";

vi.mock("../lib/useDashboardStats");

const meta = {
	title: "Features/Dashboard",
	component: Dashboard,
	tags: ["autodocs"],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [
		() => {
			vi.mocked(useDashboardStatsModule.useDashboardStats).mockReturnValue({
				stats: {
					posts: 10,
					portfolios: 5,
					totalViews: 1000,
					users: 50,
				},
				loading: false,
				error: null,
			});
			return <Dashboard />;
		},
	],
};
