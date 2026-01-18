import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@portfolio/ui";
import { Link } from "@tanstack/react-router";
import { Edit, Plus, Trash2 } from "lucide-react";
import { usePosts } from "../lib/usePosts";

export function PostsList() {
    const { posts, loading, error } = usePosts();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-muted-foreground">Loading posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-red-600">Failed to load posts: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl tracking-tight">Posts</h1>
                    <p className="text-muted-foreground">Manage your blog posts</p>
                </div>
                <Button asChild>
                    <Link to={"/posts/new" as any}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            {posts.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No posts found</CardTitle>
                        <CardDescription>Get started by creating your first post</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link to={"/posts/new" as any}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Post
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription>{post.description || "No description"}</CardDescription>
                                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            {post.tags && post.tags.length > 0 && <span>{post.tags.length} tags</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/posts/${post.id}/edit` as any}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
