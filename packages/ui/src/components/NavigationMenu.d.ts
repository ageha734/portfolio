import type * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import type * as React from "react";

export declare const NavigationMenu: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.Root>>
>;

export declare const NavigationMenuList: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.List>>
>;

export declare const NavigationMenuItem: typeof NavigationMenuPrimitive.Item;

export declare const NavigationMenuTrigger: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.Trigger>>
>;

export declare const NavigationMenuContent: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.Content>>
>;

export declare const NavigationMenuLink: typeof NavigationMenuPrimitive.Link;

export declare const NavigationMenuViewport: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.Viewport>>
>;

export declare const NavigationMenuIndicator: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> &
        React.RefAttributes<React.ElementRef<typeof NavigationMenuPrimitive.Indicator>>
>;
