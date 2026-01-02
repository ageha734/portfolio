import { expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppShareLink } from "./AppShareButton";

const mockOnShare = vi.fn();

vi.mock("~/hooks/useWebShareAPI", () => ({
    useWebShareAPI: vi.fn(),
}));

describe("AppShareButton Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render share button when Web Share API is available", async () => {
        const { useWebShareAPI } = await import("~/hooks/useWebShareAPI");
        vi.mocked(useWebShareAPI).mockReturnValue({
            isAvailable: true,
            onShare: mockOnShare,
        });

        render(<AppShareLink />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(screen.getByAltText("Share")).toBeInTheDocument();
    });

    test("should not render when Web Share API is not available", async () => {
        const { useWebShareAPI } = await import("~/hooks/useWebShareAPI");
        vi.mocked(useWebShareAPI).mockReturnValue({
            isAvailable: false,
            onShare: mockOnShare,
        });

        const { container } = render(<AppShareLink />);
        expect(container.firstChild).toBeNull();
    });

    test("should call onShare when button is clicked", async () => {
        const { useWebShareAPI } = await import("~/hooks/useWebShareAPI");
        vi.mocked(useWebShareAPI).mockReturnValue({
            isAvailable: true,
            onShare: mockOnShare,
        });

        render(<AppShareLink />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockOnShare).toHaveBeenCalledWith("https://mattscholta.com/resume");
    });
});
