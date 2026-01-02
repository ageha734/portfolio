import { BlogFeatured } from "./BlogFeatured";
import type { Post } from "~/entities/blog";
import "~/styles/index.css";

export default {
    title: "features/blog-preview/BlogFeatured",
};

const samplePost: Post = {
    content: { html: "<p>Sample content</p>" },
    date: "2023-10-15",
    id: "1",
    imageTemp: "https://picsum.photos/800/600",
    slug: "sample-featured-post",
    sticky: true,
    tags: ["React", "TypeScript"],
    title: "Featured Blog Post",
};

export const Default = () => <BlogFeatured post={samplePost} />;

export const WithClassName = () => (
    <BlogFeatured className="max-w-lg" post={samplePost} />
);

export const MultipleFeatured = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlogFeatured post={samplePost} />
        <BlogFeatured
            post={{
                ...samplePost,
                id: "2",
                slug: "another-featured",
                title: "Another Featured Post",
                imageTemp: "https://picsum.photos/800/600?random=2",
            }}
        />
    </div>
);
