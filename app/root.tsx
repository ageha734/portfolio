import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import { AppFooter } from "~/components/AppFooter";
import { BASE_URL } from "~/config/settings";
import { AppHeader } from "~/components/AppHeader";
import { AppHeaderMobile } from "~/components/AppHeaderMobile";
import { SITE_DESCRIPTION, SITE_SHARE_IMAGE, SITE_TITLE, SITE_URL } from "~/config/constants";
import { useIntro } from "~/hooks/useIntro";
import { usePageTracking } from "~/hooks/usePageTracking";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import styles from "~/styles/index.css?url";
import font from "~/styles/fonts.css?url";
import tailwind from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: font },
    { rel: "stylesheet", href: tailwind },
];

export const loader = async (args: DataFunctionArgs) => {
    const { request } = args;

    const baseUrl = BASE_URL;
    const canonical = request.url;
    const header = request.headers.get("cookie");
    // const cookie = (await cookieTheme.parse(header)) ?? {};
    // const { theme = "light" } = cookie;

    return json({ baseUrl, canonical });
};

export const meta: MetaFunction = (args) => {
    return [
        { charset: "utf-8" },
        {
            title: SITE_TITLE,
        },
        {
            name: "description",
            content: args.data.description,
        },
        { viewport: "width=device-width,initial-scale=1" },
        {
            name: "image",
            content: `${SITE_URL}${SITE_SHARE_IMAGE}`,
        },
        {
            tagName: "link",
            rel: "canonical",
            href: args.data.canonical,
        },
        // ...getMetaData({
        //   canonical: args.data?.canonical,
        // })
    ];
};

export default function App() {
    // Hooks
    const data = useLoaderData<typeof loader>();

    // Setup
    const { canonical } = data;
    const favicon = "/images/svg/logo.svg";
    const manifest = "/manifest.json";

    // Life Cycle
    useIntro();
    usePageTracking();

    return (
        <html lang="en">
            <head>
                <link href={canonical} rel="canonical" />
                <link href={favicon} rel="apple-touch-icon" sizes="48x48" />
                <link href={favicon} rel="favicon" />
                <link href={favicon} rel="icon" type="image/svg+xml" />
                <link href={favicon} rel="mask-icon" type="image/svg+xml" />
                <link href={manifest} rel="manifest" />

                <Meta />
                <Links />
            </head>
            <body>
                <AppHeader />
                <AppHeaderMobile />
                <main>
                    <I18nextProvider i18n={i18n}>
                        <Outlet />
                    </I18nextProvider>
                </main>
                <AppFooter />

                {/* Remix */}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
