import type { ComponentProps } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "~/shared/ui/cn";

export interface NavToggleProps extends ComponentProps<"button"> {
    readonly menuOpen: boolean;
}

export const NavToggle = ({ menuOpen, className, ...rest }: NavToggleProps) => {
    return (
        <button
            type="button"
            className={cn(
                "relative flex items-center justify-center p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                className,
            )}
            aria-label="Menu"
            aria-expanded={menuOpen}
            {...rest}
        >
            <div className="relative flex items-center justify-center">
                <Menu
                    className={cn("absolute h-6 w-6 transition-opacity", menuOpen ? "opacity-0" : "opacity-100")}
                    data-menu={true}
                />
                <X
                    className={cn("absolute h-6 w-6 transition-opacity", menuOpen ? "opacity-100" : "opacity-0")}
                    data-close={true}
                />
            </div>
        </button>
    );
};
