import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import type { LoaderData } from "~/routes/api.blog.$slug";
import { Hero } from "~/widgets/hero";
import { Wysiwyg } from "~/shared/ui/Wysiwyg";
import { useLoaderData } from "@remix-run/react";
import stylesLines from "prismjs/plugins/line-numbers/prism-line-numbers.css";
import stylesTheme from "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: stylesLines },
        { rel: "stylesheet", href: stylesTheme },
    ];
};

export { loader } from "~/routes/api.blog.$slug";

export const meta: MetaFunction = (args) => {
    const data = args.data as LoaderData | undefined;
    return [
        {
            title: data?.title || "Blog | Post not found!",
        },
        {
            name: "description",
            content: data?.intro,
        },
        {
            tagName: "link",
            rel: "canonical",
            href: data?.images?.url,
        },
    ];
};

export default function Blog_Slug() {
    const data = useLoaderData<LoaderData>();

    const created = new Date(data.date);
    const date = created.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
        weekday: undefined,
        year: "numeric",
    });

    return (
        <>
            <section className="mx-auto max-w-6xl">
                <Hero className="py-20 md:py-40" copy={date} highlight={data.title} tag="h1" />
            </section>

            <img
                alt={data.title}
                className="w-full border-b border-t border-color-border-dark"
                height="auto"
                loading="eager"
                src={data.imageTemp}
                width="100%"
            />

            <section className="m-auto max-w-4xl">
                <div className="mb-20 p-4">
                    <div className="my-8 md:my-12 ">
                        <h2 className="text-highlight m-0 mb-2 inline-block text-left text-3xl md:text-4xl">
                            {data.title}
                        </h2>
                        <div className="font-font-monospace text-sm">{date}</div>
                    </div>

                    {/* Content */}
                    <Wysiwyg content={data.content.raw} />
                </div>
            </section>
        </>
    );
}
