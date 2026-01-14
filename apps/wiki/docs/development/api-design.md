# API設計ガイドライン

このプロジェクトでは、tRPCを使用して型安全なAPIを実装しています。

## tRPC の概要

tRPCは、TypeScriptで型安全なAPIを構築するためのフレームワークです。

### 主な特徴

- **型安全性**: エンドツーエンドの型安全性
- **自動型推論**: クライアント側で自動的に型が推論される
- **軽量**: オーバーヘッドが少ない
- **統合**: Honoと統合して使用

## アーキテクチャ

### サーバー側

```typescript
// packages/api/src/trpc.ts
import { initTRPC } from "@trpc/server";

export interface Context {
    db?: D1Database;
    user?: { id: string };
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
```

### クライアント側

```typescript
// apps/web/app/shared/lib/trpc.ts
import { createTRPCProxyClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import type { AppRouter } from "@portfolio/api";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
        }),
    ],
});
```

## ルーターの定義

### 基本的なルーター

```typescript
// apps/api/src/interface/trpc/posts.ts
import { router, publicProcedure } from "@portfolio/api";
import { z } from "zod";

export const postsRouter = router({
    // クエリ: データの取得
    list: publicProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).default(10),
            offset: z.number().min(0).default(0),
        }))
        .query(async ({ input, ctx }) => {
            // データベースから取得
            const posts = await getPosts(input.limit, input.offset);
            return posts;
        }),

    // ミューテーション: データの変更
    create: publicProcedure
        .input(z.object({
            title: z.string().min(1),
            content: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            // データベースに保存
            const post = await createPost(input);
            return post;
        }),
});
```

### ルーターの統合

```typescript
// apps/api/src/interface/trpc/router.ts
import { router } from "@portfolio/api";
import { postsRouter } from "./posts";
import { portfoliosRouter } from "./portfolios";

export const appRouter = router({
    posts: postsRouter,
    portfolios: portfoliosRouter,
});

export type AppRouter = typeof appRouter;
```

## 入力バリデーション

### Zodスキーマの使用

```typescript
import { z } from "zod";

// 基本的なスキーマ
const createPostSchema = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    publishedAt: z.date().optional(),
});

// ネストされたスキーマ
const createPostWithTagsSchema = z.object({
    title: z.string().min(1),
    tags: z.array(z.string()).min(1),
    metadata: z.object({
        description: z.string().optional(),
        image: z.string().url().optional(),
    }),
});

// 条件付きバリデーション
const updatePostSchema = z.object({
    id: z.string(),
    title: z.string().min(1).optional(),
    content: z.string().optional(),
}).refine((data) => data.title || data.content, {
    message: "Either title or content must be provided",
});
```

### カスタムバリデーション

```typescript
// packages/api/src/schema/zod/post.ts
import { z } from "zod";

export const postSlugSchema = z.string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens");

export const createPostSchema = z.object({
    title: z.string().min(1).max(200),
    slug: postSlugSchema,
    content: z.string().min(1),
});
```

## エラーハンドリング

### エラーの定義

```typescript
import { TRPCError } from "@trpc/server";

// エラーをスロー
throw new TRPCError({
    code: "NOT_FOUND",
    message: "Post not found",
});

// エラーコードの種類
// - BAD_REQUEST: 400
// - UNAUTHORIZED: 401
// - FORBIDDEN: 403
// - NOT_FOUND: 404
// - CONFLICT: 409
// - INTERNAL_SERVER_ERROR: 500
```

### エラーハンドリングの実装

```typescript
export const postsRouter = router({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const post = await getPost(input.id);

            if (!post) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Post with id ${input.id} not found`,
                });
            }

            return post;
        }),
});
```

## 認証と認可

### 保護されたプロシージャ

```typescript
// 認証が必要なプロシージャを作成
const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Authentication required",
        });
    }

    return next({
        ctx: {
            ...ctx,
            user: ctx.user, // 型が推論される
        },
    });
});

