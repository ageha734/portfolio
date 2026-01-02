import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import styles from "./error.module.css";
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

export interface ErrorProps {
    readonly error: ErrorData;
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
    const visibleAttr = visible ? "true" : "false";

    if (flatlined) {
        return (
            <>
                <h1 className={styles.titleFlatline} data-visible={visibleAttr}>
                                        <svg width="60" height="80" viewBox="0 0 60 80">
                                            <use href={`${flatlineSkull}#skull`} />
                                        </svg>
                    <span>Flatlined</span>
                </h1>
                <p className={styles.description} data-visible={visibleAttr}>
                                    {message}
                </p>
                <a
                                        className={styles.button}
                    data-visible={visibleAttr}
                                        href="https://www.youtube.com/watch?v=EuQzHGcsjlA"
                                    >
                                        Emotional support
                </a>
            </>
        );
    }

    return (
        <>
            <h1 className={styles.title} data-visible={visibleAttr}>
                {error.status}
            </h1>
            <h2 aria-hidden className={styles.subheading} data-visible={visibleAttr}>
                {summary}
            </h2>
            <p className={styles.description} data-visible={visibleAttr}>
                {message}
            </p>
            <Link className={styles.button} data-visible={visibleAttr} to="/">
                                        Back to homepage
            </Link>
        </>
    );
}

interface VideoCreditProps {
    readonly flatlined: boolean;
    readonly visible: boolean;
}

function VideoCredit({ flatlined, visible }: VideoCreditProps) {
    const visibleAttr = visible ? "true" : "false";

    if (flatlined) {
        return (
                                <a
                                    className={styles.credit}
                data-visible={visibleAttr}
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
                                    className={styles.credit}
            data-visible={visibleAttr}
                                    href="https://www.imdb.com/title/tt0113568/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Animation from Ghost in the Shell (1995)
                                </a>
    );
}

export function ErrorPage({ error }: ErrorProps) {
    const [visible, setVisible] = useState(false);
    const flatlined = !error.status;

    useEffect(() => {
        setVisible(true);
    }, []);

    const { summary, message } = getErrorMessage(error);
    const visibleAttr = visible ? "true" : "false";

    return (
        <section className={styles.page}>
            {flatlined && <FlatlineThemeStyles />}
            <div className={styles.details}>
                <div className={styles.text}>
                    <ErrorContent error={error} summary={summary} message={message} flatlined={flatlined} visible={visible} />
                </div>
            </div>

            <div className={styles.videoContainer} data-visible={visibleAttr}>
                <video
                    className={styles.video}
                    src={flatlineVideo}
                    poster={flatlined ? flatlinePoster : notFoundPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    data-visible={visibleAttr}
                />
                <VideoCredit flatlined={flatlined} visible={visible} />
                        </div>
        </section>
    );
}
