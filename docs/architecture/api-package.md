---
title: "@portfolio/api パッケージアーキテクチャ"
---

`@portfolio/api` は **Contract-First API Design** に基づいた API クライアントライブラリです。

## 概要

このパッケージは以下の役割を担います：

- **Single Source of Truth**: TypeSpec で API 仕様を一元管理
- **Type-Safe Client**: 自動生成による型安全な API クライアント
- **Cross-Platform**: Web/Admin 両方から利用可能な共通ライブラリ

## ディレクトリ構成

```text
packages/api/
├── schema/                  # [Layer 1: Contract Definition]
│   ├── api.tsp             # エントリーポイント
│   ├── endpoints/          # エンドポイント定義
│   │   ├── posts.tsp
│   │   └── portfolios.tsp
│   └── models/             # ドメインモデル定義
│       ├── post.tsp
│       ├── portfolio.tsp
│       ├── asset.tsp
│       ├── error-response.tsp
│       ├── pagination-meta.tsp
│       └── paginated-response.tsp
│
├── generated/               # [Layer 2: Generated Code] (自動生成)
│   ├── api.schemas.ts      # 型定義
│   ├── mutator.ts          # HTTP クライアント設定
│   ├── posts/posts.ts      # Posts API クライアント
│   └── portfolios/         # Portfolios API クライアント
│
├── src/                     # [Layer 3: Library Interface]
│   ├── index.ts            # 公開 API エントリーポイント
│   └── clients/            # クライアントラッパー
│       ├── index.ts
│       ├── posts.ts
│       └── portfolios.ts
│
├── openapi.yaml             # 生成された OpenAPI 仕様
├── orval.config.ts          # Orval 設定
└── tspconfig.yaml           # TypeSpec 設定
```

## レイヤー構成

| レイヤー | 責務 | 変更頻度 |
| --------- | ------ | ---------- |
| **schema/** | API コントラクト定義（TypeSpec） | API 仕様変更時 |
| **generated/** | 自動生成コード（型、クライアント） | 自動生成 |
| **src/** | 公開インターフェース、クライアントラッパー | ライブラリ機能追加時 |

## データフロー

```text
┌─────────────────────────────────────────────────────────────┐
│                     packages/api                            │
├─────────────────────────────────────────────────────────────┤
│  schema/        →  openapi.yaml  →  generated/              │
│  (TypeSpec)        (OpenAPI)        (Orval)                 │
│       │                                  │                  │
│       │              src/                │                  │
│       │         (Library Interface)      │                  │
│       │              ↓                   │                  │
│       └──────→  index.ts ←───────────────┘                  │
├─────────────────────────────────────────────────────────────┤
│                     exports                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
     ┌────────────────────┴────────────────────┐
     ↓                                         ↓
apps/web                                  apps/admin
(フロントエンド)                           (管理画面)
```

## API クライアント

### Posts

| メソッド | 説明 | パラメータ |
| --------- | ------ | ----------- |
| `posts.list(params?)` | 投稿一覧を取得 | `page?`, `perPage?`, `tag?` |
| `posts.getBySlug(slug)` | スラッグで投稿を取得 | `slug: string` |

### Portfolios

| メソッド | 説明 | パラメータ |
| --------- | ------ | ----------- |
| `portfolios.list(params?)` | ポートフォリオ一覧を取得 | `page?`, `perPage?` |
| `portfolios.getBySlug(slug)` | スラッグでポートフォリオを取得 | `slug: string` |

## 生成コマンド

TypeSpec から OpenAPI 仕様と TypeScript クライアントを生成するには：

```bash
cd packages/api
bun run generate
```

このコマンドは以下を実行します：

1. `tsp compile schema/api.tsp` - TypeSpec から OpenAPI を生成
2. `orval` - OpenAPI から TypeScript クライアントを生成

## apps/api との関係

```text
packages/api (クライアント)          apps/api (サーバー)
──────────────────────            ──────────────────────
schema/                           domain/
├── models/                       ├── portfolio.ts
│   ├── post.tsp ←── 同期 ──→     ├── post.ts
│   └── portfolio.tsp             │
│                                 usecase/
endpoints/                        ├── getPosts.ts
├── posts.tsp ←── 契約 ──→       └── getPortfolios.ts
└── portfolios.tsp                │
                                  interface/rest/
                                  ├── posts.ts
                                  └── portfolios.ts
```

**重要**: `packages/api` の TypeSpec スキーマは `apps/api` の REST インターフェースと一致する必要があります。
