import { BlogUpcoming } from "./BlogUpcoming";
import "~/styles/index.css";

export default {
    title: "features/blog-preview/BlogUpcoming",
};

export const Default = () => <BlogUpcoming />;

export const WithClassName = () => (
    <BlogUpcoming className="max-w-md bg-gray-100 dark:bg-gray-800 p-4 rounded-lg" />
);
