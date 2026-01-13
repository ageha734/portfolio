import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./dashboard";
import { trpc } from "~/shared/lib/trpc";
import { vi } from "vitest";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        posts: {
            list: {
                query: vi.fn().mockResolvedValue([
                    { id: "1", title: "Test Post 1" },
                    { id: "2", title: "Test Post 2" },
                ]),
            },
        },
        portfolios: {
            list: {
                query: vi.fn().mockResolvedValue([{ id: "1", title: "Test Portfolio 1" }]),
            },
        },
    },
}));

const meta = {
    title: "Features/Dashboard",
    component: Dashboard,
    tags: ["autodocs"],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
