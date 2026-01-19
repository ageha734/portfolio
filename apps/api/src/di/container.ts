import { PortfolioRepositoryImpl } from "~/infra/portfolio.repository";
import { PostRepositoryImpl } from "~/infra/post.repository";
import { GetPortfolioBySlugUseCase } from "~/usecase/getPortfolioBySlug";
import { GetPortfoliosUseCase } from "~/usecase/getPortfolios";
import { GetPostBySlugUseCase } from "~/usecase/getPostBySlug";
import { GetPostsUseCase } from "~/usecase/getPosts";

export class DIContainer {
    private readonly postRepository: PostRepositoryImpl;
    private readonly portfolioRepository: PortfolioRepositoryImpl;

    constructor(readonly databaseUrl?: string) {
        this.postRepository = new PostRepositoryImpl(databaseUrl);
        this.portfolioRepository = new PortfolioRepositoryImpl(databaseUrl);
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
