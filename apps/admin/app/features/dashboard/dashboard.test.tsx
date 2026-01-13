import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "./dashboard";
import { trpc } from "~/shared/lib/trpc";

vi.mock("~/shared/lib/trpc", () => ({
    trpc: {
        posts: {
            list: {
                query: vi.fn().mockResolvedValue([]),
            },
        },
        portfolios: {
            list: {
                query: vi.fn().mockResolvedValue([]),
            },
        },
    },
}));

describe("Dashboard", () => {
    test("should render dashboard", () => {
        render(<Dashboard />);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Welcome to your CMS dashboard")).toBeInTheDocument();
    });

    test("should render stat cards", () => {
        render(<Dashboard />);
        expect(screen.getByText("Total Posts")).toBeInTheDocument();
        expect(screen.getByText("Portfolios")).toBeInTheDocument();
        expect(screen.getByText("Total Views")).toBeInTheDocument();
        expect(screen.getByText("Users")).toBeInTheDocument();
    });

    test("should fetch and display stats", async () => {
        vi.mocked(trpc.posts.list.query).mockResolvedValue([{ id: "1", title: "Test Post" }]);
        vi.mocked(trpc.portfolios.list.query).mockResolvedValue([{ id: "1", title: "Test Portfolio" }]);

        render(<Dashboard />);

        // Wait for stats to load
        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(trpc.posts.list.query).toHaveBeenCalled();
        expect(trpc.portfolios.list.query).toHaveBeenCalled();
    });
});
