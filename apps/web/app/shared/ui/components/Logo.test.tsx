import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Logo } from "./Logo";

describe("Logo Component", () => {
    test("should render logo with default props", () => {
        const { container } = render(<Logo />);

        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute("height", "59");
        expect(svg).toHaveAttribute("viewBox", "0 0 100 59");
        expect(svg).toHaveClass("logo");
    });

    test("should render logo with custom height", () => {
        const { container } = render(<Logo height={100} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("height", "100");
    });

    test("should render logo with custom className", () => {
        const { container } = render(<Logo className="custom-logo" />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveClass("logo", "custom-logo");
    });

    test("should render logo with custom fill", () => {
        const { container } = render(<Logo fill="#ff0000" />);

        const path = container.querySelector("path");
        expect(path).toHaveAttribute("fill", "#ff0000");
    });

    test("should render logo with empty fill by default", () => {
        const { container } = render(<Logo />);

        const path = container.querySelector("path");
        expect(path).toHaveAttribute("fill", "");
    });

    test("should render logo path with correct attributes", () => {
        const { container } = render(<Logo />);

        const path = container.querySelector("path");
        expect(path).toBeInTheDocument();
        // pathが描画データを持つことを確認
        expect(path).toHaveAttribute("d");
    });
});
