# Project Structure

このプロジェクトは、**Turborepo + Bun Workspaces** を採用したMonorepo構造です。

## Monorepo構造

```text
./
├── apps/                         # アプリケーション層
│   ├── web/                      # Remix + Cloudflare Pages
│   ├── api/                      # Hono + Cloudflare Workers + D1
│   ├── admin/                    # React + Vite + Tanstack Router
│   └── wiki/                     # Docusaurus
├── packages/                     # 共通パッケージ層
│   ├── ui/                       # Design System
│   ├── api/                      # API定義統合
│   ├── db/                       # Database (Prisma + D1)
│   └── auth/                     # Better-auth共通設定
├── tooling/                      # 開発ツール設定
│   ├── storybook/                # Storybook共通設定
│   ├── config/                   # 各種ツールのBase Config
│   ├── biome/                    # Biome Base Config
│   ├── tailwind/                 # Tailwind Base Config
│   └── tsconfig/                 # TypeScript Base Configs
├── testing/                      # テストユーティリティ
├── generators/                   # Scaffolding Templates
└── scripts/                      # 運用スクリプト
```

## アプリケーション層 (`apps/`)

### apps/web (Remix + Cloudflare Pages)

ポートフォリオサイト（BFF）です。Feature-Sliced Design (FSD) を採用しています。

**構造:**

- `app/`: FSDルート（`src/`は使用しない）
  - `entities/`: ドメインモデル
  - `features/`: ユーザー機能
  - `widgets/`: 大きなUIブロック
  - `shared/`: 共通リソース
  - `routes/`: Remix Routes（`api+/`でBFF Resource Routes）
- `functions/`: Cloudflare Pages Functions
- `e2e/`: Playwright E2Eテスト

詳細は [`feature-sliced.md`](./feature-sliced.md) を参照してください。

### apps/api (Hono + Cloudflare Workers + D1)

CMS APIです。Domain-Driven Design (DDD) を採用しています。

**構造:**

- `app/`: DDDルート（`src/`は使用しない）
  - `usecase/`: Application Rules
  - `service/`: Domain Services
  - `domain/`: Enterprise Rules（Model, Repo I/F）
  - `infra/`: Frameworks（D1, Repo Impl）
  - `interface/`: Adapters（tRPC Routers, Middleware）
  - `pkg/`: Shared internal packages
  - `di/`: Dependency Injection

詳細は [`domain-driven.md`](./domain-driven.md) を参照してください。

### apps/admin (React + Vite + Tanstack Router)

管理ダッシュボードです。Feature-Sliced Design (FSD) を採用しています。

**構造:**

- `app/`: FSDルート（`src/`は使用しない）
  - `app/`: App initialization
  - `routes/`: Tanstack Router
  - `widgets/`: 大きなUIブロック
  - `features/`: ユーザー機能
  - `entities/`: ドメインモデル
  - `shared/`: 共通リソース
- `functions/`: Cloudflare Pages Functions
- `e2e/`: Playwright E2Eテスト

詳細は [`feature-sliced.md`](./feature-sliced.md) を参照してください。

### apps/wiki (Docusaurus)

Wiki & Reportsサイトです。

**構造:**

- `docs/`: Markdownドキュメント
- `app/`: Custom Root
  - `pages/`: カスタムページ
  - `components/`: カスタムコンポーネント
- `static/reports/`: CI生成のE2E/Coverage HTMLレポート

## パッケージ層 (`packages/`)

### packages/ui

Design System（公開予定）です。

**構造:**

- `src/`: ソースコード（`src/`を使用可能）
  - `components/`: Atomic Components
  - `hooks/`: カスタムフック
- `.storybook/`: Storybook設定（toolingから継承）

### packages/api

API定義統合パッケージです。

**構造:**

- `src/`: ソースコード
  - `router/`: 共有型定義
  - `schema/`: Zod/TypeSpec Schema
  - `root.ts`: tRPCルート定義
  - `trpc.ts`: tRPC設定

### packages/db

Database（Prisma + D1）パッケージです。

**構造:**

- `prisma/`: Prismaスキーマ
- `migrations/`: D1用マイグレーションSQL
- `src/`: ソースコード
  - `client.ts`: Prisma Client factory
  - `seed.ts`: 初期データ投入

### packages/auth

Better-auth共通設定パッケージです。

**構造:**

- `src/`: ソースコード
  - `config.ts`: Better-auth設定
  - `index.ts`: エクスポート

## ツール設定層 (`tooling/`)

### tooling/storybook

Storybook共通設定基盤です。

### tooling/config

各種ツールのBase Configです。

- `vite/`: Vite設定
- `vitest/`: Vitest設定

### tooling/biome

Biome Base Configです。

### tooling/tailwind

Tailwind Base Configです。

### tooling/tsconfig

TypeScript Base Configsです。

- `base.json`: ベース設定
- `react.json`: React用設定
- `node.json`: Node.js用設定
- `test.json`: テスト用設定

## FSDレイヤーの詳細説明（apps/web, apps/admin）

FSDの各レイヤーの詳細については、[`feature-sliced.md`](./feature-sliced.md) を参照してください。

### shared/

全体で再利用可能なリソースを配置します。

- **ui/**: 汎用UIコンポーネント（Button、Inputなど）

- **api/**: APIクライアント、tRPC Client設定など

- **config/**: 設定ファイル（定数、i18n設定など）

- **hooks/**: カスタムReactフック

- **validation/**: バリデーションスキーマ（Zodなど）

**重要**: `utils`というディレクトリ名は**厳格に禁止**されています。
代わりに`lib`、`shared`、`infra`、または具体的な名前を使用してください。

## ファイル命名規則

### コンポーネント

- PascalCaseを使用: `BlogPreview.tsx`
- ファイル名はコンポーネント名と一致

### ユーティリティ

- camelCaseを使用: `formatDate.ts`, `getUserData.ts`

### 型定義

- PascalCaseを使用: `types.ts`内で`BlogPreviewProps`など

### テストファイル

- コンポーネント名に`.test.tsx`を追加: `BlogPreview.test.tsx`
- スナップショットテスト: `BlogPreview.test.tsx.snap`

詳細なコーディング規約は [`../development/coding-standards.md`](../development/coding-standards.md) を参照してください。
