import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { cn } from "~/shared/ui/cn";
import type { ErrorProps } from "../model/types";
import flatlineSkull from "./error-flatline.svg";

const notFoundPoster = "/assets/notfound.jpg";
const flatlinePoster = "/assets/flatline.png";
const flatlineVideo = "/assets/flatline.mp4";

interface ErrorData {
    status?: number;
    statusText?: string;
    data?: string;
    toString?: () => string;
}

interface ErrorMessage {
    summary: string;
    message: string;
}

function getErrorMessage(error: ErrorData): ErrorMessage {
        switch (error.status) {
            case 404:
                return {
                    summary: "Error: redacted",
                    message:
                        "This page could not be found. It either doesn't exist or was deleted. Or perhaps you don't exist and this webpage couldn't find you.",
                };
            case 405:
                return {
                    summary: "Error: method denied",
                    message: error.data || "",
                };
            default:
                return {
                    summary: "Error: anomaly",
                    message: error.statusText || error.data || error.toString?.() || "Unknown error",
                };
        }
}

function FlatlineThemeStyles() {
    return (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
            [data-theme='dark'] {
              --primary: oklch(69.27% 0.242 25.41);
              --accent: oklch(69.27% 0.242 25.41);
            }
            [data-theme='light'] {
              --primary: oklch(56.29% 0.182 26.5);
              --accent: oklch(56.29% 0.182 26.5);
            }
          `,
                    }}
                />
    );
}

interface ErrorContentProps {
    readonly error: ErrorData;
    readonly summary: string;
    readonly message: string;
    readonly flatlined: boolean;
    readonly visible: boolean;
}

function ErrorContent({ error, summary, message, flatlined, visible }: ErrorContentProps) {
    if (flatlined) {
        return (
            <>
                <h1 className={cn("mb-4 text-primary flex items-center gap-4 whitespace-nowrap transition-all duration-500 delay-100", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                    <svg width="60" height="80" viewBox="0 0 60 80" className="flex-shrink-0 text-accent">
                        <use href={`${flatlineSkull}#skull`} />
                    </svg>
                    <span>Flatlined</span>
                </h1>
                <p className={cn("pb-4 transition-all duration-500 delay-300", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                    {message}
                </p>
                <a
                    className={cn("transition-all duration-500 delay-500 self-start pl-1", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
                    href="https://www.youtube.com/watch?v=EuQzHGcsjlA"
                >
                    <Button>Emotional support</Button>
                </a>
            </>
        );
    }

    return (
        <>
            <h1 className={cn("mb-4 transition-all duration-500 delay-100", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                {error.status}
            </h1>
            <h2 aria-hidden className={cn("pb-4 uppercase tracking-wider text-muted-foreground transition-all duration-500 delay-200 max-w-full whitespace-nowrap overflow-hidden flex-shrink-0", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                {summary}
            </h2>
            <p className={cn("pb-4 transition-all duration-500 delay-300", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                {message}
            </p>
            <Link className={cn("transition-all duration-500 delay-500 self-start pl-1", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} to="/">
                <Button>Back to homepage</Button>
            </Link>
        </>
    );
}

interface VideoCreditProps {
    readonly flatlined: boolean;
    readonly visible: boolean;
}

function VideoCredit({ flatlined, visible }: VideoCreditProps) {
    if (flatlined) {
        return (
            <a
                className={cn("text-white/40 bg-black/60 px-2 py-1 text-sm absolute bottom-4 left-4 no-underline transition-all duration-300 delay-800 hover:text-white", visible ? "opacity-100" : "opacity-0")}
                href="https://www.imdb.com/title/tt0318871/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Animation from Berserk (1997)
            </a>
        );
    }

    return (
        <a
            className={cn("text-white/40 bg-black/60 px-2 py-1 text-sm absolute bottom-4 left-4 no-underline transition-all duration-300 delay-800 hover:text-white", visible ? "opacity-100" : "opacity-0")}
            href="https://www.imdb.com/title/tt0113568/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Animation from Ghost in the Shell (1995)
        </a>
    );
}

export function ErrorPage({ error }: Readonly<ErrorProps>) {
    const [visible, setVisible] = useState(false);
    const flatlined = !error.status;

    useEffect(() => {
        setVisible(true);
    }, []);

    const { summary, message } = getErrorMessage(error);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 h-screen pl-[140px] md:pt-20 md:pb-20 md:pl-20 md:min-h-screen md:h-auto md:pl-0">
            {flatlined && <FlatlineThemeStyles />}
            <div className="flex items-center justify-center p-0 md:p-8 h-full md:row-start-2">
                <div className="flex flex-col max-w-[480px] w-full">
                    <ErrorContent error={error} summary={summary} message={message} flatlined={flatlined} visible={visible} />
                </div>
            </div>

            <div className={cn("w-full h-full overflow-hidden relative border-[48px] md:border-4 md:border-[64px] md:min-h-[240px] md:row-start-1 md:border-t-0", visible ? "opacity-100" : "opacity-0")}>
                <video
                    className={cn("object-cover w-full h-full relative opacity-0 transition-opacity delay-800 duration-500 md:clip-path-[polygon(0_0,calc(100%-64px)_0,100%_64px,100%_100%,0_100%)]", visible && "opacity-100")}
                    src={flatlineVideo}
                    poster={flatlined ? flatlinePoster : notFoundPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <VideoCredit flatlined={flatlined} visible={visible} />
            </div>
        </section>
    );
}
