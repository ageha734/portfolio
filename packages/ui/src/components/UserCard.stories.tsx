import { UserCard } from "./UserCard";
import "~/tailwind.css";

export default {
    title: "components/UserCard",
    component: UserCard,
};

export const Default = () => (
    <UserCard alt="User avatar" author="John Doe" copy="Software Developer" image="https://via.placeholder.com/40" />
);

export const WithoutAuthor = () => (
    <UserCard alt="User avatar" copy="Software Developer" image="https://via.placeholder.com/40" />
);

export const WithHTMLContent = () => (
    <UserCard
        alt="User avatar"
        author="John Doe"
        copy="<strong>Software Developer</strong> at <em>Example Corp</em>"
        image="https://via.placeholder.com/40"
    />
);
