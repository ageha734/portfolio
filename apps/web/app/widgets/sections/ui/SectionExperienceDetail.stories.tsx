import type { Experience } from "~/entities/user";
import { SectionExperienceDetail } from "./SectionExperienceDetail";
import "~/tailwind.css";

export default {
    title: "widgets/sections/SectionExperienceDetail",
};

const mockExperience: Experience = {
    company: "Example Company",
    companyUrl: "https://example.com",
    title: "Senior Software Engineer",
    date: "2020 - Present",
    dateRange: [new Date("2020-01-01"), new Date()],
    description: "<p>Led development of multiple web applications using modern technologies.</p>",
    highlights: [
        "Built scalable frontend applications with React and TypeScript",
        "Implemented CI/CD pipelines for automated deployments",
        "Mentored junior developers and conducted code reviews",
    ],
    image: "/images/svg/example.svg",
    contract: false,
    tags: ["TypeScript", "React", "Node.js"],
};

export const Default = () => <SectionExperienceDetail experience={mockExperience} />;

export const WithContract = () => (
    <SectionExperienceDetail
        experience={{
            ...mockExperience,
            contract: true,
        }}
    />
);

export const WithoutImage = () => (
    <SectionExperienceDetail
        experience={{
            ...mockExperience,
            image: undefined,
        }}
    />
);

export const WithDateRange = () => (
    <SectionExperienceDetail
        experience={{
            ...mockExperience,
            date: "2018 - 2020",
            dateRange: [new Date("2018-01-01"), new Date("2020-12-31")],
        }}
    />
);

export const CurrentPosition = () => (
    <SectionExperienceDetail
        experience={{
            ...mockExperience,
            date: "2022 - Present",
            dateRange: [new Date("2022-01-01")],
        }}
    />
);
