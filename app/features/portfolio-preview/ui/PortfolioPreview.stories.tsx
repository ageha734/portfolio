import { PortfolioPreview } from "./PortfolioPreview";
import type { Portfolio } from "~/entities/portfolio";
import "~/tailwind.css";

export default {
    title: "features/portfolio-preview/PortfolioPreview",
};

const samplePortfolio: Portfolio = {
    company: "Tech Company Inc.",
    current: false,
    date: "2023-06-15",
    slug: "sample-project",
    title: "Sample Project",
    overview: "A comprehensive web application built with modern technologies including React, TypeScript, and Node.js.",
    images: [
        { url: "https://picsum.photos/800/600" },
    ],
};

const currentPortfolio: Portfolio = {
    company: "Current Corp",
    current: true,
    date: new Date().toISOString(),
    slug: "current-project",
    title: "Current Project",
    overview: "An ongoing project focused on improving user experience and performance optimization.",
    images: [
        { url: "https://picsum.photos/800/600?random=2" },
    ],
};

export const Default = () => (
    <PortfolioPreview current={false} data={samplePortfolio} />
);

export const CurrentProject = () => (
    <PortfolioPreview current={true} data={currentPortfolio} />
);

export const WithoutImages = () => {
    const portfolioWithoutImages: Portfolio = {
        ...samplePortfolio,
        images: [],
    };
    return <PortfolioPreview current={false} data={portfolioWithoutImages} />;
};

export const MultipleProjects = () => (
    <div className="flex flex-col gap-8">
        <PortfolioPreview current={true} data={currentPortfolio} />
        <PortfolioPreview current={false} data={samplePortfolio} />
        <PortfolioPreview
            current={false}
            data={{
                ...samplePortfolio,
                title: "Another Project",
                company: "Another Company",
                slug: "another-project",
                date: "2022-03-20",
            }}
        />
    </div>
);
