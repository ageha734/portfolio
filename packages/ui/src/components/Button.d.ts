import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

declare const buttonVariants: ReturnType<
	typeof import("class-variance-authority").cva
>;

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

export declare const Button: React.ForwardRefExoticComponent<
	ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export { buttonVariants };
