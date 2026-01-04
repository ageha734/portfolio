import React, { type ReactNode } from "react";
import { useLocation as useRouterLocation, useNavigate as useRouterNavigate } from "react-router";

// RemixのLinkを単純な<a>タグに置き換え（Routerコンテキスト内で使用）
export const Link = ({ to, children, ...props }: { to: string; children?: ReactNode; [key: string]: unknown }) => {
    return (
        <a href={to} {...props}>
            {children}
        </a>
    );
};

// RemixのNavLinkを単純な<a>タグに置き換え（Routerコンテキスト内で使用）
export const NavLink = ({
    to,
    children,
    className,
    ...props
}: {
    to: string;
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
}) => {
    // Storybookではアクティブ状態の判定を簡略化
    const isActive = globalThis.window !== undefined && globalThis.window.location.pathname === to;
    const activeClassName = isActive ? "active" : "";

    return (
        <a href={to} className={`${className || ""} ${activeClassName}`.trim()} {...props}>
            {children}
        </a>
    );
};

// RemixのuseLocationをreact-routerのuseLocationに置き換え
export { useRouterLocation as useLocation };

// RemixのuseNavigateをreact-routerのuseNavigateに置き換え
export { useRouterNavigate as useNavigate };

// その他のRemixフックのモック
export const useLoaderData = () => ({
    canonicalUrl: "https://example.com",
    theme: "dark",
});

export const useFetcher = () => ({
    formData: null,
    submit: () => {
        // Storybook用のモック
    },
    load: () => {
        // Storybook用のモック
    },
    data: undefined,
    state: "idle",
});

// その他のRemixフックのモック
export const useNavigation = () => ({
    state: "idle",
    location: {
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default",
    },
    formMethod: undefined,
    formAction: undefined,
    formData: undefined,
    formEncType: undefined,
    json: undefined,
    text: undefined,
});

export const useRouteError = () => null;

// 型定義のみを再エクスポート（循環参照を避けるため）
export type {
    ActionFunctionArgs,
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/cloudflare";
