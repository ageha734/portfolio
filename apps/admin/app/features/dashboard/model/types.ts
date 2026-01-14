export interface DashboardStats {
    posts: number;
    portfolios: number;
    totalViews: number;
    users: number;
}

export interface StatCard {
    title: string;
    value: number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
}
