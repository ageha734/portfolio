import { BlogPreview } from "./BlogPreview";
import type { Post } from "~/entities/blog";

export interface BlogFeaturedProps {
    className?: string;
    post: Post;
}

export const BlogFeatured = (props: BlogFeaturedProps) => {
    const { className, post } = props;

    return (
        <BlogPreview
            className={className}
            date={post.date}
            heading="h2"
            image={post.imageTemp}
            key={post.slug}
            slug={post.slug}
            title={post.title}
        />
    );
};
