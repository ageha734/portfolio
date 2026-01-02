import type { LoaderData } from "~/shared/api/blog";
import type { MetaFunction } from "@remix-run/react";
import { Hero } from "~/widgets/hero";
import { BlogFeatured, BlogPreview, BlogUpcoming } from "~/features/blog-preview";
import { filterBlogPosts } from "~/shared/lib/blog";
import { SITE_AUTHOR, SITE_TITLE } from "~/shared/config/constants";
import { useLoaderData } from "@remix-run/react";

export { loader } from "~/shared/api/portfolio";

export const meta: MetaFunction = (args) => {
    return [
        {
            title: `A developers ramblings | ${SITE_TITLE}`,
        },
        {
            name: "description",
            content: `A collection of ramblings by ${SITE_AUTHOR}.`,
        },
    ];
};

export default function Blog() {
    const { posts, tags: _tags } = useLoaderData<LoaderData>();

    const data = filterBlogPosts(posts);

    return (
        <>
            <section className="bg-gradient-dark-- bg-color-background-dark text-color-background">
                <Hero
                    className="mx-auto max-w-6xl py-20 md:py-40"
                    copy="Yes, another blog..."
                    highlight="Developer ramblings"
                    tag="h1"
                />
            </section>

            <section className="section-full m-auto flex max-w-6xl flex-col items-center justify-center gap-20 px-4 py-20">
                <div className="flex flex-col gap-20 md:flex-row">
                    <BlogFeatured className="basis-2/3" post={data.technical.featured[0]} />
                    <BlogUpcoming className="basis-1/3" />
                </div>

                <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {data.technical.data.map((post) => (
                        <BlogPreview
                            content={post.content.html}
                            date={post.date}
                            heading="h2"
                            image={post.imageTemp}
                            key={post.id}
                            slug={post.slug}
                            title={post.title}
                        />
                    ))}
                </div>
            </section>

            <section className="section-full m-auto flex max-w-6xl flex-col items-center justify-center gap-20 px-4 py-20">
                <div>
                    <h2 className="mb-8 w-full text-left text-3xl">Do it yourself</h2>
                    <p>
                        You see and hear the acronym "DIY" everywhere, and you probably already know what it stands for:
                        "do it yourself." It's a pretty straightforward-sounding concept. Well, when I am not building
                        things with code, I love to work with my hands around the house. It's also amazing to share the
                        process and experience with my kids.
                    </p>
                </div>

                {data.diy.featured.length > 0 && (
                    <div className="flex flex-col gap-20 md:flex-row">
                        <BlogFeatured className="basis-2/3" post={data.diy.featured[0]} />
                    </div>
                )}

                <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {data.diy.data.map((post) => (
                        <BlogPreview
                            content={post.content.html}
                            date={post.date}
                            heading="h2"
                            image={post.imageTemp}
                            key={post.id}
                            slug={post.slug}
                            title={post.title}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
