import { createPrismaClient } from "@portfolio/db";
import type { Post, PostRepository } from "~/domain/post";

export class PostRepositoryImpl implements PostRepository {
    constructor(private readonly databaseUrl?: string) {}

    async findAll(): Promise<Post[]> {
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
        const posts = await prisma.post.findMany({
            orderBy: { date: "desc" },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                images: true,
            },
        });

        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            description: post.description ?? undefined,
            content: post.content,
            contentRaw: post.contentRaw ? JSON.parse(post.contentRaw) : undefined,
            imageTemp: post.imageTemp,
            sticky: post.sticky,
            intro: post.intro ?? undefined,
            tags: post.tags.map((postTag) => postTag.tag.name),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));
    }

    async findBySlug(slug: string): Promise<Post | null> {
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                images: true,
            },
        });

        if (!post) return null;

        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            description: post.description ?? undefined,
            content: post.content,
            contentRaw: post.contentRaw ? JSON.parse(post.contentRaw) : undefined,
            imageTemp: post.imageTemp,
            sticky: post.sticky,
            intro: post.intro ?? undefined,
            tags: post.tags.map((postTag) => postTag.tag.name),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    async findById(id: string): Promise<Post | null> {
        const prisma = createPrismaClient({ databaseUrl: this.databaseUrl });
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                images: true,
            },
        });

        if (!post) return null;

        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            description: post.description ?? undefined,
            content: post.content,
            contentRaw: post.contentRaw ? JSON.parse(post.contentRaw) : undefined,
            imageTemp: post.imageTemp,
            sticky: post.sticky,
            intro: post.intro ?? undefined,
            tags: post.tags.map((postTag) => postTag.tag.name),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
}
