import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHardware } from "./SectionHardware";

describe("SectionHardware Component", () => {
    test("should render hardware section", () => {
        render(<SectionHardware />);

        const heading = screen.getByText(/Hardware/);
        expect(heading).toBeInTheDocument();
    });

    test("should render description text", () => {
        render(<SectionHardware />);

        const text = screen.getByText(/I've been happily developing on a Mac/);
        expect(text).toBeInTheDocument();
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionHardware />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });
});
