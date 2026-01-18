export async function seedPortfolios(prisma) {
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
    return portfolio;
}
