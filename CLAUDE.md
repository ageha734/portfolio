# プロジェクトアーキテクチャと開発ルール

> 詳細なコンテキスト: [`apps/wiki/docs/`](./apps/wiki/docs/) を参照してください。

## クイックリファレンス

### アーキテクチャ

- Monorepo構造: Turborepo + Bun Workspaces
- Web: Feature-Sliced Designを採用。
  詳細は [`apps/wiki/docs/architecture/feature-sliced`](./apps/wiki/docs/architecture/feature-sliced) を参照。
- API: Domain-Driven Designを採用。
  詳細は [`apps/wiki/docs/architecture/domain-driven`](./apps/wiki/docs/architecture/domain-driven) を参照。

### 開発コマンド

```bash
# 開発サーバー（全ワークスペース）
bun run dev
# または特定のワークスペースのみ
turbo run dev --filter=@portfolio/web

# コード品質（全ワークスペース）
bun run fmt:check   # フォーマットチェック
bun run lint        # リント
bun run coverage    # カバレッジ
bun run test        # ユニットテスト
bun run e2e         # E2Eテスト

# ビルド（全ワークスペース）
bun run build
```

### 重要なルール

- 機能追加時: 必ずテストコードを記載
- 機能修正時: `bun run test` で既存テストが通ることを確認
- テストコード変更: なるべく変更しない（変更が必要な場合は理由を説明し合意を求める）
- スクリプト実行: ワークスペース全体で実行する場合は`turbo run`を使用

## ドキュメント構成

| カテゴリ | パス | 内容 |
| --------- | ------ | ------ |
| アーキテクチャ | [`docs/prompt/architecture/`](./docs/prompt/architecture/) | FSD概要、プロジェクト構造、技術スタック |
| 開発ガイド | [`docs/prompt/development/`](./docs/prompt/development/) | コーディング規約、テスト、デプロイメント等 |
| エージェント | [`docs/prompt/agent/`](./docs/prompt/agent/) | AI エージェント用プロンプト |
