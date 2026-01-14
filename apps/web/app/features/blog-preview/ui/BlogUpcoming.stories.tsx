import { BlogUpcoming } from "./BlogUpcoming";
import "~/tailwind.css";

export default {
	title: "features/blog-preview/BlogUpcoming",
};

export const Default = () => <BlogUpcoming />;

export const WithClassName = () => (
	<BlogUpcoming className="max-w-md rounded-lg bg-gray-100 p-4 dark:bg-gray-800" />
);
