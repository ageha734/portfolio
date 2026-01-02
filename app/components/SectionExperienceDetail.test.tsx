import { expect, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionExperienceDetail } from "./SectionExperienceDetail";
import type { SectionExperienceDetailProps } from "./SectionExperienceDetail";

describe("SectionExperienceDetail Component", () => {
    let props: SectionExperienceDetailProps;

    beforeEach(() => {
        props = {
            experience: {
                company: "Test Company",
                companyUrl: "https://test.com",
                date: "2020-2024",
                dateRange: [new Date("2020-01-01"), new Date("2024-01-01")],
                description: "<p>Test description</p>",
                highlights: ["Highlight 1", "Highlight 2"],
                tags: ["React", "TypeScript"],
                title: "Software Engineer",
            },
        };
    });

    test("should render company name", () => {
        render(<SectionExperienceDetail {...props} />);

        const company = screen.getByText("Test Company");
        expect(company).toBeInTheDocument();
    });

    test("should render job title", () => {
        render(<SectionExperienceDetail {...props} />);

        const title = screen.getByText("Software Engineer");
        expect(title).toBeInTheDocument();
    });

    test("should render date", () => {
        render(<SectionExperienceDetail {...props} />);

        const date = screen.getByText("2020-2024");
        expect(date).toBeInTheDocument();
    });

    test("should render highlights", () => {
        render(<SectionExperienceDetail {...props} />);

        const highlight1 = screen.getByText("Highlight 1");
        const highlight2 = screen.getByText("Highlight 2");
        expect(highlight1).toBeInTheDocument();
        expect(highlight2).toBeInTheDocument();
    });

    test("should render contract badge when contract is true", () => {
        props.experience.contract = true;

        render(<SectionExperienceDetail {...props} />);

        const contract = screen.getByText("(contract)");
        expect(contract).toBeInTheDocument();
    });
});
