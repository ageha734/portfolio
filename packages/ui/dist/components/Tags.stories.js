import { jsx as _jsx } from "react/jsx-runtime";
import { Tags } from "./Tags";
import "~/tailwind.css";
export default {
    title: "components/Tags",
    component: Tags,
};
export const Default = () => _jsx(Tags, { tags: ["React", "TypeScript", "TailwindCSS"] });
export const WithHeading = () => _jsx(Tags, { heading: "Technologies", tags: ["React", "TypeScript", "TailwindCSS"] });
export const CustomStyling = () => (_jsx(Tags, { className: "p-4", classNameTag: "bg-primary text-primary-foreground px-2 py-1 rounded", tags: ["React", "TypeScript", "TailwindCSS"] }));
