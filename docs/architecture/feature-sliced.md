---
title: "Feature-Sliced Design (FSD)"
---

このプロジェクトでは、**Feature-Sliced Design (FSD)** アーキテクチャを採用しています。
FSDは、フロントエンドアプリケーションのスケーラブルな構造を提供する設計手法です。

## 適用範囲

FSDは次のアプリケーションで採用されています。

- **`apps/web`**: Remixベースのポートフォリオサイト（BFF）
- **`apps/admin`**: React + Vite + Tanstack Routerベースの管理ダッシュボード

## レイヤー構造

FSDは、アプリケーションを次のレイヤーに分割します。

### app/

アプリケーションのエントリーポイントと初期化ロジックを配置します。

- `root.tsx`: ルートコンポーネント、メタデータ、エラーバウンダリ
- `entry.client.tsx`: クライアントサイドのエントリーポイント
- `entry.server.tsx`: サーバーサイドのエントリーポイント（Remixの場合）
- `env.ts`: 環境変数の型定義とバリデーション
- `tailwind.css`: TailwindCSSのエントリーポイント

### routes/

ページレイヤー。各ページ（画面）を構築します。

- **Remix (`apps/web`)**: ファイルベースルーティング
  - `loader`関数でサーバーサイドデータフェッチ
  - `action`関数でフォーム送信処理
  - `api+/`ディレクトリでBFF Resource Routesを定義
- **Tanstack Router (`apps/admin`)**: 型安全なルーティング
  - `routeTree.gen.ts`: 自動生成されるルートツリー
  - `router.tsx`: ルーター設定

### widgets/

ページ内で使用される自己完結型の大きなUIブロックを管理します。

- 複数のfeaturesやentitiesを組み合わせた複合コンポーネント
- ページ固有の大きなUIセクション
- 例: `Footer`, `Navbar`, `Hero`, `Sections`

各ウィジェットは次の構造を持ちます。

```text
widget-name/
├── ui/
│   └── WidgetName.tsx          # UIコンポーネント
├── model/
│   └── types.ts                # 型定義
├── lib/
│   └── utility.ts              # ユーティリティ関数（必要に応じて）
└── index.ts                    # パブリックAPI
```

### features/

ユーザー視点で意味のある機能を表します。

- 特定のユースケースに特化したコンポーネント
- ビジネスロジックを含む
- 例: `BlogPreview`, `PortfolioPreview`, `ShareButton`, `Tracking`

各フィーチャーは次の構造を持ちます。

```text
feature-name/
├── ui/
│   └── FeatureName.tsx         # UIコンポーネント
├── model/
│   └── types.ts                # 型定義
├── lib/
│   └── utility.ts              # 機能固有のユーティリティ
└── index.ts                    # パブリックAPI
```

### entities/

アプリケーションのドメインに関わるデータモデルを管理します。

- ビジネスエンティティの型定義
- エンティティ固有のロジック
- 例: `Blog`, `Portfolio`, `User`

各エンティティは次の構造を持ちます。

```text
entity-name/
├── model/
│   └── types.ts                # 型定義
├── lib/
│   └── utility.ts              # エンティティ固有のユーティリティ
└── index.ts                    # パブリックAPI
```

### shared/

全体で再利用可能なリソースを配置します。

- **ui/**: 汎用UIコンポーネント（Button、Inputなど）
- **api/**: APIクライアント、Orval生成クライアント設定など
- **config/**: 設定ファイル（定数、i18n設定など）
- **hooks/**: カスタムReactフック
- **validation/**: バリデーションスキーマ（Zodなど）

**重要**: `utils`というディレクトリ名は**厳格に禁止**されています。
代わりに`lib`、`shared`、`infra`、または具体的な名前を使用してください。

## インポートルール

FSDのインポートルールに従い、上位レイヤーから下位レイヤーへのみインポート可能です。

**許可されるインポート:**

- ✅ `routes/` → `widgets/`, `features/`, `entities/`, `shared/`
- ✅ `widgets/` → `features/`, `entities/`, `shared/`
- ✅ `features/` → `entities/`, `shared/`
- ✅ `entities/` → `shared/`
- ✅ 同じレイヤー内でのインポート（水平インポート）

**禁止されるインポート:**

- ❌ `shared/` → `entities/`, `features/`, `widgets/`, `routes/`
- ❌ `entities/` → `features/`, `widgets/`, `routes/`
- ❌ `features/` → `widgets/`, `routes/`
- ❌ `widgets/` → `routes/`
- ❌ 下位レイヤーから上位レイヤーへのインポート（循環依存の防止）

## パスエイリアス

TypeScriptのパスエイリアスが設定されており、`~`プレフィックスでインポートできます。

- `~/shared/*` → `app/shared/*`
- `~/entities/*` → `app/entities/*`
- `~/features/*` → `app/features/*`
- `~/widgets/*` → `app/widgets/*`
- `~/*` → `app/*`

**注意:** `~/components/*`というパスエイリアスは存在しません。コンポーネントは`widgets/`、`features/`、または`shared/ui/`に配置されます。

## ディレクトリ構造のルール

### アプリケーション層 (`apps/*`)

- **必須**: すべてのアプリケーションは`app/`ディレクトリをソースルートとして使用します
- **禁止**: `src/`ディレクトリは使用しません
- 例: `apps/web/app/`, `apps/admin/app/`

### パッケージ層 (`packages/*`, `tooling/*`)

- **許可**: `src/`ディレクトリを使用できます
- 例: `packages/ui/src/`, `tooling/config/src/`

## ファイル命名規則

### コンポーネント

- PascalCaseを使用: `BlogPreview.tsx`
- ファイル名はコンポーネント名と一致

### ユーティリティ

- camelCaseを使用: `formatDate.ts`, `getUserData.ts`
- `utils`という名前は禁止。`lib`を使用

### 型定義

- PascalCaseを使用: `types.ts`内で`BlogPreviewProps`など

### テストファイル

- コンポーネント名に`.test.tsx`を追加: `BlogPreview.test.tsx`
- スナップショットテスト: `BlogPreview.test.tsx.snap`

## 実装例

### Widget の実装例

```typescript
// app/widgets/hero/ui/Hero.tsx
import { HeroProps } from '../model/types';
import { ShareButton } from '~/features/share-button';

export const Hero = ({ title, description }: HeroProps) => {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <ShareButton />
    </section>
  );
};
```

### Feature の実装例

```typescript
// app/features/blog-preview/ui/BlogPreview.tsx
import { Blog } from '~/entities/blog';
import { BlogPreviewProps } from '../model/types';
import { formatDate } from '../lib/formatDate';

export const BlogPreview = ({ blog }: BlogPreviewProps) => {
  return (
    <article>
      <h2>{blog.title}</h2>
      <time>{formatDate(blog.publishedAt)}</time>
    </article>
  );
};
```

### Entity の実装例

```typescript
// app/entities/blog/model/types.ts
export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  slug: string;
}
```

## 参考資料

- [Feature-Sliced Design公式ドキュメント](https://feature-sliced.design/)
- [FSD Best Practices](https://feature-sliced.design/docs/get-started/quick-start)
