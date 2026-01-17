# Domain-Driven Design (DDD)

このプロジェクトでは、**Domain-Driven Design (DDD)** アーキテクチャを採用しています。
DDDは、複雑なビジネスロジックを扱うバックエンドアプリケーションの設計手法です。

## 適用範囲

DDDは次のアプリケーションで採用されています。

- **`apps/api`**: Hono + Cloudflare Workers + D1ベースのCMS API

## レイヤー構造

DDDは、アプリケーションを次のレイヤーに分割します。

### app/ (DDD Root)

すべてのレイヤーは`app/`ディレクトリ配下に配置されます。

```text
app/
├── usecase/          # Application Rules (ユースケース層)
├── service/          # Domain Services (ドメインサービス層)
├── domain/           # Enterprise Rules (ドメイン層)
├── infra/            # Frameworks (インフラストラクチャ層)
├── interface/        # Adapters (インターフェース層)
├── pkg/              # Shared internal packages
└── di/               # Dependency Injection
```

### usecase/ (Application Rules)

アプリケーション固有のビジネスロジックを実装します。

- ユースケース（ユーザーの操作単位）を表現
- ドメインサービスやリポジトリを組み合わせて処理を実現
- トランザクション管理やエラーハンドリングを含む

```text
usecase/
└── <ドメイン名>/
    └── <ユースケース名>.ts
```

**例:**

- `usecase/blog/createBlog.ts`
- `usecase/blog/getBlogBySlug.ts`
- `usecase/portfolio/listPortfolios.ts`

### service/ (Domain Services)

ドメインロジックで、単一のエンティティに属さない処理を実装します。

- 複数のエンティティにまたがるビジネスロジック
- ドメインの概念を表現するサービス
- エンティティの責務を超えた処理

```text
service/
└── <サービス名>.ts
```

**例:**

- `service/blogService.ts`: ブログ関連のドメインロジック
- `service/portfolioService.ts`: ポートフォリオ関連のドメインロジック

### domain/ (Enterprise Rules)

ドメインの核心となるビジネスルールを定義します。

- **Model**: エンティティ、値オブジェクト、ドメインイベント
- **Repository Interface**: データアクセスの抽象化

```text
domain/
└── <ドメイン名>/
    ├── model/
    │   ├── entity.ts           # エンティティ
    │   ├── valueObject.ts      # 値オブジェクト
    │   └── event.ts            # ドメインイベント
    └── repository.ts           # リポジトリインターフェース
```

**例:**

- `domain/blog/model/entity.ts`: Blogエンティティ
- `domain/blog/repository.ts`: BlogRepositoryインターフェース

### infra/ (Frameworks)

外部システムとの接続を実装します。

- **Repository Implementation**: リポジトリインターフェースの実装
- **Database**: D1（Cloudflare D1）へのアクセス
- **External Services**: 外部APIクライアントなど

```text
infra/
└── <ドメイン名>/
    └── repository/
        └── d1Repository.ts    # D1実装
```

**例:**

- `infra/blog/repository/d1BlogRepository.ts`: D1を使ったBlogRepositoryの実装

### interface/ (Adapters)

外部との接点を定義します。

- **REST Handlers**: REST APIエンドポイントの定義
- **Middleware**: 認証、ロギング、エラーハンドリングなど

```text
interface/
├── trpc/
│   ├── routers/
│   │   ├── blog.ts
│   │   └── portfolio.ts
│   └── root.ts
└── middleware/
    ├── auth.ts
    └── errorHandler.ts
```

**例:**

- `interface/rest/blog.ts`: ブログ関連のRESTハンドラー
- `interface/middleware/auth.ts`: 認証ミドルウェア

### pkg/ (Shared Internal Packages)

アプリケーション内で共有されるパッケージを配置します。

- 共通ユーティリティ
- 共有型定義
- 内部ライブラリ

```text
pkg/
├── logger/
├── validator/
└── types/
```

### di/ (Dependency Injection)

依存性注入の設定を管理します。

- 各レイヤーの依存関係を定義
- テスト時のモック注入を容易にする

