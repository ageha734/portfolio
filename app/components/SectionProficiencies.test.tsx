import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionProficiencies } from "./SectionProficiencies";

describe("SectionProficiencies Component", () => {
    test("should render proficiencies section", () => {
        render(<SectionProficiencies />);

        const heading = screen.getByText("Proficiencies");
        expect(heading).toBeInTheDocument();
    });

    test("should render description text", () => {
        render(<SectionProficiencies />);

        const text = screen.getByText(/Not saying I am an "expert"/);
        expect(text).toBeInTheDocument();
    });

    test("should render proficiency cards", () => {
        render(<SectionProficiencies />);

        const devops = screen.getByText("DevOps");
        expect(devops).toBeInTheDocument();
    });

    test("should have correct section structure", () => {
        const { container } = render(<SectionProficiencies />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });
});
