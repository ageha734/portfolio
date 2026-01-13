# AI エージェント用プロンプト

> 詳細なコンテキスト: [`apps/wiki/docs/`](./apps/wiki/docs/) を参照してください。

## プロジェクト概要

### アーキテクチャ

- **Monorepo構造**: Turborepo + Bun Workspaces
- **Web**: Feature-Sliced Designを採用
  - 詳細は [`apps/wiki/docs/architecture/feature-sliced`](./apps/wiki/docs/architecture/feature-sliced) を参照
- **API**: Domain-Driven Designを採用
  - 詳細は [`apps/wiki/docs/architecture/domain-driven`](./apps/wiki/docs/architecture/domain-driven) を参照

## 開発環境のヒント

### パッケージ管理

- パッケージを探す際は `ls` でスキャンする代わりに、`turbo run where <project_name>` を使用
- ワークスペースにパッケージを追加する場合は `bun install --filter <project_name>` を実行
- 各パッケージの `package.json` の `name` フィールドを確認して正しい名前を確認（トップレベルのものはスキップ）

### 開発サーバー

```bash
# 全ワークスペースの開発サーバー起動
bun run dev

# 特定のワークスペースのみ起動
turbo run dev --filter=@portfolio/web
```

## テスト手順

### テスト実行

- CI計画は `.github/workflows` フォルダで確認
- 特定パッケージのテストを実行: `turbo run test --filter <project_name>`
- パッケージルートから直接実行: `bun test`
- 特定のテストにフォーカス: `bun vitest run -t "<test name>"`
- コミット前にすべてのテストが通ることを確認

### コード品質チェック

- ファイル移動やインポート変更後は `bun lint --filter <project_name>` を実行してESLintとTypeScriptルールを確認
- 変更したコードには必ずテストを追加または更新

### テストに関する重要なルール

- **機能追加時**: 必ずテストコードを記載
- **機能修正時**: `bun run test` で既存テストが通ることを確認
- **テストコード変更**: なるべく変更しない（変更が必要な場合は理由を説明し合意を求める）

## ビルドとコード品質

```bash
# コード品質チェック（全ワークスペース）
bun run fmt:check   # フォーマットチェック
bun run lint        # リント
bun run coverage    # カバレッジ
bun run test        # ユニットテスト
bun run e2e         # E2Eテスト

# ビルド（全ワークスペース）
bun run build
```

## PR手順

- **タイトル形式**: `[<project_name>] <Title>`
- **コミット前**: `bun run lint` と `bun run test` を必ず実行
- **スクリプト実行**: ワークスペース全体で実行する場合は `turbo run` を使用

## ドキュメント構成

| カテゴリ | パス | 内容 |
| --------- | ------ | ------ |
| アーキテクチャ | [`docs/prompt/architecture/`](./docs/prompt/architecture/) | FSD概要、プロジェクト構造、技術スタック |
| 開発ガイド | [`docs/prompt/development/`](./docs/prompt/development/) | コーディング規約、テスト、デプロイメント等 |
| エージェント | [`docs/prompt/agent/`](./docs/prompt/agent/) | AI エージェント用プロンプト |
