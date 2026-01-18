import type { PrismaClient, Tag } from "@prisma/client";
export declare function seedPosts(prisma: PrismaClient, tags: {
    tagTypescript: Tag;
    tagReact: Tag;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    description: string | null;
    title: string;
    slug: string;
    content: string;
    contentRaw: string | null;
    imageTemp: string;
    sticky: boolean;
    intro: string | null;
}>;
//# sourceMappingURL=posts.d.ts.map