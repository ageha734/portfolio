import type { D1Database } from "@cloudflare/workers-types";
import { D1PortfolioRepository } from "../infra/portfolio.repository";
import { D1PostRepository } from "../infra/post.repository";
import { GetPortfolioBySlugUseCase } from "../usecase/getPortfolioBySlug";
import { GetPortfoliosUseCase } from "../usecase/getPortfolios";
import { GetPostBySlugUseCase } from "../usecase/getPostBySlug";
import { GetPostsUseCase } from "../usecase/getPosts";

export class DIContainer {
    private postRepository: D1PostRepository;
    private portfolioRepository: D1PortfolioRepository;

    constructor(readonly db: D1Database) {
        this.postRepository = new D1PostRepository(db);
        this.portfolioRepository = new D1PortfolioRepository(db);
    }

    getPostRepository() {
        return this.postRepository;
    }

    getPortfolioRepository() {
        return this.portfolioRepository;
    }

    getGetPostsUseCase() {
        return new GetPostsUseCase(this.postRepository);
    }

    getGetPostBySlugUseCase() {
        return new GetPostBySlugUseCase(this.postRepository);
    }

    getGetPortfoliosUseCase() {
        return new GetPortfoliosUseCase(this.portfolioRepository);
    }

    getGetPortfolioBySlugUseCase() {
        return new GetPortfolioBySlugUseCase(this.portfolioRepository);
    }
}
