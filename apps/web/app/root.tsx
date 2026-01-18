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
import * as Sentry from "@sentry/remix";
import { I18nextProvider } from "react-i18next";
import { TrackingGA, TrackingGTMIFrame, TrackingGTMScript } from "~/features/tracking";
import { SITE_DESCRIPTION, SITE_SHARE_IMAGE, SITE_TITLE, SITE_URL } from "~/shared/config/constants";
import i18n from "~/shared/config/i18n";
import {
    BASE_URL,
    GOOGLE_ANALYTICS,
    GOOGLE_ANALYTICS_ENABLED,
    GOOGLE_TAG_MANAGER,
    GOOGLE_TAG_MANAGER_ENABLED,
    SENTRY_DSN,
} from "~/shared/config/settings";
import { useIntro } from "~/shared/hooks/lib/useIntro";
import { usePageTracking } from "~/shared/hooks/lib/usePageTracking";
import tailwind from "~/tailwind.css?url";
import type { ErrorProps } from "~/widgets/error";
import { ErrorPage } from "~/widgets/error";
import { Footer, FooterMobile } from "~/widgets/footer";
import { Header, HeaderMobile, Navbar } from "~/widgets/navbar";

export const links: LinksFunction = () => [
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico" },
    {
        rel: "shortcut_icon",
        href: "/icons/64.png",
        type: "image/png",
        sizes: "64x64",
    },
    { rel: "apple-touch-icon", href: "/icons/256.png", sizes: "256x256" },
    { rel: "author", href: "/humans.txt", type: "text/plain" },
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
            secrets: [
                (context as { cloudflare?: { env?: { SESSION_SECRET?: string } } }).cloudflare?.env?.SESSION_SECRET ||
                    " ",
            ],
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
    const data =
        (args.data as {
            theme?: string;
            canonicalUrl?: string;
            description?: string;
        }) || {};
    const theme = data.theme || "dark";
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
            content: theme === "dark" ? "#111" : "#F2F2F2",
        },
        {
            tagName: "meta",
            name: "color-scheme",
            content: theme === "light" ? "light dark" : "dark light",
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
    const { theme: initialTheme } = useLoaderData<{
        canonicalUrl: string;
        theme: string;
    }>();

    const theme = (fetcher.formData?.get("theme") as string) || initialTheme;

    function _toggleTheme(newTheme?: string) {
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
                {GOOGLE_ANALYTICS_ENABLED && GOOGLE_ANALYTICS !== "__undefined__" && (
                    <TrackingGA id={GOOGLE_ANALYTICS} />
                )}
                {GOOGLE_TAG_MANAGER_ENABLED && GOOGLE_TAG_MANAGER !== "__undefined__" && (
                    <TrackingGTMScript id={GOOGLE_TAG_MANAGER} />
                )}
            </head>
            <body data-theme={theme} className={theme === "dark" ? "dark" : ""}>
                {GOOGLE_TAG_MANAGER_ENABLED && GOOGLE_TAG_MANAGER !== "__undefined__" && (
                    <TrackingGTMIFrame id={GOOGLE_TAG_MANAGER} />
                )}
                <I18nextProvider i18n={i18n}>
                    <Navbar />
                    <Header />
                    <HeaderMobile />
                    <main id="main-content" className="container" tabIndex={-1} data-loading={state === "loading"}>
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

    if (SENTRY_DSN !== "__undefined__") {
        Sentry.captureException(error);
    }

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body data-theme="dark" className="dark">
                <ErrorPage error={error as ErrorProps["error"]} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
