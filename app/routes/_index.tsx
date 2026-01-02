import type { MetaFunction } from "@remix-run/react";
import * as React from "react";
import { Hero } from "~/widgets/hero";
import { getQuote } from "~/routes/api.qualities";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "~/shared/config/constants";
import { SectionAmbitions, SectionCompanies, SectionTechnology } from "~/widgets/sections";

export const meta: MetaFunction = (args) => {
    const data = args.data as { canonical?: string } | undefined;
    return [
        {
            title: `${SITE_TITLE}`,
        },
        {
            name: "description",
            content: SITE_DESCRIPTION,
        },
        {
            tagName: "link",
            rel: "canonical",
            href: data?.canonical,
        },
    ];
};

export default function Index() {
    // Hooks
    const [heading, setHeading] = React.useState("A Software Engineer");

    const onClick = () => {
        const data = getQuote(heading);
        setHeading(data);
    };

    return (
        <>
            <div className="relative">
                <section className="relative z-0 m-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-4 py-20 md:flex-row md:py-40">
                    <Hero
                        className="py-10 md:py-20 md:text-right"
                        copy={<span className="whitespace-nowrap">{heading}</span>}
                        highlight={SITE_AUTHOR}
                        tag="h1"
                    />
                    <div>
                        <button
                            className="custom-bg-gradient aspect-square max-h-32 cursor-pointer overflow-hidden rounded-full p-1 transition-transform hover:scale-110 active:rotate-6 md:max-h-40"
                            onClick={onClick}
                            type="button"
                        >
                            <img
                                alt={SITE_AUTHOR}
                                height="auto"
                                loading="eager"
                                src="/images/assets/matt-scaled.webp"
                                width="auto"
                            />
                        </button>
                    </div>
                </section>
            </div>
            <section className="border-0 border-b border-t border-solid border-color-border bg-color-background-light px-8 py-20 text-color-background-dark md:px-0">
                <blockquote className="mx-auto my-20 max-w-4xl text-2xl font-normal md:my-40 md:text-3xl">
                    Passionate about <b>quality code</b> written <b>for humans</b>, unlocking{" "}
                    <b>developer productivity</b>, and creating a delightful <b>user experience</b>.
                </blockquote>
            </section>
            <SectionAmbitions />
            <section className="bg-color-background-dark py-20 text-color-background-light">
                <SectionTechnology />
            </section>
            <SectionCompanies />
        </>
    );
}
