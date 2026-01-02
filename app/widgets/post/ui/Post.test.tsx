import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Post } from "./Post";

vi.mock("~/hooks", () => ({
    useScrollToHash: () => vi.fn(),
    useParallax: () => {},
}));

vi.mock("~/widgets/footer", () => ({
    Footer: () => <footer>Footer</footer>,
}));

describe("Post Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render post with title and children", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        expect(screen.getByText("Test Post")).toBeInTheDocument();
        expect(screen.getByText("Post content")).toBeInTheDocument();
    });

    test("should render post with banner", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01" banner="test.jpg">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        const images = screen.getAllByRole("img");
        expect(images.length).toBeGreaterThan(0);
    });

    test("should render post without banner", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        expect(screen.getByText("Test Post")).toBeInTheDocument();
    });

    test("should render post with timecode", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01" timecode="5 min read">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        expect(screen.getByText("5 min read")).toBeInTheDocument();
    });

    test("should render scroll indicator link", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        const link = screen.getByLabelText("Scroll to post content");
        expect(link).toHaveAttribute("href", "#postContent");
    });

    test("should render post content section", () => {
        const { container } = render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        const contentSection = container.querySelector("#postContent");
        expect(contentSection).toBeInTheDocument();
    });

    test("should render footer", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );

        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
});
