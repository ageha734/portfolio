import type { ReactNode, ComponentProps } from "react";
import { forwardRef, useRef, useEffect, useState } from "react";
import { Button } from "~/shared/ui/button";
import { cn } from "~/shared/lib/cn";

const initDelay = 300;

export interface ProjectHeaderProps {
    readonly title: string;
    readonly description: string;
    readonly linkLabel?: string;
    readonly url?: string;
    readonly roles?: readonly string[];
    readonly className?: string;
}

export function ProjectHeader({
    title,
    description,
    linkLabel = "Visit website",
    url,
    roles,
    className,
}: ProjectHeaderProps) {
    return (
        <section className={cn("relative w-full", className)}>
            <div className="flex flex-col items-center justify-center gap-8 p-12 md:p-20">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-extrabold">{title}</h1>
                    <p className="text-lg text-muted-foreground">{description}</p>
                    {!!url && (
                        <Button asChild className="w-fit mt-4">
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                {linkLabel}
                            </a>
                        </Button>
                    )}
                </div>
                {!!roles?.length && (
                    <ul className="flex flex-wrap gap-4 mt-8">
                        {roles.map((role, index) => (
                            <li
                                className="px-4 py-2 bg-muted rounded-md text-sm animate-in fade-in slide-in-from-bottom-4"
                                style={{
                                    animationDelay: `${initDelay + 300 + index * 140}ms`,
                                    animationFillMode: "forwards",
                                }}
                                key={role}
                            >
                                <span>{role}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export interface ProjectContainerProps extends ComponentProps<"article"> {
    readonly className?: string;
}

export const ProjectContainer = ({ className, ...rest }: ProjectContainerProps) => (
    <article className={cn("relative w-full flex flex-col items-center justify-center", className)} {...rest} />
);

export interface ProjectSectionProps extends ComponentProps<"section"> {
    readonly className?: string;
    readonly light?: boolean;
    readonly padding?: "both" | "top" | "bottom" | "none";
    readonly fullHeight?: boolean;
    readonly backgroundOverlayOpacity?: number;
    readonly backgroundElement?: ReactNode;
    readonly children: ReactNode;
}

export const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
    (
        {
            className,
            light,
            padding = "both",
            fullHeight,
            backgroundOverlayOpacity = 0.9,
            backgroundElement,
            children,
            ...rest
        },
        ref
    ) => {
        const paddingClasses = {
            both: "py-12 md:py-20 lg:py-24",
            top: "pt-12 md:pt-20 lg:pt-24",
            bottom: "pb-12 md:pb-20 lg:pb-24",
            none: "",
        };

        return (
            <section
                className={cn(
                    "w-full relative grid",
                    fullHeight && "min-h-screen",
                    light && "bg-muted",
                    className,
                )}
                ref={ref}
                {...rest}
            >
                {!!backgroundElement && (
                    <div className="grid-area-[1/1] opacity-[var(--opacity)]" style={{ "--opacity": backgroundOverlayOpacity } as React.CSSProperties}>
                        {backgroundElement}
                    </div>
                )}
                <div className={cn("grid-area-[1/1] flex flex-col items-center justify-center relative", paddingClasses[padding])}>
                    {children}
                </div>
            </section>
        );
    }
);

ProjectSection.displayName = "ProjectSection";

export interface ProjectBackgroundProps extends ComponentProps<"img"> {
    readonly opacity?: number;
    readonly className?: string;
    readonly src?: string;
    readonly alt?: string;
}

export const ProjectBackground = ({ opacity = 0.7, className, src, alt = "", ...rest }: ProjectBackgroundProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current) return;
            const scrollY = window.scrollY;
            const offset = scrollY * 0.6;
            imageRef.current.style.setProperty("--offset", `${offset}px`);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)}>
            <div className="absolute inset-0 translate-y-[var(--offset,0px)]" ref={imageRef}>
                {src && (
                    <img
                        src={src}
                        alt={alt}
                        role="presentation"
                        className="object-cover w-full h-full"
                        {...rest}
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-black/70" style={{ opacity }} />
        </div>
    );
};

export interface ProjectImageProps extends ComponentProps<"img"> {
    readonly className?: string;
    readonly alt: string;
    readonly src?: string;
}

export const ProjectImage = ({ className, alt, src, ...rest }: ProjectImageProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn("w-full", className)}>
            {src && (
                <img
                    src={src}
                    alt={alt}
                    className={cn(
                        "w-full h-auto transition-opacity duration-300",
                        visible ? "opacity-100" : "opacity-0",
                    )}
                    {...rest}
                />
            )}
        </div>
    );
};

export interface ProjectSectionContentProps extends ComponentProps<"div"> {
    readonly className?: string;
    readonly width?: "s" | "m" | "l" | "xl";
}

const widthClasses = {
    s: "max-w-md",
    m: "max-w-2xl",
    l: "max-w-4xl",
    xl: "max-w-6xl",
};

export const ProjectSectionContent = ({ className, width = "l", ...rest }: ProjectSectionContentProps) => (
    <div className={cn("w-full mx-auto px-4", widthClasses[width], className)} {...rest} />
);

export interface ProjectSectionHeadingProps extends ComponentProps<"h1"> {
    readonly className?: string;
    readonly level?: number;
    readonly as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const ProjectSectionHeading = ({ className, level = 3, as: As = "h2", children, ...rest }: ProjectSectionHeadingProps) => (
    <As className={cn("text-3xl md:text-4xl font-serif font-extrabold mb-4", className)} {...rest}>
        {children}
    </As>
);

export interface ProjectSectionTextProps extends ComponentProps<"p"> {
    readonly className?: string;
}

export const ProjectSectionText = ({ className, children, ...rest }: ProjectSectionTextProps) => (
    <p className={cn("text-base md:text-lg text-muted-foreground mb-4", className)} {...rest}>
        {children}
    </p>
);

export interface ProjectTextRowProps extends ComponentProps<"div"> {
    readonly center?: boolean;
    readonly stretch?: boolean;
    readonly justify?: "center" | "start" | "end" | "space-between";
    readonly width?: "s" | "m" | "l" | "xl";
    readonly noMargin?: boolean;
    readonly className?: string;
    readonly centerMobile?: boolean;
}

const justifyClasses = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    "space-between": "justify-between",
};

export const ProjectTextRow = ({
    center,
    stretch,
    justify = "center",
    width = "m",
    noMargin,
    className,
    centerMobile,
    ...rest
}: ProjectTextRowProps) => (
    <div
        className={cn(
            "flex flex-col md:flex-row gap-4",
            justifyClasses[justify],
            center && "items-center",
            stretch && "items-stretch",
            centerMobile && "md:items-center",
            !noMargin && "mb-8",
            widthClasses[width],
            className,
        )}
        {...rest}
    />
);

export interface ProjectSectionColumnsProps extends ProjectSectionContentProps {
    readonly centered?: boolean;
}

export const ProjectSectionColumns = ({ className, centered, ...rest }: ProjectSectionColumnsProps) => (
    <ProjectSectionContent className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", centered && "items-center", className)} {...rest} />
);
