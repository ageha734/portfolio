import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/new")({
    component: () => (
        <div className="space-y-6">
            <div>
                <h1 className="font-bold text-3xl tracking-tight">New Post</h1>
                <p className="text-muted-foreground">Create a new blog post</p>
            </div>
            <div className="text-muted-foreground">
                <p>Post creation form will be implemented here.</p>
            </div>
        </div>
    ),
});
