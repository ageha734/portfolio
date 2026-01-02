import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionMisc } from "./SectionMisc";

describe("SectionMisc Component", () => {
    test("should render miscellaneous section", () => {
        render(<SectionMisc />);

        const heading = screen.getByText(/Miscellaneous/);
        expect(heading).toBeInTheDocument();
    });

    test("should render images", () => {
        const { container } = render(<SectionMisc />);

        const images = container.querySelectorAll("img");
        expect(images.length).toBeGreaterThan(0);
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionMisc />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });
});
