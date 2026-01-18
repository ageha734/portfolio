import type { PrismaClient } from "@prisma/client";

export async function seedTags(prisma: PrismaClient) {
    const tagTypescript = await prisma.tag.upsert({
        where: { name: "TypeScript" },
        update: {},
        create: { name: "TypeScript" },
    });

    const tagReact = await prisma.tag.upsert({
        where: { name: "React" },
        update: {},
        create: { name: "React" },
    });

    return {
        tagTypescript,
        tagReact,
    };
}
