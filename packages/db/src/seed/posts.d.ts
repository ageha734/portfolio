import type { PrismaClient, Post, Tag } from "@prisma/client";

export declare function seedPosts(prisma: PrismaClient, tags: { tagTypescript: Tag; tagReact: Tag }): Promise<Post>;
