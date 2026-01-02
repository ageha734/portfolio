import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShareButton } from "./ShareButton";

const mockOnShare = vi.fn();

vi.mock("~/shared/hooks/useWebShareAPI", () => ({
    useWebShareAPI: vi.fn(() => ({
        isAvailable: true,
        onShare: mockOnShare,
    })),
}));

describe("ShareButton Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(navigator, "share", {
            value: vi.fn(),
            writable: true,
        });
    });

    test("should render share button when Web Share API is available", () => {
        render(<ShareButton />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    test("should render share icon", () => {
        render(<ShareButton />);

        const icon = screen.getByAltText("Share");
        expect(icon).toBeInTheDocument();
    });

    test("should call onShare when button is clicked", () => {
        render(<ShareButton />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockOnShare).toHaveBeenCalledWith("https://mattscholta.com/resume");
        expect(mockOnShare).toHaveBeenCalledTimes(1);
    });

    test("should have correct button classes", () => {
        render(<ShareButton />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("ui-btn");
        expect(button).toHaveClass("custom-bg-gradient");
    });
});
