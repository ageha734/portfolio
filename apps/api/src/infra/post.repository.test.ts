import { describe, expect, test, vi } from "vitest";
import { D1PostRepository } from "./post.repository";
import type { Post } from "../domain/post";
import { createPrismaClient } from "@portfolio/db";

// Mock Prisma client
vi.mock("@portfolio/db", () => ({
    createPrismaClient: vi.fn(),
}));

describe("D1PostRepository", () => {
    test("should create repository instance", () => {
        const mockD1 = {} as D1Database;
        const repository = new D1PostRepository(mockD1);

        expect(repository).toBeDefined();
    });

    test("should implement findAll", async () => {
        const mockD1 = {} as D1Database;
        const mockPosts: Post[] = [];

        vi.mocked(createPrismaClient).mockReturnValue({
            post: {
                findMany: vi.fn().mockResolvedValue([]),
            },
        } as any);

        const repository = new D1PostRepository(mockD1);
        const result = await repository.findAll();

        expect(result).toEqual(mockPosts);
    });

    test("should implement findBySlug", async () => {
        const mockD1 = {} as D1Database;

        vi.mocked(createPrismaClient).mockReturnValue({
            post: {
                findUnique: vi.fn().mockResolvedValue(null),
            },
        } as any);

        const repository = new D1PostRepository(mockD1);
        const result = await repository.findBySlug("test-slug");

        expect(result).toBeNull();
    });
});