```text
di/
└── container.ts
```

## 依存関係のルール

DDDの依存関係ルールに従い、外側のレイヤーから内側のレイヤーへのみ依存できます。

**許可される依存関係:**

- ✅ `interface/` → `usecase/`, `service/`, `domain/`, `pkg/`
- ✅ `usecase/` → `service/`, `domain/`, `pkg/`
- ✅ `service/` → `domain/`, `pkg/`
- ✅ `infra/` → `domain/`, `pkg/`
- ✅ `domain/` → `pkg/`（可能な限り最小限に）

**禁止される依存関係:**

- ❌ `domain/` → `usecase/`, `service/`, `infra/`, `interface/`
- ❌ `service/` → `usecase/`, `infra/`, `interface/`
- ❌ `usecase/` → `infra/`, `interface/`
- ❌ `infra/` → `usecase/`, `service/`, `interface/`
- ❌ 内側のレイヤーから外側のレイヤーへの依存（循環依存の防止）

## ディレクトリ構造のルール

### アプリケーション層 (`apps/api`)

- **必須**: `app/`ディレクトリをソースルートとして使用します
- **禁止**: `src/`ディレクトリは使用しません
- 例: `apps/api/app/`

### 命名規則

- **重要**: `utils`というディレクトリ名は**厳格に禁止**されています
- 代わりに`lib`、`shared`、`infra`、または具体的な名前を使用してください

## 実装例

### Domain Layer の実装例

```typescript
// app/domain/blog/model/entity.ts
export class Blog {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly publishedAt: Date,
    public readonly slug: string,
  ) {}

  static create(props: CreateBlogProps): Blog {
    // ビジネスルールの検証
    if (!props.title || props.title.length === 0) {
      throw new Error('Title is required');
    }
    return new Blog(
      generateId(),
      props.title,
      props.content,
      new Date(),
      generateSlug(props.title),
    );
  }
}

// app/domain/blog/repository.ts
export interface BlogRepository {
  findById(id: string): Promise<Blog | null>;
  findBySlug(slug: string): Promise<Blog | null>;
  save(blog: Blog): Promise<void>;
  delete(id: string): Promise<void>;
}
```

### Infrastructure Layer の実装例

```typescript
// app/infra/blog/repository/d1BlogRepository.ts
import { BlogRepository } from '~/domain/blog/repository';
import { Blog } from '~/domain/blog/model/entity';
import { getD1Database } from '~/infra/database';

export class D1BlogRepository implements BlogRepository {
  async findById(id: string): Promise<Blog | null> {
    const db = getD1Database();
    const result = await db
      .prepare('SELECT * FROM blogs WHERE id = ?')
      .bind(id)
      .first<BlogRow>();

    return result ? this.toDomain(result) : null;
  }

  private toDomain(row: BlogRow): Blog {
    return new Blog(
      row.id,
      row.title,
      row.content,
      new Date(row.published_at),
      row.slug,
    );
  }
}
```

### Use Case Layer の実装例

```typescript
// app/usecase/blog/createBlog.ts
import { BlogRepository } from '~/domain/blog/repository';
import { Blog } from '~/domain/blog/model/entity';

export class CreateBlogUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(props: CreateBlogProps): Promise<Blog> {
    const blog = Blog.create(props);
    await this.blogRepository.save(blog);
    return blog;
  }
}
```

### Interface Layer の実装例

```typescript
// app/interface/rest/blog.ts
import type { Context } from "hono";
import { CreateBlogUseCase } from '~/usecase/blog/createBlog';
import { getBlogRepository } from '~/di/container';

export const blogRouter = router({
  create: publicProcedure
    .input(createBlogSchema)
    .mutation(async ({ input }) => {
      const repository = getBlogRepository();
      const useCase = new CreateBlogUseCase(repository);
      return await useCase.execute(input);
    }),
});
```

## 参考資料

- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- [Implementing Domain-Driven Design (Vaughn Vernon)](https://vaughnvernon.com/implementing-domain-driven-design/)
- [DDD Reference](https://www.domainlanguage.com/ddd/reference/)
