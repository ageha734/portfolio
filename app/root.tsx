import type { LinksFunction } from "@remix-run/cloudflare";
import { createCookieSessionStorage, json } from "@remix-run/cloudflare";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useFetcher,
    useLoaderData,
    useNavigation,
    useRouteError,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react";

import { useEffect } from "react";
import { AppFooter } from "~/components/AppFooter";
import { AppHeader } from "~/components/AppHeader";
import { AppHeaderMobile } from "~/components/AppHeaderMobile";
import { Progress } from "~/components/progress";
import { ThemeProvider, themeStyles } from "~/components/theme-provider";
import { VisuallyHidden } from "~/components/visually-hidden";

import { Error } from "~/layouts/error";
import { Navbar } from "~/layouts/navbar";

import { SITE_DESCRIPTION, SITE_SHARE_IMAGE, SITE_TITLE, SITE_URL } from "~/shared/config/constants";
import { BASE_URL } from "~/shared/config/settings";
import { useIntro } from "~/hooks/useIntro";
import { usePageTracking } from "~/hooks/usePageTracking";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import styles from "~/styles/index.css?url";
import tailwind from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "shortcut_icon", href: "/shortcut.png", type: "image/png", sizes: "64x64" },
    { rel: "apple-touch-icon", href: "/icon-256.png", sizes: "256x256" },
    { rel: "author", href: "/humans.txt", type: "text/plain" },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: tailwind },
];

export const loader = async ({ request, context }) => {
    const { url } = request;
    const { pathname } = new URL(url);
    const pathnameSliced = pathname.endsWith("/") ? pathname.slice(0, -1) : url;
    const canonicalUrl = `${BASE_URL}${pathnameSliced}`;

    const { getSession, commitSession } = createCookieSessionStorage({
        cookie: {
            name: "__session",
            httpOnly: true,
            maxAge: 604_800,
            path: "/",
            sameSite: "lax",
            secrets: [context.cloudflare.env.SESSION_SECRET || " "],
            secure: true,
        },
    });

    const session = await getSession(request.headers.get("Cookie"));
    const theme = session.get("theme") || "dark";

    return json(
        { canonicalUrl, theme },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
};

export const meta: MetaFunction = (args) => {
    return [
        {
            charset: "utf-8",
        },
        {
            tagName: "meta",
            name: "viewport",
            content: "width=device-width,initial-scale=1",
        },
        {
            tagName: "meta",
            name: "theme-color",
            content: args.data.theme === "dark" ? "#111" : "#F2F2F2",
        },
        {
            tagName: "meta",
            name: "color-scheme",
            content: args.data.theme === "light" ? "light dark" : "dark light",
        },
        {
            title: SITE_TITLE,
        },
        {
            tagName: "meta",
            name: "description",
            content: args.data.description,
        },
        {
            name: "image",
            content: `${SITE_URL}${SITE_SHARE_IMAGE}`,
        },
        {
            tagName: "link",
            rel: "canonical",
            href: args.data.canonical,
        },
    ];
};

export default function App() {
    const fetcher = useFetcher();
    const { state } = useNavigation();

    if (fetcher.formData?.has("theme")) {
        theme = fetcher.formData.get("theme");
    }

    function toggleTheme(newTheme) {
        fetcher.submit(
            { theme: newTheme ? newTheme : theme === "dark" ? "light" : "dark" },
            { action: "/api/set-theme", method: "post" },
        );
    }

    useEffect(() => {
        console.info(`${config.ascii}\n`, `Taking a peek huh? Check out the source code: ${config.repo}\n\n`);
    }, []);

    // Life Cycle
    useIntro();
    usePageTracking();

    return (
        <html lang="en">
            <head>
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
                <Meta />
                <Links />
            </head>
            <body data-theme={theme}>
                <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
                    <I18nextProvider i18n={i18n}>
                        <Progress />
                        <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
                            Skip to main content
                        </VisuallyHidden>
                        <Navbar />
                        <AppHeader />
                        <AppHeaderMobile />
                        <main
                            id="main-content"
                            className={styles.container}
                            tabIndex={-1}
                            data-loading={state === "loading"}
                        >
                            <Outlet />
                        </main>
                        <AppFooter />
                    </I18nextProvider>
                </ThemeProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <html lang="en">
            <head>
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
                <Meta />
                <Links />
            </head>
            <body data-theme={theme}>
                <Error error={error} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
