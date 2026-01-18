import { jsx as _jsx } from "react/jsx-runtime";
import { UserCard } from "./UserCard";
import "~/tailwind.css";
export default {
    title: "components/UserCard",
    component: UserCard,
};
export const Default = () => (_jsx(UserCard, { alt: "User avatar", author: "John Doe", copy: "Software Developer", image: "https://via.placeholder.com/40" }));
export const WithoutAuthor = () => (_jsx(UserCard, { alt: "User avatar", copy: "Software Developer", image: "https://via.placeholder.com/40" }));
export const WithHTMLContent = () => (_jsx(UserCard, { alt: "User avatar", author: "John Doe", copy: "<strong>Software Developer</strong> at <em>Example Corp</em>", image: "https://via.placeholder.com/40" }));
