import type { MetaFunction } from "@remix-run/react";
import { Hero } from "~/widgets/hero";
import { SectionHardware, SectionMisc, SectionSoftware } from "~/widgets/sections";
import { SITE_TITLE } from "~/shared/config/constants";

export const meta: MetaFunction = (args) => {
    return [
        {
            title: `Uses | ${SITE_TITLE}`,
        },
        {
            name: "description",
            content: `Check out uses.tech for a list of more /uses pages!`,
        },
    ];
};

export default function Uses() {
    return (
        <>
            <section className="bg-color-background-dark text-color-background">
                <Hero className="py-20 md:py-40" copy="If you're curious" highlight="What I'm using" tag="h1" />
            </section>
            <SectionHardware />
            <div className="border-0 border-t border-solid border-t-color-border bg-color-background-light">
                <SectionSoftware />
            </div>
            <div className="bg-color-background-dark py-20 text-color-background-light">
                <SectionMisc />
            </div>
        </>
    );
}
