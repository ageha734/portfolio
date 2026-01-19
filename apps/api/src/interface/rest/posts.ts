import type { Context } from "hono";
import { DIContainer } from "~/di/container";

export async function getPosts(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const redisUrl = c.env.REDIS_URL;

    try {
        const container = new DIContainer(databaseUrl, redisUrl);
        const useCase = container.getGetPostsUseCase();
        const posts = await useCase.execute();

        if (!posts || posts.length === 0) {
            return c.json({ error: "Posts not found" }, 404);
        }

        return c.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return c.json(
            {
                error: "Failed to fetch posts",
                details: error instanceof Error ? error.message : String(error),
            },
            500,
        );
    }
}

export async function getPostBySlug(c: Context) {
    const databaseUrl = c.env.DATABASE_URL;
    const redisUrl = c.env.REDIS_URL;
    const slug = c.req.param("slug");

    if (!slug) {
        return c.json({ error: "Invalid slug" }, 400);
    }

    try {
        const container = new DIContainer(databaseUrl, redisUrl);
        const useCase = container.getGetPostBySlugUseCase();
        const post = await useCase.execute(slug);

        if (!post) {
            return c.json({ error: "Post not found" }, 404);
        }

        return c.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return c.json(
            {
                error: "Failed to fetch post",
                details: error instanceof Error ? error.message : String(error),
            },
            500,
        );
    }
}
