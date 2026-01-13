import { describe, expect, test, vi } from "vitest";
import { GetPostsUseCase } from "./getPosts";
import type { Post, PostRepository } from "../domain/post";

describe("GetPostsUseCase", () => {
    test("should return all posts", async () => {
        const mockPosts: Post[] = [
            {
                id: "1",
                title: "Test Post",
                slug: "test-post",
                date: new Date(),
                content: "Test content",
                imageTemp: "test.jpg",
                sticky: false,
                tags: ["test"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const mockRepository: PostRepository = {
            findAll: vi.fn().mockResolvedValue(mockPosts),
            findBySlug: vi.fn(),
            findById: vi.fn(),
        };

        const useCase = new GetPostsUseCase(mockRepository);
        const result = await useCase.execute();

        expect(result).toEqual(mockPosts);
        expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
});
