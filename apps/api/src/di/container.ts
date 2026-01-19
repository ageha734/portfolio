import { CachedPortfolioRepository } from "~/infra/cached-portfolio.repository";
import { CachedPostRepository } from "~/infra/cached-post.repository";
import { GetPortfolioBySlugUseCase } from "~/usecase/getPortfolioBySlug";
import { GetPortfoliosUseCase } from "~/usecase/getPortfolios";
import { GetPostBySlugUseCase } from "~/usecase/getPostBySlug";
import { GetPostsUseCase } from "~/usecase/getPosts";

export class DIContainer {
    private readonly postRepository: CachedPostRepository;
    private readonly portfolioRepository: CachedPortfolioRepository;

    constructor(readonly databaseUrl?: string, readonly redisUrl?: string) {
        this.postRepository = new CachedPostRepository(databaseUrl, redisUrl);
        this.portfolioRepository = new CachedPortfolioRepository(
            databaseUrl,
            redisUrl,
        );
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
