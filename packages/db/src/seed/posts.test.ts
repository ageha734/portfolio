import type { PrismaClient } from "@prisma/client";
import { describe, expect, test, vi } from "vitest";
import { seedPosts } from "./posts";

describe("seedPosts", () => {
    test("should create post, post tags, and post images", async () => {
        const mockPrisma = {
            post: {
                upsert: vi.fn().mockResolvedValue({
                    id: "post-1",
                    slug: "welcome-to-my-blog",
                    title: "Welcome to My Blog",
                }),
            },
            postTag: {
                upsert: vi.fn().mockResolvedValue({
                    postId: "post-1",
                    tagId: "tag-1",
                }),
            },
            postImage: {
                upsert: vi.fn().mockResolvedValue({
                    id: "img-1",
                    postId: "post-1",
                    url: "https://via.placeholder.com/1200x600",
                }),
            },
        } as unknown as PrismaClient;

        const tags = {
            tagTypescript: { id: "tag-1", name: "TypeScript" },
            tagReact: { id: "tag-2", name: "React" },
        };

        const result = await seedPosts(mockPrisma, tags);

        expect(mockPrisma.post.upsert).toHaveBeenCalledTimes(1);
        expect(mockPrisma.postTag.upsert).toHaveBeenCalledTimes(2);
        expect(mockPrisma.postImage.upsert).toHaveBeenCalledTimes(1);
        expect(result).toBeDefined();
    });
});
