import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@portfolio/ui";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { trpc } from "~/shared/lib/trpc";
import type { Post } from "@portfolio/api";

export function PostsList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await trpc.posts.list.query();
                setPosts(data || []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Loading posts...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground">Manage your blog posts</p>
                </div>
                <Button asChild>
                    <Link to="/posts/new">
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
                            <Link to="/posts/new">
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
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            {post.tags && post.tags.length > 0 && <span>{post.tags.length} tags</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/posts/${post.id}/edit`}>
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
