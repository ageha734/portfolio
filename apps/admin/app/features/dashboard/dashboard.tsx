import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@portfolio/ui";
import { FileText, Briefcase, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "~/shared/lib/trpc";

export function Dashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        portfolios: 0,
        totalViews: 0,
        users: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postsData, portfoliosData] = await Promise.all([
                    trpc.posts.list.query(),
                    trpc.portfolios.list.query(),
                ]);

                setStats({
                    posts: postsData?.length || 0,
                    portfolios: portfoliosData?.length || 0,
                    totalViews: 0, // TODO: Implement views tracking
                    users: 0, // TODO: Implement user count
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your CMS dashboard</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                            {stat.trend && (
                                <p className="text-xs text-green-600 mt-1">{stat.trend} from last month</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates and changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No recent activity</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">• Create new post</p>
                            <p className="text-sm text-muted-foreground">• Add portfolio item</p>
                            <p className="text-sm text-muted-foreground">• Manage users</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
