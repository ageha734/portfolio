export async function seedTags(prisma) {
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
