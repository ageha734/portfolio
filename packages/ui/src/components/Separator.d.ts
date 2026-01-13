import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type * as React from "react";

export interface SeparatorProps
    extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

export declare const Separator: React.ForwardRefExoticComponent<
    SeparatorProps & React.RefAttributes<React.ElementRef<typeof SeparatorPrimitive.Root>>
>;
