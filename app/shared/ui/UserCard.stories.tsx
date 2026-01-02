import { UserCard } from "./UserCard";
import "~/styles/index.css";

export default {
    title: "shared/ui/UserCard",
};

export const Default = () => (
    <UserCard
        image="https://avatars.githubusercontent.com/u/1?v=4"
        copy="Software Engineer"
    />
);

export const WithAlt = () => (
    <UserCard
        alt="Profile picture"
        image="https://avatars.githubusercontent.com/u/1?v=4"
        copy="Full Stack Developer"
    />
);

export const WithClassName = () => (
    <UserCard
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
        image="https://avatars.githubusercontent.com/u/1?v=4"
        copy="Frontend Engineer"
    />
);

export const WithHtmlCopy = () => (
    <UserCard
        image="https://avatars.githubusercontent.com/u/1?v=4"
        copy="<strong>Senior</strong> Software Engineer · <em>Tokyo, Japan</em>"
    />
);
