---
title: "データベース管理"
---

このプロジェクトでは、PrismaとCloudflare D1を使用してデータベースを管理しています。

## データベース構成

### Cloudflare D1

- **本番環境**: Cloudflare D1（SQLiteベースの分散データベース）
- **開発環境**: ローカルSQLiteファイル（`dev.db`）

### Prisma

- **ORM**: Prisma
- **アダプター**: `@prisma/adapter-d1`（本番環境）
- **スキーマ**: `packages/db/prisma/schema.prisma`

## データベーススキーマ

### スキーマファイル

スキーマファイルは `packages/db/prisma/schema.prisma` に定義されています。

```prisma
// packages/db/prisma/schema.prisma
generator client {
    provider        = "prisma-client-js"
    previewFeatures = ["driverAdapters"]
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}

model Post {
    id          String   @id @default(uuid())
    title       String
    slug        String   @unique
    date        DateTime
    description String?
    content     String
    createdAt   DateTime @default(now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")

    @@map("posts")
}
```

## Prisma Client の使用

### Client の作成

```typescript
// packages/db/src/client.ts
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

export function createPrismaClient(options: {
    d1?: D1Database;
    databaseUrl?: string;
}): PrismaClient {
    const { d1, databaseUrl } = options;

    // 本番環境: D1アダプターを使用
    if (d1) {
        const adapter = new PrismaD1(d1);
        return new PrismaClient({ adapter });
    }

    // 開発環境: MySQLを使用
    return new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl || process.env.DATABASE_URL,
            },
        },
    });
}
```

### Client の使用

```typescript
// apps/api/src/infra/post.repository.ts
import { createPrismaClient } from "@portfolio/db";

export class D1PostRepository {
    private prisma: PrismaClient;

    constructor(d1: D1Database) {
        this.prisma = createPrismaClient({ d1 });
    }

    async findById(id: string): Promise<Post | null> {
        return await this.prisma.post.findUnique({
            where: { id },
        });
    }
}
```

## マイグレーション

### マイグレーションの作成

```bash
# スキーマを変更後、マイグレーションファイルを生成
cd packages/db
bunx prisma migrate dev --name migration_name

# マイグレーションファイルが生成される
# prisma/migrations/YYYYMMDDHHMMSS_migration_name/migration.sql
```

### 開発環境でのマイグレーション

```bash
# スキーマをデータベースにプッシュ（開発環境のみ）
cd packages/db
bun run push
```

### 本番環境でのマイグレーション

```bash
# D1データベースにマイグレーションを適用
cd packages/db
wrangler d1 migrations apply portfolio-db

# または、package.jsonのスクリプトを使用
bun run migrate
```

### マイグレーションの確認

```bash
# マイグレーションの状態を確認
bunx prisma migrate status

# 適用済みのマイグレーションを確認
wrangler d1 migrations list portfolio-db
```

## シードデータ

### シードスクリプト

```typescript
// packages/db/src/seed.ts
import { createPrismaClient } from "./client";

export async function seed(d1?: D1Database, databaseUrl?: string) {
    const prisma = createPrismaClient({ d1, databaseUrl });

    // シードデータの投入
    await prisma.post.createMany({
        data: [
            {
                title: "First Post",
                slug: "first-post",
                date: new Date(),
                content: "Content here",
            },
        ],
    });
}
```

### シードの実行

```bash
# 開発環境でシードを実行
cd packages/db
bun run seed

# 本番環境でシードを実行（注意: 本番データを上書きする可能性あり）
wrangler d1 execute portfolio-db --file=./seed.sql
```

## データベースの操作

### Prisma Studio

Prisma Studioを使用してデータベースを視覚的に操作できます。

```bash
# Prisma Studioを起動
cd packages/db
bun run dev

# ブラウザで http://localhost:5555 を開く
```

### D1データベースの操作

```bash
# D1データベースの一覧を表示
wrangler d1 list

# SQLクエリを実行
wrangler d1 execute portfolio-db --command "SELECT * FROM posts"

# SQLファイルを実行
wrangler d1 execute portfolio-db --file=./query.sql

# ローカルD1データベースを使用（開発環境）
wrangler d1 execute portfolio-db --local --command "SELECT * FROM posts"
```

## データベースのバックアップ

### D1データベースのエクスポート

```bash
# データベースをエクスポート
wrangler d1 export portfolio-db --output=./backup.sql
```

### データベースのインポート

```bash
# データベースをインポート
wrangler d1 execute portfolio-db --file=./backup.sql
```

## パフォーマンス最適化

### インデックスの追加

```prisma
model Post {
    id          String   @id @default(uuid())
    slug        String   @unique  // ユニークインデックス
    title       String
    date        DateTime

    @@index([date])  // インデックスの追加
    @@map("posts")
}
```

### クエリの最適化

```typescript
// ✅ Good: 必要なフィールドのみ取得
const posts = await prisma.post.findMany({
    select: {
        id: true,
        title: true,
        slug: true,
    },
});

// ❌ Bad: すべてのフィールドを取得
const posts = await prisma.post.findMany();
```

### ページネーション

```typescript
// ページネーションを使用
const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
        date: "desc",
    },
});
```

## トラブルシューティング

### マイグレーションエラー

```bash
# マイグレーションをリセット（開発環境のみ）
bunx prisma migrate reset

# マイグレーションを再適用
bunx prisma migrate deploy
```

### Prisma Client の再生成

```bash
# Prisma Clientを再生成
cd packages/db
bun run generate

# または、直接実行
bunx prisma generate
```

### データベース接続エラー

```bash
# データベースURLを確認
echo $DATABASE_URL

# D1データベースの接続をテスト
wrangler d1 execute portfolio-db --command "SELECT 1"
```

## ベストプラクティス

### 1. スキーマの変更

- スキーマを変更したら、必ずマイグレーションを作成
- マイグレーションファイルは、リポジトリにコミット
- 本番環境への適用前に、開発環境でテスト

### 2. データの整合性

- 外部キー制約を使用してデータの整合性を保つ
- トランザクションを使用して複数の操作を原子性を保証

### 3. パフォーマンス

- インデックスを適切に設定
- N+1問題を避ける（`include` や `select` を使用）
- ページネーションを実装

### 4. セキュリティ

- SQLインジェクションを防ぐ（Prismaが自動的に処理）
- 環境変数でデータベースURLを管理
- 本番環境の認証情報を適切に管理

## 参考資料

- [Prisma ドキュメント](https://www.prisma.io/docs)
- [Cloudflare D1 ドキュメント](https://developers.cloudflare.com/d1/)
- [Prisma D1 Adapter](https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1)
