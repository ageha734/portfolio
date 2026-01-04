import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Separator } from "./Separator";

describe("Separator Component", () => {
    test("should render Separator with default props", () => {
        const { container } = render(<Separator />);

        // Radix UIはdivを使用し、data-orientationを設定
        const separator = container.querySelector("[data-orientation]");
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("shrink-0", "bg-border", "h-[1px]", "w-full");
    });

    test("should render horizontal separator by default", () => {
        const { container } = render(<Separator />);

        const separator = container.querySelector('[data-orientation="horizontal"]');
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("h-[1px]", "w-full");
    });

    test("should render vertical separator", () => {
        const { container } = render(<Separator orientation="vertical" />);

        const separator = container.querySelector('[data-orientation="vertical"]');
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("h-full", "w-[1px]");
    });

    test("should be decorative by default", () => {
        const { container } = render(<Separator />);

        // decorativeがtrueの場合、aria-hiddenが設定される
        const separator = container.querySelector("[data-orientation]");
        expect(separator).toBeInTheDocument();
    });

    test("should not be decorative when decorative is false", () => {
        const { container } = render(<Separator decorative={false} />);

        // decorativeがfalseの場合、role="separator"が設定される
        const separator = container.querySelector('[role="separator"]');
        expect(separator).toBeInTheDocument();
    });

    test("should apply custom className", () => {
        const { container } = render(<Separator className="custom-separator" />);

        const separator = container.querySelector("[data-orientation]");
        expect(separator).toHaveClass("custom-separator");
    });

    test("should render with both orientations", () => {
        const { container: container1, unmount: unmount1 } = render(<Separator orientation="horizontal" />);
        const separator1 = container1.querySelector('[data-orientation="horizontal"]');
        expect(separator1).toBeInTheDocument();
        unmount1();

        const { container: container2 } = render(<Separator orientation="vertical" />);
        const separator2 = container2.querySelector('[data-orientation="vertical"]');
        expect(separator2).toBeInTheDocument();
    });
});
