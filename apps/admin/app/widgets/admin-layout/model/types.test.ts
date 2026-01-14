import { Home } from "lucide-react";
import { describe, expect, test } from "vitest";
import type { NavigationItem, SidebarContentProps } from "./types";

describe("NavigationItem", () => {
    test("should have required fields", () => {
        const item: NavigationItem = {
            name: "Dashboard",
            href: "/",
            icon: Home,
        };

        expect(item.name).toBe("Dashboard");
        expect(item.href).toBe("/");
        expect(item.icon).toBe(Home);
    });

    test("should accept component with className prop", () => {
        const IconComponent = ({ className: _className }: { className?: string }) => null;

        const item: NavigationItem = {
            name: "Test",
            href: "/test",
            icon: IconComponent,
        };

        expect(item.name).toBe("Test");
        expect(item.href).toBe("/test");
        expect(typeof item.icon).toBe("function");
    });

    test("should accept icon from lucide-react", () => {
        const item: NavigationItem = {
            name: "Dashboard",
            href: "/",
            icon: Home,
        };

        expect(item.icon).toBe(Home);
    });
});

describe("SidebarContentProps", () => {
    test("should have required location field", () => {
        const props: SidebarContentProps = {
            location: { pathname: "/" },
        };

        expect(props.location.pathname).toBe("/");
    });

    test("should allow onNavigate as optional callback", () => {
        const callback = () => {};
        const propsWithCallback: SidebarContentProps = {
            location: { pathname: "/" },
            onNavigate: callback,
        };

        const propsWithoutCallback: SidebarContentProps = {
            location: { pathname: "/" },
        };

        expect(propsWithCallback.onNavigate).toBe(callback);
        expect(propsWithoutCallback.onNavigate).toBeUndefined();
    });

    test("should allow different pathname values", () => {
        const dashboardProps: SidebarContentProps = {
            location: { pathname: "/" },
        };

        const postsProps: SidebarContentProps = {
            location: { pathname: "/posts" },
        };

        const portfoliosProps: SidebarContentProps = {
            location: { pathname: "/portfolios" },
        };

        expect(dashboardProps.location.pathname).toBe("/");
        expect(postsProps.location.pathname).toBe("/posts");
        expect(portfoliosProps.location.pathname).toBe("/portfolios");
    });

    test("onNavigate should be callable when provided", () => {
        let called = false;
        const props: SidebarContentProps = {
            location: { pathname: "/" },
            onNavigate: () => {
                called = true;
            },
        };

        props.onNavigate?.();
        expect(called).toBe(true);
    });
});
