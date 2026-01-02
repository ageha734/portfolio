import { cn } from "~/shared/ui/cn";
import type { HeroProps } from "../model/types";

export const Hero = (props: HeroProps) => {
    const { className, copy, highlight, tag: Tag = "h2" } = props;

    return (
        <div className={cn("p-4 text-center leading-tight", className)}>
            <Tag className="inline-block font-serif text-xl font-extrabold md:text-4xl">
                {copy && <div className="font-mono text-base font-normal md:text-2xl">{copy}</div>}
                <div className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent px-3 text-4xl md:text-7xl leading-tight tracking-tight">
                    {highlight}
                </div>
            </Tag>
        </div>
    );
};