// 使用例
export const postsRouter = router({
    create: protectedProcedure
        .input(createPostSchema)
        .mutation(async ({ input, ctx }) => {
            // ctx.user が確実に存在する
            return await createPost(input, ctx.user.id);
        }),
});
```

### ロールベースの認可

```typescript
// 管理者のみが実行可能なプロシージャ
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    if (ctx.user.role !== "admin") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access required",
        });
    }

    return next({ ctx });
});
```

## クエリの最適化

### ページネーション

```typescript
export const postsRouter = router({
    list: publicProcedure
        .input(z.object({
            page: z.number().min(1).default(1),
            pageSize: z.number().min(1).max(100).default(10),
        }))
        .query(async ({ input, ctx }) => {
            const { page, pageSize } = input;
            const offset = (page - 1) * pageSize;

            const [posts, total] = await Promise.all([
                getPosts({ limit: pageSize, offset }),
                getPostCount(),
            ]);

            return {
                posts,
                pagination: {
                    page,
                    pageSize,
                    total,
                    totalPages: Math.ceil(total / pageSize),
                },
            };
        }),
});
```

### フィルタリングとソート

```typescript
export const postsRouter = router({
    list: publicProcedure
        .input(z.object({
            filter: z.object({
                tags: z.array(z.string()).optional(),
                published: z.boolean().optional(),
            }).optional(),
            sort: z.enum(["date", "title"]).default("date"),
            order: z.enum(["asc", "desc"]).default("desc"),
        }))
        .query(async ({ input, ctx }) => {
            return await getPosts({
                filter: input.filter,
                sort: input.sort,
                order: input.order,
            });
        }),
});
```

## バッチリクエスト

tRPCは自動的にバッチリクエストを処理します。

```typescript
// クライアント側
const [posts, portfolios] = await Promise.all([
    trpc.posts.list.query(),
    trpc.portfolios.list.query(),
]);

// サーバー側では1つのリクエストとして処理される
```

## 型の共有

### サーバー側の型定義

```typescript
// packages/api/src/router/posts.ts
export type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
};

export const postsRouter = router({
    list: publicProcedure.query<Post[]>(async () => {
        // ...
    }),
});
```

### クライアント側での型の使用

```typescript
// apps/web/app/shared/api/posts.ts
import type { Post } from "@portfolio/api";

export const usePosts = () => {
    const { data, isLoading } = trpc.posts.list.useQuery();

    return {
        posts: data as Post[] | undefined,
        isLoading,
    };
};
```

## ベストプラクティス

### 1. スキーマの再利用

```typescript
// packages/api/src/schema/zod/common.ts
export const paginationSchema = z.object({
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(10),
});

// 使用例
export const postsRouter = router({
    list: publicProcedure
        .input(paginationSchema)
        .query(async ({ input }) => {
            // ...
        }),
});
```

### 2. エラーメッセージの明確化

```typescript
// ✅ Good: 明確なエラーメッセージ
throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Title must be between 1 and 200 characters",
});

// ❌ Bad: 曖昧なエラーメッセージ
throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Invalid input",
});
```

### 3. 適切なHTTPステータスコードの使用

```typescript
// リソースが見つからない場合
throw new TRPCError({
    code: "NOT_FOUND",
    message: "Post not found",
});

// 認証が必要な場合
throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Authentication required",
});

// 権限がない場合
throw new TRPCError({
    code: "FORBIDDEN",
    message: "You don't have permission",
});
```

### 4. 入力のサニタイゼーション

```typescript
import { z } from "zod";

// HTMLタグを除去
const sanitizeHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
};

export const createPostSchema = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1).transform(sanitizeHtml),
});
```

## テスト

### ユニットテスト

```typescript
// apps/api/src/interface/trpc/posts.test.ts
import { describe, expect, it } from "vitest";
import { createCaller } from "./router";

describe("postsRouter", () => {
    it("should return posts", async () => {
        const caller = createCaller({ db: mockDb });
        const result = await caller.posts.list();

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
    });
});
```

## TypeSpec設定

このプロジェクトでは、TypeSpecを使用してOpenAPI仕様を生成する設定が含まれています。

### 設定ファイル

`packages/api/tspconfig.yaml` にTypeSpecの設定が定義されています。

```yaml
emit:
- '@typespec/openapi3'

options:
    '@typespec/openapi3':
        # TODO:
        output-file: '../../docs/swagger/openapi.yaml'
```

### 設定の説明

- **`emit`**: 出力形式を指定します。`@typespec/openapi3` を使用してOpenAPI 3.0仕様を生成します。
- **`options['@typespec/openapi3']`**: OpenAPI3エミッターのオプション設定
  - **`output-file`**: 生成されるOpenAPI仕様ファイルの出力パス（現在はTODO状態）

### 使用方法

```bash
# TypeSpecスキーマからOpenAPI仕様を生成
cd packages/api
bunx tsp compile
```

### 今後の拡張

現在、`output-file` はTODO状態ですが、将来的には以下のような用途で使用されます：

- APIドキュメントの自動生成
- クライアントSDKの生成
- API仕様の共有と検証

## 参考資料

- [tRPC ドキュメント](https://trpc.io/docs)
- [Zod ドキュメント](https://zod.dev/)
- [Hono ドキュメント](https://hono.dev/)
- [TypeSpec ドキュメント](https://typespec.io/)
