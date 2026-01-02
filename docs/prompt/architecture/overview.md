# Architecture Overview

このプロジェクトは、Remix + Cloudflare Pagesベースのポートフォリオサイトです。

## Feature-Sliced Design (FSD)

このプロジェクトは、Feature-Sliced Design (FSD) アーキテクチャを採用しています。

### レイヤー構造

- **app/**: アプリケーションエントリーポイント（`root.tsx`, `entry.client.tsx`, `entry.server.tsx`）
- **routes/**: ページレイヤー（Remixのルートファイル）
- **widgets/**: 大きなUIブロック（自己完結型のUIセクション）
- **features/**: ユーザー機能（特定のユースケースに特化）
- **entities/**: ドメインモデル（ビジネスエンティティ）
- **shared/**: 共通リソース（UIコンポーネント、ユーティリティ、API、設定、型定義）

### インポートルール

FSDのインポートルールに従い、上位レイヤーから下位レイヤーへのみインポート可能です。

**許可されるインポート:**

- ✅ `routes/` → `widgets/`, `features/`, `entities/`, `shared/`
- ✅ `widgets/` → `features/`, `entities/`, `shared/`
- ✅ `features/` → `entities/`, `shared/`
- ✅ `entities/` → `shared/`
- ✅ 同じレイヤー内でのインポート

**禁止されるインポート:**

- ❌ `shared/` → `entities/`, `features/`, `widgets/`, `routes/`
- ❌ `entities/` → `features/`, `widgets/`, `routes/`
- ❌ `features/` → `widgets/`, `routes/`
- ❌ `widgets/` → `routes/`

### パスエイリアス

TypeScriptのパスエイリアスが設定されており、`~`プレフィックスでインポートできます：

- `~/shared/*` → `app/shared/*`
- `~/entities/*` → `app/entities/*`
- `~/features/*` → `app/features/*`
- `~/widgets/*` → `app/widgets/*`
- `~/*` → `app/*`

**注意:** `~/components/*`というパスエイリアスは存在しません。コンポーネントは`widgets/`、`features/`、または`shared/ui/`に配置されます。

詳細は [`project-structure.md`](./project-structure.md) を参照してください。
