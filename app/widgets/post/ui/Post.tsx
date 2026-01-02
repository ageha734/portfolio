import type { ReactNode, MouseEvent, CSSProperties } from "react";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "@remix-run/react";
import { Footer } from "~/widgets/footer";
import styles from "./Post.module.css";

const DEFAULT_DURATION_MS = 300;

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
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

function useParallax(speed: number, callback: (value: number) => void) {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            callback(scrollY * speed);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, callback]);
}

function useScrollToHash() {
    return (hash: string, callback?: () => void) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            callback?.();
        }
    };
}

export interface PostProps {
    children: ReactNode;
    title: string;
    date: string;
    banner?: string;
    timecode?: string;
}

export const Post = ({ children, title, date, banner, timecode }: PostProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const [dateTime, setDateTime] = useState<string | null>(null);

    useEffect(() => {
        setDateTime(formatDate(date));
    }, [date]);

    useParallax(0.004, (value: number) => {
        if (!imageRef.current) return;
        imageRef.current.style.setProperty("--blurOpacity", String(clamp(value, 0, 1)));
    });

    const scrollToHash = useScrollToHash();

    const handleScrollIndicatorClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        scrollToHash(event.currentTarget.href);
    };

    const placeholder = banner ? `${banner.split(".")[0]}-placeholder.jpg` : undefined;

    const [visible, setVisible] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <article className={styles.post}>
            <section>
                {banner && placeholder && (
                    <div className={styles.banner} ref={imageRef}>
                        <div className={styles.bannerImage}>
                            <img role="presentation" src={banner} alt="" loading="lazy" />
                        </div>
                        <div className={styles.bannerImageBlur}>
                            <img role="presentation" src={placeholder} alt="" loading="lazy" />
                        </div>
                    </div>
                )}
                <header className={styles.header}>
                    <div className={styles.headerText}>
                                <div className={styles.date} ref={nodeRef}>
                            <div
                                style={{
                                    width: visible ? "64px" : "0",
                                    height: "8px",
                                    transition: "width 0.3s ease",
                                }}
                            />
                            <p className={styles.dateText} data-visible={visible ? "true" : "false"}>
                                        {dateTime}
                            </p>
                                </div>
                        <h1 className={styles.title} aria-label={title}>
                            {title.split(" ").map((word, index) => (
                                <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                                    <span
                                        className={styles.titleWord}
                                        style={cssProps({ delay: numToMs(index * 100 + 100) })}
                                    >
                                        {word}
                                        {index === title.split(" ").length - 1 ? "" : " "}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <div className={styles.details}>
                            <RouterLink
                                to="#postContent"
                                className={styles.arrow}
                                aria-label="Scroll to post content"
                                onClick={handleScrollIndicatorClick}
                            >
                                <svg aria-hidden stroke="currentColor" width="43" height="15" viewBox="0 0 43 15">
                                    <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
                                </svg>
                            </RouterLink>
                            {timecode && <div className={styles.timecode}>{timecode}</div>}
                        </div>
                    </div>
                </header>
            </section>
            <section className={styles.wrapper} id="postContent" tabIndex={-1}>
                <div className={styles.content}>{children}</div>
            </section>
            <Footer />
        </article>
    );
};
