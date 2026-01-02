import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { createCookieSessionStorage } from "@remix-run/cloudflare";
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

import { Footer, FooterMobile } from "~/widgets/footer";
import { Header, HeaderMobile, Navbar } from "~/widgets/navbar";

import { ErrorPage } from "~/widgets/error";
import type { ErrorProps } from "~/widgets/error";

import { SITE_DESCRIPTION, SITE_SHARE_IMAGE, SITE_TITLE, SITE_URL } from "~/shared/config/constants";
import { BASE_URL, GOOGLE_TAG_MANAGER } from "~/shared/config/settings";
import { useIntro } from "~/shared/hooks/useIntro";
import { usePageTracking } from "~/shared/hooks/usePageTracking";
import { TrackingGTMScript, TrackingGTMIFrame } from "~/features/tracking";

import { I18nextProvider } from "react-i18next";
import i18n from "~/shared/config/i18n";

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

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
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
            secrets: [(context as { cloudflare?: { env?: { SESSION_SECRET?: string } } }).cloudflare?.env?.SESSION_SECRET || " "],
            secure: true,
        },
    });

    const session = await getSession(request.headers.get("Cookie"));
    const theme = session.get("theme") || "dark";

    return Response.json(
        { canonicalUrl, theme },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
};

export const meta: MetaFunction<typeof loader> = (args) => {
    const data = args.data as { theme?: string; canonicalUrl?: string; description?: string };
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
            content: data.theme === "dark" ? "#111" : "#F2F2F2",
        },
        {
            tagName: "meta",
            name: "color-scheme",
            content: data.theme === "light" ? "light dark" : "dark light",
        },
        {
            title: SITE_TITLE,
        },
        {
            tagName: "meta",
            name: "description",
            content: data.description || SITE_DESCRIPTION,
        },
        {
            name: "image",
            content: `${SITE_URL}${SITE_SHARE_IMAGE}`,
        },
        {
            tagName: "link",
            rel: "canonical",
            href: data.canonicalUrl || "",
        },
    ];
};

export default function App() {
    const fetcher = useFetcher();
    const { state } = useNavigation();
    const { theme: initialTheme } = useLoaderData<{ canonicalUrl: string; theme: string }>();

    const theme = (fetcher.formData?.get("theme") as string) || initialTheme;

    function toggleTheme(newTheme?: string) {
        fetcher.submit(
            { theme: newTheme || (theme === "dark" ? "light" : "dark") },
            { action: "/api/set-theme", method: "post" },
        );
    }

    useIntro();
    usePageTracking();

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                {GOOGLE_TAG_MANAGER !== "__undefined__" && <TrackingGTMScript id={GOOGLE_TAG_MANAGER} />}
            </head>
            <body data-theme={theme}>
                {GOOGLE_TAG_MANAGER !== "__undefined__" && <TrackingGTMIFrame id={GOOGLE_TAG_MANAGER} />}
                <I18nextProvider i18n={i18n}>
                    <Navbar />
                    <Header />
                    <HeaderMobile />
                    <main
                        id="main-content"
                        className="container"
                        tabIndex={-1}
                        data-loading={state === "loading"}
                    >
                        <Outlet />
                    </main>
                    <Footer />
                    <FooterMobile />
                </I18nextProvider>
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
                <Meta />
                <Links />
            </head>
            <body data-theme="dark">
                <ErrorPage error={error as ErrorProps["error"]} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
