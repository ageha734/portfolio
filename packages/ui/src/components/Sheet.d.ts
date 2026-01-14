import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

export declare const Sheet: typeof DialogPrimitive.Root;
export declare const SheetTrigger: typeof DialogPrimitive.Trigger;
export declare const SheetClose: typeof DialogPrimitive.Close;
export declare const SheetPortal: typeof DialogPrimitive.Portal;

export declare const SheetOverlay: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
        React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Overlay>>
>;

declare const sheetVariants: ReturnType<typeof import("class-variance-authority").cva>;

export interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
        VariantProps<typeof sheetVariants> {}

export declare const SheetContent: React.ForwardRefExoticComponent<
    SheetContentProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Content>>
>;

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export declare const SheetHeader: React.ForwardRefExoticComponent<
    SheetHeaderProps & React.RefAttributes<HTMLDivElement>
>;
export declare const SheetFooter: React.ForwardRefExoticComponent<
    SheetFooterProps & React.RefAttributes<HTMLDivElement>
>;

export interface SheetTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export declare const SheetTitle: React.ForwardRefExoticComponent<
    SheetTitleProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Title>>
>;

export interface SheetDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export declare const SheetDescription: React.ForwardRefExoticComponent<
    SheetDescriptionProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Description>>
>;
