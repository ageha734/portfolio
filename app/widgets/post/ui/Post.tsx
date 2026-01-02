import type { ReactNode, MouseEvent } from "react";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "@remix-run/react";
import { ChevronDown } from "lucide-react";
import { Footer } from "~/widgets/footer";
import { cn } from "~/shared/lib/cn";

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
        <article className="relative grid overflow-x-hidden">
            <section>
                {banner && placeholder && (
                    <div className="absolute inset-x-0 top-0 h-[70vh] isolate overflow-hidden" ref={imageRef}>
                        <div className="absolute inset-0">
                            <img
                                role="presentation"
                                src={banner}
                                alt=""
                                loading="lazy"
                                className="h-[70vh] w-full object-cover"
                            />
                        </div>
                        <div
                            className="absolute inset-0 opacity-0 transition-opacity"
                            style={{ opacity: `var(--blurOpacity, 0)` }}
                        >
                            <img
                                role="presentation"
                                src={placeholder}
                                alt=""
                                loading="lazy"
                                className="h-[70vh] w-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/70 via-background/90 to-background" />
                    </div>
                )}
                <header className="relative grid grid-cols-[1fr_60px_680px_60px_1fr] gap-4 items-center md:grid-cols-[1fr_100px_740px_100px_1fr] lg:grid-cols-[1fr_100px_740px_100px_1fr]">
                    <div className="h-full w-full relative flex flex-col justify-center gap-8 max-w-[800px] col-start-3 md:col-start-3 pt-20 md:pt-24">
                        <div className="grid grid-cols-[100px_1fr] gap-4 items-center relative md:gap-4" ref={nodeRef}>
                            <div
                                className="h-2 bg-primary transition-all duration-300 ease-in-out"
                                style={{
                                    width: visible ? "64px" : "0",
                                }}
                            />
                            <p
                                className={cn(
                                    "text-primary opacity-0 transition-opacity duration-500",
                                    visible && "opacity-100",
                                )}
                            >
                                {dateTime}
                            </p>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-tight" aria-label={title}>
                            {title.split(" ").map((word, index) => (
                                <span className="inline-block overflow-hidden" key={`${word}-${index}`}>
                                    <span
                                        className="inline-block whitespace-pre animate-in slide-in-from-bottom-5 duration-500"
                                        style={{
                                            animationDelay: `${index * 100 + 100}ms`,
                                            animationFillMode: "forwards",
                                        }}
                                    >
                                        {word}
                                        {index === title.split(" ").length - 1 ? "" : " "}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <div className="flex items-center justify-between gap-4">
                            <RouterLink
                                to="#postContent"
                                className="relative left-[-1rem] p-4 opacity-0 animate-in fade-in duration-600 delay-1000"
                                aria-label="Scroll to post content"
                                onClick={handleScrollIndicatorClick}
                            >
                                <ChevronDown className="h-6 w-6 stroke-muted-foreground" />
                            </RouterLink>
                            {timecode && (
                                <div className="text-muted-foreground text-base py-4 grid grid-cols-[60px_1fr] gap-2.5 items-center opacity-0 animate-in fade-in duration-600 delay-1000">
                                    <div className="h-0.5 bg-muted-foreground/40" />
                                    <span>{timecode}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            </section>
            <section className="flex flex-col pb-8 pt-[calc(60px+2rem)] overflow-hidden md:pt-[calc(100px+2rem)]" id="postContent" tabIndex={-1}>
                <div className="w-full self-center opacity-0 animate-in fade-in duration-1200 delay-1000 grid grid-cols-[1fr_60px_680px_60px_1fr] md:grid-cols-[1fr_100px_740px_100px_1fr]">
                    <div className="col-start-3">{children}</div>
                </div>
            </section>
            <Footer />
        </article>
    );
};
