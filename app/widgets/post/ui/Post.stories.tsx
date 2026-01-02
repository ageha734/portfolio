import { MemoryRouter } from "react-router-dom";
import { Post } from "./Post";
import "~/styles/index.css";
import "./Post.module.css";

export default {
    title: "widgets/post/Post",
};

export const Default = () => (
    <MemoryRouter>
        <Post title="Sample Blog Post" date="2024-01-15">
            <p>This is a sample blog post content.</p>
        </Post>
    </MemoryRouter>
);

export const WithBanner = () => (
    <MemoryRouter>
        <Post
            title="Blog Post with Banner"
            date="2024-01-15"
            banner="/images/assets/sample-banner.jpg"
        >
            <p>This blog post includes a banner image.</p>
        </Post>
    </MemoryRouter>
);

export const WithTimecode = () => (
    <MemoryRouter>
        <Post title="Blog Post with Timecode" date="2024-01-15" timecode="5 min read">
            <p>This blog post includes a timecode indicating reading time.</p>
        </Post>
    </MemoryRouter>
);

export const WithBannerAndTimecode = () => (
    <MemoryRouter>
        <Post
            title="Complete Blog Post"
            date="2024-01-15"
            banner="/images/assets/sample-banner.jpg"
            timecode="10 min read"
        >
            <p>This blog post includes both a banner image and a timecode.</p>
            <p>It demonstrates the full feature set of the Post component.</p>
        </Post>
    </MemoryRouter>
);

export const LongContent = () => (
    <MemoryRouter>
        <Post title="Long Blog Post" date="2024-01-15">
            <p>This is a longer blog post with multiple paragraphs.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
            </p>
        </Post>
    </MemoryRouter>
);
