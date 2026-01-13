import { BlogPreview } from "./BlogPreview";
import "~/tailwind.css";

export default {
    title: "features/blog-preview/BlogPreview",
};

export const Default = () => (
    <BlogPreview
        date="2023-10-15"
        slug="sample-blog-post"
        title="Sample Blog Post"
        image="https://picsum.photos/800/600"
    />
);

export const WithH2Heading = () => (
    <BlogPreview
        date="2023-10-15"
        slug="sample-blog-post"
        title="Sample Blog Post with H2"
        image="https://picsum.photos/800/600?random=2"
        heading="h2"
    />
);

export const WithClassName = () => (
    <BlogPreview
        className="max-w-md"
        date="2023-10-15"
        slug="styled-post"
        title="Styled Blog Post"
        image="https://picsum.photos/800/600?random=3"
    />
);

export const MultiplePosts = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BlogPreview
            date="2023-10-15"
            slug="post-1"
            title="First Blog Post"
            image="https://picsum.photos/800/600?random=4"
        />
        <BlogPreview
            date="2023-09-20"
            slug="post-2"
            title="Second Blog Post"
            image="https://picsum.photos/800/600?random=5"
        />
        <BlogPreview
            date="2023-08-10"
            slug="post-3"
            title="Third Blog Post"
            image="https://picsum.photos/800/600?random=6"
        />
    </div>
);
