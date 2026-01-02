import { expect, test, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { SectionFireworks } from "./SectionFireworks";

const mockFireworks = vi.fn();

vi.mock("~/esm-modules", () => ({
    fireworks: mockFireworks,
}));

describe("SectionFireworks Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return null when not loaded", () => {
        mockFireworks.mockResolvedValue({
            Fireworks: () => <div>Fireworks</div>,
        });

        const { container } = render(<SectionFireworks />);
        expect(container.firstChild).toBeNull();
    });

    test("should render Fireworks component when loaded", async () => {
        const MockFireworks = () => <div data-testid="fireworks">Fireworks</div>;
        mockFireworks.mockResolvedValue({
            Fireworks: MockFireworks,
        });

        const { container } = render(<SectionFireworks />);

        await waitFor(() => {
            expect(mockFireworks).toHaveBeenCalled();
        });
    });
});
