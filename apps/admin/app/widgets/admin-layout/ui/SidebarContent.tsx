import { cn } from "@portfolio/ui";
import { Link } from "@tanstack/react-router";
import { navigation } from "../model/config";
import type { SidebarContentProps } from "../model/types";

export function SidebarContent({
	location,
	onNavigate,
}: Readonly<SidebarContentProps>) {
	return (
		<>
			<div className="flex h-16 shrink-0 items-center">
				<h2 className="text-xl font-bold">CMS</h2>
			</div>
			<nav className="flex flex-1 flex-col">
				<ul className="flex flex-1 flex-col gap-y-1">
					{navigation.map((item) => {
						const isActive = location.pathname === item.href;
						return (
							<li key={item.name}>
								<Link
									to={item.href}
									onClick={onNavigate}
									className={cn(
										"group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:text-foreground hover:bg-accent",
									)}
								>
									<item.icon className="h-6 w-6 shrink-0" />
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}
