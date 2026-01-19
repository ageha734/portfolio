---
title: "Agent Prompts"
---

このセクションには、AIエージェント用のプロンプトを管理します。

## プロジェクト概要

このプロジェクトは、**Turborepo + Bun Workspaces** を採用したモノレポ構造のポートフォリオプロジェクトです。

### アーキテクチャ

- **Web**: Feature-Sliced Design (FSD) を採用
  - `apps/web`: Remix + Cloudflare Pages（ポートフォリオサイト）
  - `apps/admin`: React + Vite + Tanstack Router（管理ダッシュボード）
- **API**: Domain-Driven Design (DDD) を採用
  - `apps/api`: Hono + Cloudflare Workers + D1（CMS API）

詳細は [`architecture/`](./architecture/) を参照してください。

## プロジェクト構造のリファクタリング

Feature-Sliced Design (FSD) アーキテクチャを採用してプロジェクト構造をリファクタリングしました。

### レイヤー構造

- **app/**: アプリケーションエントリーポイント
- **routes/**: ページレイヤー（Remix/Tanstack Router）
- **widgets/**: 大きなUIブロック
- **features/**: ユーザー機能
- **entities/**: ドメインモデル
- **shared/**: 共通リソース

詳細は [`architecture/feature-sliced.md`](./architecture/feature-sliced.md)
を参照してください。

## テストの拡充

ユニットテストとE2Eテストを拡充し、カバレッジ80%以上を目標としています。

### テスト戦略

- **ユニットテスト**: Vitestを使用
- **E2Eテスト**: Playwrightを使用
- **アクセシビリティテスト**: Playwright + axe-core
- **ビジュアルリグレッションテスト**: Playwright + Storybook

詳細は [`development/testing.md`](./development/testing.md) を参照してください。

## ドキュメント管理

Docusaurusを使用してドキュメントサイトを構築し、アーキテクチャ、開発ガイド、エージェントプロンプトなどを管理します。

### ドキュメント構成

- **アーキテクチャ**: [`architecture/`](./architecture/)
  - プロジェクト構造、技術スタック、FSD、DDD
- **開発ガイド**: [`development/`](./development/)
  - コーディング規約、テスト、デプロイメント、トラブルシューティング
- **エージェントプロンプト**: [`prompts.md`](./prompts.md)

## 重要なルール

### 命名規則

- **禁止**: `utils` というディレクトリ名は厳格に禁止
- **推奨**: `lib`、`shared`、`infra`、または具体的な名前を使用

### ディレクトリ構造

- **アプリケーション層** (`apps/*`): `app/` をソースルートとして使用（`src/` は使用しない）
- **パッケージ層** (`packages/*`, `tooling/*`): `src/` を使用可能

### インポートルール

- FSDのインポートルールに従う（上位レイヤーから下位レイヤーへのみインポート可能）
- パスエイリアス `~` を使用（例: `~/shared/*`, `~/features/*`）

## 開発ワークフロー

### 1. 機能追加時

1. 機能を実装
2. テストコードを記載
3. ドキュメントを更新（必要に応じて）
4. コードレビューを依頼

### 2. バグ修正時

1. バグを再現するテストを追加
2. バグを修正
3. 既存テストが通ることを確認
4. コードレビューを依頼

### 3. リファクタリング時

1. 既存テストが通ることを確認
2. リファクタリングを実施
3. テストを更新（必要に応じて）
4. ドキュメントを更新（必要に応じて）

## コード品質

### 必須チェック

- **フォーマット**: `bun run fmt:check`
- **リント**: `bun run lint`
- **型チェック**: `bun run typecheck`
- **テスト**: `bun run test`

### カバレッジ目標

- **全体**: 80%以上
- **新規コード**: 90%以上

## 参考資料

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [Turborepo](https://turbo.build/repo/docs)
- [Bun](https://bun.sh/docs)
