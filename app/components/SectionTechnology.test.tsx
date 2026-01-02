import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SectionTechnology } from "./SectionTechnology";

describe("SectionTechnology Component", () => {
    test("should render technology section", () => {
        render(<SectionTechnology />);

        const heading = screen.getByText(/Technology/);
        expect(heading).toBeInTheDocument();
    });

    test("should render technology buttons", () => {
        render(<SectionTechnology />);

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    test("should show description when button is clicked", () => {
        const { container } = render(<SectionTechnology />);

        const buttons = screen.getAllByRole("button");
        const firstButton = buttons[0];

        fireEvent.click(firstButton);

        const blockquote = container.querySelector("blockquote");
        expect(blockquote).toBeInTheDocument();
    });

    test("should toggle description when same button is clicked twice", () => {
        render(<SectionTechnology />);

        const buttons = screen.getAllByRole("button");
        const firstButton = buttons[0];
        const initialClassName = firstButton.className;

        fireEvent.click(firstButton);
        const afterFirstClick = firstButton.className;
        expect(afterFirstClick).not.toBe(initialClassName);

        fireEvent.click(firstButton);
        const afterSecondClick = firstButton.className;
        expect(afterSecondClick).toBe(initialClassName);
    });
});
