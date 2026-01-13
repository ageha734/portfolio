import { describe, expect, test } from "vitest";
import { DIContainer } from "./container";

describe("DIContainer", () => {
    test("should create container instance", () => {
        const mockD1 = {} as D1Database;
        const container = new DIContainer(mockD1);

        expect(container).toBeDefined();
    });

    test("should return post repository", () => {
        const mockD1 = {} as D1Database;
        const container = new DIContainer(mockD1);

        const repository = container.getPostRepository();
        expect(repository).toBeDefined();
    });

    test("should return portfolio repository", () => {
        const mockD1 = {} as D1Database;
        const container = new DIContainer(mockD1);

        const repository = container.getPortfolioRepository();
        expect(repository).toBeDefined();
    });

    test("should return use cases", () => {
        const mockD1 = {} as D1Database;
        const container = new DIContainer(mockD1);

        expect(container.getGetPostsUseCase()).toBeDefined();
        expect(container.getGetPostBySlugUseCase()).toBeDefined();
        expect(container.getGetPortfoliosUseCase()).toBeDefined();
        expect(container.getGetPortfolioBySlugUseCase()).toBeDefined();
    });
});
