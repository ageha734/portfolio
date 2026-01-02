import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator Component", () => {
    test("should render Separator with default props", () => {
        const { container } = render(<Separator />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("shrink-0", "bg-border", "h-[1px]", "w-full");
    });

    test("should render horizontal separator by default", () => {
        const { container } = render(<Separator />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toHaveAttribute("orientation", "horizontal");
        expect(separator).toHaveClass("h-[1px]", "w-full");
    });

    test("should render vertical separator", () => {
        const { container } = render(<Separator orientation="vertical" />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toHaveAttribute("orientation", "vertical");
        expect(separator).toHaveClass("h-full", "w-[1px]");
    });

    test("should be decorative by default", () => {
        const { container } = render(<Separator />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toHaveAttribute("decorative", "true");
    });

    test("should not be decorative when decorative is false", () => {
        const { container } = render(<Separator decorative={false} />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toHaveAttribute("decorative", "false");
    });

    test("should apply custom className", () => {
        const { container } = render(<Separator className="custom-separator" />);

        const separator = container.querySelector('[role="separator"]');
        expect(separator).toHaveClass("custom-separator");
    });

    test("should render with both orientations", () => {
        const { container: container1, unmount: unmount1 } = render(<Separator orientation="horizontal" />);
        const separator1 = container1.querySelector('[role="separator"]');
        expect(separator1).toHaveAttribute("orientation", "horizontal");
        unmount1();

        const { container: container2 } = render(<Separator orientation="vertical" />);
        const separator2 = container2.querySelector('[role="separator"]');
        expect(separator2).toHaveAttribute("orientation", "vertical");
    });
});
