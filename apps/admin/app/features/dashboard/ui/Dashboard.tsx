import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@portfolio/ui";
import { createStatCards } from "../lib/createStatCards";
import { useDashboardStats } from "../lib/useDashboardStats";

export function Dashboard() {
    const { stats } = useDashboardStats();
    const statCards = createStatCards(stats);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your CMS dashboard</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="font-bold text-2xl">{stat.value}</div>
                            <p className="text-muted-foreground text-xs">{stat.description}</p>
                            {stat.trend && <p className="mt-1 text-green-600 text-xs">{stat.trend} from last month</p>}
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
                        <p className="text-muted-foreground text-sm">No recent activity</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-muted-foreground text-sm">• Create new post</p>
                            <p className="text-muted-foreground text-sm">• Add portfolio item</p>
                            <p className="text-muted-foreground text-sm">• Manage users</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
