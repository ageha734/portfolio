import type { ReactNode, ComponentProps, CSSProperties } from "react";
import { forwardRef, useRef, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./project.module.css";

const initDelay = 300;
const DEFAULT_DURATION_MS = 300;

function classes(...args: (string | undefined | null | false)[]): string {
    return classnames(...args);
}

function cssProps(props: Record<string, number | string>): CSSProperties {
    return Object.fromEntries(
        Object.entries(props).map(([key, value]) => [
            key
                .split("")
                .map((char) => (char >= "A" && char <= "Z" ? `-${char.toLowerCase()}` : char))
                .join(""),
            value,
        ]),
    ) as CSSProperties;
}

function msToNum(value: string | number): number {
    return typeof value === "string" ? Number.parseFloat(value) : value;
}

function numToMs(value: number): string {
    return `${value}ms`;
}

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
        <section className={classes(styles.header, className)}>
            <div className={styles.headerContent} style={cssProps({ initDelay: numToMs(initDelay) })}>
                <div className={styles.details}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                    {!!url && (
                        <a className={styles.linkButton} href={url}>
                            {linkLabel}
                        </a>
                    )}
                </div>
                {!!roles?.length && (
                    <ul className={styles.meta}>
                        {roles.map((role, index) => (
                            <li
                                className={styles.metaItem}
                                style={cssProps({ delay: numToMs(initDelay + 300 + index * 140) })}
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
    <article className={classes(styles.project, className)} {...rest} />
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
    ) => (
        <section
            className={classes(styles.section, className)}
            data-light={light}
            data-full-height={fullHeight}
            ref={ref}
            {...rest}
        >
            {!!backgroundElement && (
                <div className={styles.sectionBackground} style={cssProps({ opacity: backgroundOverlayOpacity })}>
                    {backgroundElement}
                </div>
            )}
            <div className={styles.sectionInner} data-padding={padding}>
                {children}
            </div>
        </section>
    )
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
    const nodeRef = useRef<HTMLDivElement>(null);

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
        <div className={classes(styles.backgroundImage, className)} data-visible={visible ? "true" : "false"} ref={nodeRef}>
                    <div className={styles.backgroundImageElement} ref={imageRef}>
                {src && <img src={src} alt={alt} role="presentation" style={{ objectFit: "cover", width: "100%", height: "100%" }} {...rest} />}
                    </div>
                    <div className={styles.backgroundScrim} style={cssProps({ opacity })} />
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
    <div className={classes(styles.image, className)}>
            {src && <img src={src} alt={alt} data-visible={visible ? "true" : "false"} {...rest} />}
    </div>
);
};

export interface ProjectSectionContentProps extends ComponentProps<"div"> {
    readonly className?: string;
    readonly width?: "s" | "m" | "l" | "xl";
}

export const ProjectSectionContent = ({ className, width = "l", ...rest }: ProjectSectionContentProps) => (
    <div className={classes(styles.sectionContent, className)} data-width={width} {...rest} />
);

export interface ProjectSectionHeadingProps extends ComponentProps<"h1"> {
    readonly className?: string;
    readonly level?: number;
    readonly as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const ProjectSectionHeading = ({ className, level = 3, as: As = "h2", children, ...rest }: ProjectSectionHeadingProps) => (
    <As className={classes(styles.sectionHeading, className)} {...rest}>
        {children}
    </As>
);

export interface ProjectSectionTextProps extends ComponentProps<"p"> {
    readonly className?: string;
}

export const ProjectSectionText = ({ className, children, ...rest }: ProjectSectionTextProps) => (
    <p className={classes(styles.sectionText, className)} {...rest}>
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
        className={classes(styles.textRow, className)}
        data-center={center}
        data-stretch={stretch}
        data-center-mobile={centerMobile}
        data-no-margin={noMargin}
        data-width={width}
        data-justify={justify}
        {...rest}
    />
);

export interface ProjectSectionColumnsProps extends ProjectSectionContentProps {
    readonly centered?: boolean;
}

export const ProjectSectionColumns = ({ className, centered, ...rest }: ProjectSectionColumnsProps) => (
    <ProjectSectionContent className={classes(styles.sectionColumns, className)} data-centered={centered} {...rest} />
);
