import type { PrismaClient } from "@prisma/client";

export async function seedUser(prisma: PrismaClient) {
    // ユーザーの作成
    const user = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            id: "admin-user-1",
            name: "Admin User",
            email: "admin@example.com",
            bio: "Software developer and tech enthusiast",
            image: "https://via.placeholder.com/150",
        },
    });

    // ユーザーの経験の作成
    await prisma.userExperience.upsert({
        where: {
            id: "exp-1",
        },
        update: {},
        create: {
            id: "exp-1",
            userId: user.id,
            company: "Example Company",
            companyUrl: "https://example.com",
            date: "2024 - Present",
            dateStart: new Date("2024-01-01"),
            title: "Senior Software Engineer",
            description: "Leading development of web applications",
            highlights: JSON.stringify([
                "Developed scalable web applications",
                "Led team of 5 developers",
                "Improved performance by 40%",
            ]),
            tags: JSON.stringify(["TypeScript", "React", "Node.js"]),
        },
    });

    // ユーザーのソーシャルリンクの作成
    await prisma.userSocial.upsert({
        where: {
            id: "social-1",
        },
        update: {},
        create: {
            id: "social-1",
            userId: user.id,
            icon: "github",
            title: "GitHub",
            url: "https://github.com/example",
        },
    });

    await prisma.userSocial.upsert({
        where: {
            id: "social-2",
        },
        update: {},
        create: {
            id: "social-2",
            userId: user.id,
            icon: "twitter",
            title: "Twitter",
            url: "https://twitter.com/example",
        },
    });

    return user;
}
