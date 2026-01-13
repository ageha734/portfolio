import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@portfolio/ui";
import { FileText, LayoutDashboard, Briefcase, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@portfolio/ui";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Portfolios", href: "/portfolios", icon: Briefcase },
];

export function AdminLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile sidebar */}
            <div
                className={cn(
                    "fixed inset-0 z-50 lg:hidden",
                    sidebarOpen ? "block" : "hidden",
                )}
            >
                <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
                    <SidebarContent
                        location={location}
                        onNavigate={() => setSidebarOpen(false)}
                    />
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r px-6 pb-4">
                    <SidebarContent location={location} />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Header */}
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

                {/* Page content */}
                <main className="py-8 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

interface SidebarContentProps {
    location: { pathname: string };
    onNavigate?: () => void;
}

function SidebarContent({ location, onNavigate }: SidebarContentProps) {
    return (
        <>
            <div className="flex h-16 shrink-0 items-center">
                <h2 className="text-xl font-bold">CMS</h2>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-1">
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
