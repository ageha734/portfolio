import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

declare const buttonVariants: (
    props?: VariantProps<{
        variant: {
            default: string;
            destructive: string;
            outline: string;
            secondary: string;
            ghost: string;
            link: string;
        };
        size: {
            default: string;
            sm: string;
            lg: string;
            icon: string;
        };
    }> & {
        className?: string;
    },
) => string;

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { buttonVariants };
