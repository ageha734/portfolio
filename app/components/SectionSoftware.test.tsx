import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionSoftware } from "./SectionSoftware";

describe("SectionSoftware Component", () => {
    test("should render software section", () => {
        render(<SectionSoftware />);

        const heading = screen.getByText(/Software/);
        expect(heading).toBeInTheDocument();
    });

    test("should render software links", () => {
        render(<SectionSoftware />);

        const vscodeLink = screen.getByText(/Visual Studio Code/);
        expect(vscodeLink).toBeInTheDocument();
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionSoftware />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });
});
