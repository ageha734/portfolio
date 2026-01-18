import type { PrismaClient, Tag } from "@prisma/client";

export declare function seedTags(prisma: PrismaClient): Promise<{
    tagTypescript: Tag;
    tagReact: Tag;
}>;
