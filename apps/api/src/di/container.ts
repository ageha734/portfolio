import type { R2Bucket } from "@cloudflare/workers-types";
import { CachedPortfolioRepository } from "~/infra/cached-portfolio.repository";
import { CachedPostRepository } from "~/infra/cached-post.repository";
import { GetPortfolioBySlugUseCase } from "~/usecase/getPortfolioBySlug";
import { GetPortfoliosUseCase } from "~/usecase/getPortfolios";
import { GetPostBySlugUseCase } from "~/usecase/getPostBySlug";
import { GetPostsUseCase } from "~/usecase/getPosts";
import { UploadPortfolioImageUseCase } from "~/usecase/uploadPortfolioImage";

export class DIContainer {
    private readonly postRepository: CachedPostRepository;
    private readonly portfolioRepository: CachedPortfolioRepository;

    constructor(
        readonly databaseUrl?: string,
        readonly redisUrl?: string,
        private readonly r2Bucket?: R2Bucket,
        private readonly r2PublicUrl?: string,
    ) {
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

    getUploadPortfolioImageUseCase() {
        if (!this.r2Bucket || !this.r2PublicUrl) {
            throw new Error("R2 bucket and public URL must be configured");
        }
        return new UploadPortfolioImageUseCase(
            this.portfolioRepository,
            this.r2Bucket,
            this.r2PublicUrl,
        );
    }
}
