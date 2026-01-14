import { Tags } from "./Tags";
import "~/tailwind.css";

export default {
	title: "components/Tags",
	component: Tags,
};

export const Default = () => (
	<Tags tags={["React", "TypeScript", "TailwindCSS"]} />
);

export const WithHeading = () => (
	<Tags heading="Technologies" tags={["React", "TypeScript", "TailwindCSS"]} />
);

export const CustomStyling = () => (
	<Tags
		className="p-4"
		classNameTag="bg-primary text-primary-foreground px-2 py-1 rounded"
		tags={["React", "TypeScript", "TailwindCSS"]}
	/>
);
