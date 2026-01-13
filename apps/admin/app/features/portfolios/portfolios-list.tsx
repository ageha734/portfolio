import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@portfolio/ui";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { trpc } from "~/shared/lib/trpc";
import type { Portfolio } from "@portfolio/api";

export function PortfoliosList() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                setLoading(true);
                const data = await trpc.portfolios.list.query();
                setPortfolios(data || []);
            } catch (error) {
                console.error("Failed to fetch portfolios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Loading portfolios...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Portfolios</h1>
                    <p className="text-muted-foreground">Manage your portfolio items</p>
                </div>
                <Button asChild>
                    <Link to="/portfolios/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Portfolio
                    </Link>
                </Button>
            </div>

            {portfolios.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No portfolios found</CardTitle>
                        <CardDescription>Get started by creating your first portfolio item</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link to="/portfolios/new">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Portfolio
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {portfolios.map((portfolio) => (
                        <Card key={portfolio.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <CardTitle>{portfolio.title}</CardTitle>
                                        <CardDescription>{portfolio.company}</CardDescription>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{new Date(portfolio.date).toLocaleDateString()}</span>
                                            {portfolio.current && (
                                                <span className="text-green-600">Current</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/portfolios/${portfolio.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            {portfolio.overview && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {portfolio.overview}
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
