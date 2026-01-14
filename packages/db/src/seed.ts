import type { D1Database } from "@cloudflare/workers-types";
import { createPrismaClient } from "./client";

export async function seed(d1?: D1Database, databaseUrl?: string) {
	const prisma = createPrismaClient({ d1, databaseUrl });

	try {
		// タグの作成
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

		// ユーザーの作成
		const user = await prisma.user.upsert({
			where: { email: "admin@example.com" },
			update: {},
			create: {
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

		// ポートフォリオの作成
		const portfolio = await prisma.portfolio.upsert({
			where: { slug: "example-project" },
			update: {},
			create: {
				title: "Example Project",
				slug: "example-project",
				company: "Example Company",
				date: new Date(),
				current: true,
				overview: "A sample portfolio project",
				description: "This is a sample portfolio project description",
				content: "<p>Project details here...</p>",
				thumbnailTemp: "https://via.placeholder.com/400x300",
				intro: "Project introduction",
			},
		});

		// ポートフォリオ画像の作成
		await prisma.portfolioImage.upsert({
			where: {
				id: "port-img-1",
			},
			update: {},
			create: {
				id: "port-img-1",
				portfolioId: portfolio.id,
				url: "https://via.placeholder.com/800x600",
			},
		});

		console.log("Seed completed successfully");
	} catch (error) {
		console.error("Error seeding database:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

if (import.meta.main) {
	console.log("Seed script - provide D1 database instance to run");
}
