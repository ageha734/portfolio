import type { MetaFunction } from "@remix-run/react";
import { SITE_TITLE } from "~/shared/config/constants";
import { Hero } from "~/widgets/hero";
import { SandboxSidebar } from "~/widgets/sandbox";

export const meta: MetaFunction = (_args) => {
    return [
        {
            title: `Sandbox | ${SITE_TITLE}`,
        },
        {
            name: "description",
            content: "A Sandbox for Remix-Run and various web experiments.",
        },
    ];
};

export default function Sandbox() {
    return (
        <section className="bg-color-background-dark bg-gradient-dark-- text-color-background">
            <Hero
                className="mx-auto max-w-6xl py-20 md:py-40"
                copy="Developer sandbox 🏖️"
                highlight="A place to explore"
                tag="h1"
            />
            <div className="flex">
                <div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni deleniti sunt aliquam animi
                        corrupti quod dolorem libero obcaecati id harum similique iste iure, velit perspiciatis dolores
                        nisi veniam. Eligendi, eum!
                    </p>
                </div>
                <SandboxSidebar />
            </div>
        </section>
    );
}
