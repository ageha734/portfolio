import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionEducation } from "./SectionEducation";

describe("SectionEducation Component", () => {
    test("should render education section", () => {
        render(<SectionEducation />);

        const heading = screen.getByText("Education");
        expect(heading).toBeInTheDocument();
    });

    test("should render university name", () => {
        render(<SectionEducation />);

        const university = screen.getByText("San Francisco State University");
        expect(university).toBeInTheDocument();
    });

    test("should render degree information", () => {
        render(<SectionEducation />);

        const degree = screen.getByText(/Industrial Design/i);
        expect(degree).toBeInTheDocument();
    });

    test("should render list items", () => {
        render(<SectionEducation />);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBeGreaterThan(0);
    });
});
