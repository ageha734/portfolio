# プロジェクトアーキテクチャと開発ルール

> **詳細なコンテキスト**: [`docs/prompt/`](./docs/prompt/) を参照してください。

## クイックリファレンス

### アーキテクチャ

Feature-Sliced Design (FSD) を採用。詳細は [`docs/prompt/architecture/`](./docs/prompt/architecture/) を参照。

### 開発コマンド

```bash
# 開発サーバー
bun run dev

# コード品質
bun run fmt:check   # フォーマットチェック
bun run lint        # リント
bun run coverage    # カバレッジ
bun run test        # ユニットテスト
bun run e2e         # E2Eテスト

# ビルド
bun run build
```

### 重要なルール

- **機能追加時**: 必ずテストコードを記載
- **機能修正時**: `bun run test` で既存テストが通ることを確認
- **テストコード変更**: なるべく変更しない（変更が必要な場合は理由を説明し合意を求める）

## ドキュメント構成

| カテゴリ | パス | 内容 |
|---------|------|------|
| **アーキテクチャ** | [`docs/prompt/architecture/`](./docs/prompt/architecture/) | FSD概要、プロジェクト構造、技術スタック |
| **開発ガイド** | [`docs/prompt/development/`](./docs/prompt/development/) | コーディング規約、テスト、デプロイメント等 |
| **エージェント** | [`docs/prompt/agent/`](./docs/prompt/agent/) | AI エージェント用プロンプト |
