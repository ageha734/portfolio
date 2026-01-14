import type { D1Database } from "@cloudflare/workers-types";
import { describe, expect, test, vi } from "vitest";
import { seed } from "./seed";

const _consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
    // Intentionally empty to suppress console output in tests
});
const _consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {
    // Intentionally empty to suppress console output in tests
});

vi.mock("./client", () => ({
    createPrismaClient: vi.fn(() => ({
        tag: {
            upsert: vi.fn().mockResolvedValue({ id: "tag-1", name: "TypeScript" }),
        },
        user: {
            upsert: vi.fn().mockResolvedValue({
                id: "user-1",
                name: "Admin User",
                email: "admin@example.com",
            }),
        },
        userExperience: {
            upsert: vi.fn().mockResolvedValue({
                id: "exp-1",
                userId: "user-1",
                company: "Example Company",
            }),
        },
        userSocial: {
            upsert: vi.fn().mockResolvedValue({
                id: "social-1",
                userId: "user-1",
                icon: "github",
            }),
        },
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
        portfolio: {
            upsert: vi.fn().mockResolvedValue({
                id: "portfolio-1",
                slug: "example-project",
                title: "Example Project",
            }),
        },
        portfolioImage: {
            upsert: vi.fn().mockResolvedValue({
                id: "port-img-1",
                portfolioId: "portfolio-1",
                url: "https://via.placeholder.com/800x600",
            }),
        },
        $disconnect: vi.fn().mockResolvedValue(undefined),
    })),
}));

describe("seed", () => {
    test("should call seed function with D1Database", async () => {
        const mockD1 = {} as D1Database;

        await expect(seed(mockD1)).resolves.not.toThrow();
    });

    test("should call seed function with database URL", async () => {
        const databaseUrl = process.env.DATABASE_URL || "mysql://user:password@localhost:3306/portfolio";

        await expect(seed(undefined, databaseUrl)).resolves.not.toThrow();
    });

    test("should call seed function without options", async () => {
        await expect(seed()).resolves.not.toThrow();
    });

    test("should disconnect Prisma client after seeding", async () => {
        const mockD1 = {} as D1Database;
        const { createPrismaClient } = await import("./client");

        await seed(mockD1);

        const mockPrisma = createPrismaClient({ d1: mockD1 });
        expect(mockPrisma.$disconnect).toHaveBeenCalled();
    });
});
