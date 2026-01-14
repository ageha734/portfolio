import { Briefcase, FileText, LayoutDashboard } from "lucide-react";
import type { NavigationItem } from "./types";

export const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Portfolios", href: "/portfolios", icon: Briefcase },
];
