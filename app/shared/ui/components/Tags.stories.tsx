import { Tags } from "./Tags";
import "~/tailwind.css";

export default {
    title: "shared/ui/Tags",
};

const sampleTags = ["React", "TypeScript", "Remix", "Tailwind CSS", "Vite"];

export const Default = () => <Tags tags={sampleTags} />;

export const WithHeading = () => <Tags heading="Technologies" tags={sampleTags} />;

export const WithClassName = () => (
    <Tags className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg" tags={sampleTags} />
);

export const WithTagClassName = () => (
    <Tags
        tags={sampleTags}
        classNameTag="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
    />
);

export const SingleTag = () => <Tags tags={["React"]} />;

export const ManyTags = () => (
    <Tags
        heading="All Skills"
        tags={[
            "React",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Python",
            "Go",
            "Rust",
            "Docker",
            "Kubernetes",
            "AWS",
            "GCP",
            "Azure",
        ]}
        classNameTag="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
    />
);
