import { Button, cn } from "@portfolio/ui";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Moon, Sun } from "lucide-react";
import type { ComponentProps } from "react";

export interface ThemeToggleProps extends ComponentProps<typeof Button> {
	readonly isMobile?: boolean;
}

export const ThemeToggle = ({
	isMobile,
	className,
	...rest
}: ThemeToggleProps) => {
	const fetcher = useFetcher();
	const { theme: initialTheme } = useLoaderData<{ theme: string }>();
	const theme = (fetcher.formData?.get("theme") as string) || initialTheme;

	const toggleTheme = () => {
		fetcher.submit(
			{ theme: theme === "dark" ? "light" : "dark" },
			{ action: "/api/set-theme", method: "post" },
		);
	};

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className={cn("relative", className)}
			aria-label="Toggle theme"
			onClick={toggleTheme}
			{...rest}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};
