import { sanitizeHtml } from "@portfolio/ui";
import type { MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderData } from "~/routes/api.portfolio.$slug";
import { Hero } from "~/widgets/hero";

export { loader } from "~/routes/api.portfolio.$slug";

export const meta: MetaFunction = (args) => {
    const data = args.data as LoaderData | undefined;
    return [
        {
            name: "description",
            content: data?.intro,
        },
        { title: data?.title },
    ];
};

export default function Portfolio_Slug() {
    const data = useLoaderData<LoaderData>();

    const img = data.images?.[0]?.url;

    return (
        <>
            <div className="m-auto max-w-3xl">
                <Hero className="py-20 md:py-40" copy={data.company} highlight={data.title} tag="h1" />
            </div>

            {img && (
                <img
                    alt={data.title}
                    className="mt-0 mb-20 w-full border-color-border border-t border-b"
                    height="auto"
                    loading="eager"
                    src={img}
                    style={{ aspectRatio: "2/1" }}
                    width="100%"
                />
            )}
            {data.content && (
                <div className="relative m-auto flex max-w-3xl flex-col">
                    <div
                        className="wysiwyg px-4"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content.html) }}
                    />
                </div>
            )}

            <div className="relative m-auto mb-20 flex max-w-3xl flex-col">
                <blockquote>{data.intro}</blockquote>
            </div>

            <div className="bg-color-background-dark py-20 text-color-background-light">
                <div className="mx-auto flex max-w-6xl flex-col gap-20 md:flex-row">
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <h3 className="mb-4 font-extrabold text-lg">Testing another article</h3>
                        <Link to="/portfolio">Read more {">>"}</Link>
                    </div>

                    <div className="border-0 border-solid md:border-l md:border-l-color-border" />

                    <div className="flex flex-1 flex-col items-center justify-center">
                        <h3 className="mb-4 font-extrabold text-lg">Testing another article</h3>
                        <Link to="/portfolio">Read more {">>"}</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
