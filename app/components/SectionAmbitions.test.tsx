import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionAmbitions } from "./SectionAmbitions";

describe("SectionAmbitions Component", () => {
    test("should render ambitions section", () => {
        render(<SectionAmbitions />);

        const heading = screen.getByText(/Ambitions/);
        expect(heading).toBeInTheDocument();
    });

    test("should render content text", () => {
        render(<SectionAmbitions />);

        const content = screen.getByText(/15\+/);
        expect(content).toBeInTheDocument();
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionAmbitions />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
        expect(section?.className).toContain("mx-auto");
    });
});
