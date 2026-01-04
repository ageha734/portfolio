import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Post } from "./Post";

vi.mock("~/hooks", () => ({
    useScrollToHash: vi.fn().mockImplementation(() => ({
        scrollTo: vi.fn(),
    })),
    useParallax: vi.fn().mockReturnValue({ transform: "translateY(0px)" }),
}));

vi.mock("~/widgets/footer", () => ({
    Footer: () => <footer data-testid="mock-footer">Footer</footer>,
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

    test("should render scroll indicator link", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );
        const link = screen.getByLabelText(/scroll/i);
        expect(link).toHaveAttribute("href", "#postContent");
    });

    test("should render footer", () => {
        render(
            <MemoryRouter>
                <Post title="Test Post" date="2024-01-01">
                    <p>Post content</p>
                </Post>
            </MemoryRouter>,
        );
        expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    });
});
