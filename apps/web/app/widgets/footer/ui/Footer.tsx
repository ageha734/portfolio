import { useLocation } from "@remix-run/react";
import { SOCIAL_GITHUB, SOCIAL_LINKEDIN, SOCIAL_TWITTER } from "~/shared/config/constants";

export const Footer = () => {
    const { pathname } = useLocation();
    const isResume = pathname.startsWith("/resume");
    if (isResume) return null;
    return (
        <footer className="mt-10 hidden justify-center gap-2 text-center text-sm md:mt-20 md:block print:hidden">
            <div className="m-auto flex justify-center gap-4">
                <a
                    className="p-2 transition-opacity hover:opacity-70"
                    href={SOCIAL_LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        alt="Follow me on LinkedIn"
                        className="h-4 w-4"
                        height={16}
                        loading="lazy"
                        src="/images/svg/linkedin-dark.svg"
                        width={16}
                    />
                </a>
                <a
                    className="p-2 transition-opacity hover:opacity-70"
                    href={SOCIAL_GITHUB}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        alt="Follow me on GitHub"
                        className="h-4 w-4"
                        height={16}
                        loading="lazy"
                        src="/images/svg/github-dark.svg"
                        width={16}
                    />
                </a>
                <a
                    className="p-2 transition-opacity hover:opacity-70"
                    href={SOCIAL_TWITTER}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        alt="Follow me on Twitter"
                        className="h-4 w-4"
                        height={16}
                        loading="lazy"
                        src="/images/svg/twitter-dark.svg"
                        width={16}
                    />
                </a>
            </div>
            <p className="font-mono">
                Built with <span className="text-primary">&hearts;</span> in{" "}
                <a
                    href="https://www.google.com/search?q=san+diego+weather"
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary hover:underline"
                >
                    San Diego
                </a>{" "}
                , CA.
            </p>
        </footer>
    );
};
