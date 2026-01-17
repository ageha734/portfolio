import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolios/new")({
    component: () => (
        <div className="space-y-6">
            <div>
                <h1 className="font-bold text-3xl tracking-tight">New Portfolio</h1>
                <p className="text-muted-foreground">Create a new portfolio item</p>
            </div>
            <div className="text-muted-foreground">
                <p>Portfolio creation form will be implemented here.</p>
            </div>
        </div>
    ),
});
