import { Briefcase, FileText, TrendingUp, Users } from "lucide-react";
import type { DashboardStats, StatCard } from "../model/types";

export function createStatCards(stats: DashboardStats): StatCard[] {
	return [
		{
			title: "Total Posts",
			value: stats.posts,
			description: "Published blog posts",
			icon: FileText,
			trend: "+12%",
		},
		{
			title: "Portfolios",
			value: stats.portfolios,
			description: "Portfolio items",
			icon: Briefcase,
			trend: "+8%",
		},
		{
			title: "Total Views",
			value: stats.totalViews,
			description: "Page views this month",
			icon: TrendingUp,
			trend: "+23%",
		},
		{
			title: "Users",
			value: stats.users,
			description: "Active users",
			icon: Users,
			trend: "+5%",
		},
	];
}
