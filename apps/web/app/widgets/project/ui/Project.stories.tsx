import {
    ProjectContainer,
    ProjectHeader,
    ProjectSection,
    ProjectSectionColumns,
    ProjectSectionContent,
    ProjectSectionHeading,
    ProjectSectionText,
    ProjectTextRow,
} from "./Project";
import "~/tailwind.css";

export default {
    title: "widgets/project/Project",
};

export const Header = () => (
    <ProjectHeader
        title="Project Title"
        description="This is a description of the project. It showcases the main features and objectives."
    />
);

export const HeaderWithUrl = () => (
    <ProjectHeader
        title="E-commerce Platform"
        description="A modern e-commerce platform built with React and Node.js"
        url="https://example.com"
        linkLabel="View Project"
    />
);

export const HeaderWithRoles = () => (
    <ProjectHeader
        title="Design System"
        description="A comprehensive design system for enterprise applications"
        roles={["UI Design", "Frontend Development", "Documentation"]}
    />
);

export const Section = () => (
    <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectSectionHeading>Section Heading</ProjectSectionHeading>
                <ProjectSectionText>
                    This is the section text content. It describes the details of this particular section.
                </ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);

export const SectionLight = () => (
    <ProjectContainer>
        <ProjectSection light>
            <ProjectSectionContent>
                <ProjectSectionHeading>Light Section</ProjectSectionHeading>
                <ProjectSectionText>This is a light themed section.</ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);

export const SectionWithPadding = () => (
    <ProjectContainer>
        <ProjectSection padding="top">
            <ProjectSectionContent>
                <ProjectSectionHeading>Top Padding Only</ProjectSectionHeading>
                <ProjectSectionText>This section only has top padding.</ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);

export const TextRow = () => (
    <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow center>
                    <ProjectSectionHeading>Centered Text Row</ProjectSectionHeading>
                    <ProjectSectionText>This text is centered in the row.</ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);

export const TextRowWidths = () => (
    <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow width="s">
                    <ProjectSectionText>Small width text row</ProjectSectionText>
                </ProjectTextRow>
                <ProjectTextRow width="m">
                    <ProjectSectionText>Medium width text row</ProjectSectionText>
                </ProjectTextRow>
                <ProjectTextRow width="l">
                    <ProjectSectionText>Large width text row</ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);

export const SectionColumns = () => (
    <ProjectContainer>
        <ProjectSection>
            <ProjectSectionColumns centered>
                <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h3 className="font-bold">Column 1</h3>
                    <p>First column content</p>
                </div>
                <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h3 className="font-bold">Column 2</h3>
                    <p>Second column content</p>
                </div>
            </ProjectSectionColumns>
        </ProjectSection>
    </ProjectContainer>
);

export const FullExample = () => (
    <ProjectContainer>
        <ProjectHeader
            title="Portfolio Website"
            description="A modern portfolio website showcasing creative work and technical skills"
            url="https://portfolio.example.com"
            roles={["Design", "Development", "Content Strategy"]}
        />
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow>
                    <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
                    <ProjectSectionText>
                        Creating a portfolio that effectively showcases work while maintaining excellent performance and
                        accessibility standards.
                    </ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light padding="both">
            <ProjectSectionContent>
                <ProjectTextRow center>
                    <ProjectSectionHeading>The Solution</ProjectSectionHeading>
                    <ProjectSectionText>
                        Built with modern technologies like React, Remix, and Tailwind CSS to deliver a fast and
                        responsive experience.
                    </ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>
);
