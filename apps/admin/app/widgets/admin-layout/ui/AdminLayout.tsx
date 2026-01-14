import { Button, cn } from "@portfolio/ui";
import { Outlet, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SidebarContent } from "./SidebarContent";

export function AdminLayout() {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleOverlayClick = () => {
		setSidebarOpen(false);
	};

	const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape" || event.key === "Enter") {
			setSidebarOpen(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<div
				className={cn(
					"fixed inset-0 z-50 lg:hidden",
					sidebarOpen ? "block" : "hidden",
				)}
			>
				<button
					type="button"
					className="fixed inset-0 bg-black/50"
					onClick={handleOverlayClick}
					onKeyDown={handleOverlayKeyDown}
					aria-label="Close sidebar"
				/>
				<div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
					<SidebarContent
						location={location}
						onNavigate={() => setSidebarOpen(false)}
					/>
				</div>
			</div>

			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r px-6 pb-4">
					<SidebarContent location={location} />
				</div>
			</div>

			<div className="lg:pl-64">
				<header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</Button>
					<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
						<div className="flex flex-1 items-center">
							<h1 className="text-xl font-semibold">Admin Dashboard</h1>
						</div>
					</div>
				</header>

				<main className="py-8 px-4 sm:px-6 lg:px-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
