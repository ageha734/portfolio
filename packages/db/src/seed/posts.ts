import type { PrismaClient, Tag } from "@prisma/client";

export async function seedPosts(prisma: PrismaClient, tags: { tagTypescript: Tag; tagReact: Tag }) {
    const { tagTypescript, tagReact } = tags;

    // ブログ投稿の作成
    const post = await prisma.post.upsert({
        where: { slug: "welcome-to-my-blog" },
        update: {},
        create: {
            title: "Welcome to My Blog",
            slug: "welcome-to-my-blog",
            date: new Date(),
            description: "This is my first blog post",
            content: "<p>Welcome to my blog! This is a sample post.</p>",
            imageTemp: "https://via.placeholder.com/800x400",
            intro: "Introduction to the blog",
            sticky: true,
        },
    });

    // 投稿とタグの関連付け
    await prisma.postTag.upsert({
        where: {
            postId_tagId: {
                postId: post.id,
                tagId: tagTypescript.id,
            },
        },
        update: {},
        create: {
            postId: post.id,
            tagId: tagTypescript.id,
        },
    });

    await prisma.postTag.upsert({
        where: {
            postId_tagId: {
                postId: post.id,
                tagId: tagReact.id,
            },
        },
        update: {},
        create: {
            postId: post.id,
            tagId: tagReact.id,
        },
    });

    // 投稿画像の作成
    await prisma.postImage.upsert({
        where: {
            id: "img-1",
        },
        update: {},
        create: {
            id: "img-1",
            postId: post.id,
            url: "https://via.placeholder.com/1200x600",
        },
    });

    return post;
}
