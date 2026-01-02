import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionCompanies } from "./SectionCompanies";

describe("SectionCompanies Component", () => {
    test("should render companies section", () => {
        render(<SectionCompanies />);

        const heading = screen.getByText(/Companies I've built things for/);
        expect(heading).toBeInTheDocument();
    });

    test("should render company images", () => {
        const { container } = render(<SectionCompanies />);

        const images = container.querySelectorAll("img");
        expect(images.length).toBeGreaterThan(0);
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionCompanies />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
        expect(section?.className).toContain("work-companies");
    });
});
