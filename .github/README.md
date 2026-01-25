# 🏎️💨 Portfolio

このリポジトリは、モノレポを採用したモダンなポートフォリオサイトです。

## Overview

このプロジェクトは、案件獲得率向上を目的としたポートフォリオサイトです。
TypeScript言語で実装され、以下のソフトウェアアーキテクチャに基づいた明確なレイヤー分離を採用しています。

- Monorepo構造: Turborepo + Bun Workspaces
  - 詳細は [`docs/architecture/monorepo-management`](./docs/architecture/monorepo-management) を参照してください。
- **Frontend Application**: Feature-Sliced Designを採用しています。
  詳細は [`docs/architecture/feature-sliced`](./docs/architecture/feature-sliced) を参照してください。
- **Backend Application**: Domain-Driven Designを採用しています。
  詳細は [`docs/architecture/domain-driven`](./docs/architecture/domain-driven) を参照してください。

### Development Commands

必ず以下のコマンドを実行してください。

```bash
# ワークスペース
bun run build
# または特定のパッケージ
bun run build --filter=@portfolio/<package_name>

# コード品質
bun run fmt
bun run lint
bun run typecheck
bun run coverage
bun run test
bun run e2e
```

## Optional

| カテゴリ | パス | 内容 |
| --------- | ------ | ------ |
| ソフトウェアアーキテクチャ | [`docs/architecture/`](./docs/architecture/) | ソフトウェアアーキテクチャ概要、プロジェクト構造 |
| 開発ガイド | [`docs/development/`](./docs/development/) | コーディング規約、テスト、デプロイメント等 |

## 🚀 技術スタック

### Package Management

- **[Bun](https://bun.sh/)** - JavaScriptランタイム・パッケージマネージャー

### Monorepo

- **[Turborepo](https://turbo.build/)** - 高速なビルドシステム
- **[Knip](https://knip.dev/)** - デッドコード検出
- **[Syncpack](https://github.com/JamieMason/syncpack)** - 依存バージョン整合性チェック
- **[Sherif](https://github.com/guillaumewuip/sherif)** - パッケージ依存関係の検証

### Core Technologies

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React](https://reactjs.org)** - UI library
- **[Remix](https://remix.run)** - Full stack web framework
- **[Hono](https://hono.dev/)** - 軽量なWebフレームワーク（API）
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework

### Development Tools

- **[Vite](https://vitejs.dev/)** - Build tool
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing framework
- **[Biome](https://biomejs.dev/)** - Linter and formatter
- **[Storybook](https://storybook.js.org/)** - Component development environment
- **[Prisma](https://www.prisma.io/)** - ORM
- **[TypeSpec](https://typespec.io/)** - API specification language

### Libraries & Utilities

- **[Better-auth](https://www.better-auth.com/)** - 認証ライブラリ
- **[Framer Motion](https://www.framer.com/motion/)** - アニメーションライブラリ
- **[GSAP](https://gsap.com/)** - 高度なアニメーション
- **[Radix UI](https://www.radix-ui.com/)** - アクセシブルなUIコンポーネント
- **[Three.js](https://threejs.org/)** - 3Dグラフィックスライブラリ
- **[Lucide React](https://lucide.dev/)** - アイコンライブラリ
- **[zod](https://zod.dev/)** - スキーマバリデーション

### Documentation

- **[Astro](https://astro.build/)** - Static site generator
- **[Starlight](https://starlight.astro.build/)** - Documentation theme for Astro

### Hosting & Deployment

- **[Cloudflare Pages](https://pages.cloudflare.com/)** - ホスティングプラットフォーム（Web, Admin, Wiki）
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - サーバーレスプラットフォーム（API）
