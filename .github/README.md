# 🏎️💨 Portfolio

> Remix + Cloudflare Pagesベースのポートフォリオサイト

このリポジトリは、Feature-Sliced Design (FSD) アーキテクチャを採用したモダンなポートフォリオサイトです。

## 🚀 技術スタック

### Core

- **[Remix](https://remix.run)** - Full stack web framework
- **[React](https://reactjs.org)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Hosting platform
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework

### Development Tools

- **[Vite](https://vitejs.dev/)** - Build tool
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing framework
- **[Biome](https://biomejs.dev/)** - Linter and formatter
- **[Ladle](https://ladle.dev/)** - Component development environment

### Documentation

- **[Docusaurus](https://docusaurus.io/)** - Documentation site generator

## 📋 前提条件

- Node.js 20.11.0以上
- Bun 1.1.43以上

## 🛠️ セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/ageha734/portfolio.git
cd portfolio

# 依存関係のインストール
bun install

# 環境変数の設定
cp .example.env .env
# .envファイルを編集して必要な環境変数を設定
```

### 環境変数

`.env`ファイルに以下の環境変数を設定してください：

```env
BASE_URL="https://www.your-website.com"
GOOGLE_ANALYTICS="G-########"
GOOGLE_TAG_MANAGER="GTM-######"
GRAPHCMS_ADMIN="https://management-next.graphcms.com/graphql"
GRAPHCMS_TOKEN="xxxxxxxxxxxx.xxxxxxxxxxxx.xxxxxxxxxxxx"
GRAPHCMS_URL="https://xxxxxx.graphcms.com/v2/xxxxxxxxxxxx/master"
PORT=3000
ENVIRONMENT=development
```

## 🏃 開発

### 開発サーバーの起動

```bash
# Remix開発サーバー（ポート5170）
bun run dev:remix

# Ladle UI（コンポーネント開発環境）
bun run dev:ui

# 両方同時に起動
bun run dev
```

### ビルド

```bash
# プロダクションビルド
bun run build

# CSSのみビルド
bun run build:css
```

### コード品質

```bash
# フォーマットチェック
bun run fmt

# フォーマット自動修正
bun run fmt:fix

# リントチェック
bun run lint

# リント自動修正
bun run lint:fix

# 型チェック
bun run typecheck
```

## 🧪 テスト

### ユニットテスト

```bash
# ウォッチモードで実行
bun run test:unit

# 1回実行
bun run test:unit:run

# カバレッジ付き実行
bun run test:unit:coverage
```

### E2Eテスト

```bash
# UIモードで実行
bun run test:e2e

# CI用実行
bun run test:e2e:run

# ブラウザインストール
bun run test:e2e:install
```

### すべてのテスト

```bash
# ユニットテストとE2Eテストを並列実行
bun run test

# CI用（順次実行）
bun run test:ci
```

## 📚 ドキュメント

```bash
# ドキュメント開発サーバー起動
bun run docs:dev

# ドキュメントビルド
bun run docs:build

# ビルド済みドキュメントのサーバー起動
bun run docs:serve
```

## 🚢 デプロイ

### Cloudflare Pages

RemixアプリはCloudflare Pagesに自動デプロイされます。

```bash
# 手動デプロイ（Remix）
bun run deploy:remix

# 手動デプロイ（Ladle）
bun run deploy:ui
```

### GitHub Pages

以下のコンテンツがGitHub Pagesにデプロイされます：

- **Ladle**: コンポーネント開発環境
- **Docusaurus**: ドキュメントサイト
- **テストレポート**: ユニットテストとE2Eテストの結果

## 📁 プロジェクト構造

```
app/
├── app/              # アプリケーションエントリーポイント
├── pages/            # ページレイヤー
├── widgets/          # 大きなUIブロック
├── features/         # ユーザー機能
├── entities/         # ドメインモデル
└── shared/           # 共通リソース
    ├── ui/           # UIコンポーネント
    ├── lib/          # ユーティリティ
    ├── api/          # API関連
    ├── config/       # 設定
    └── types/        # 型定義

docs/                 # Docusaurusドキュメント
tests/                # テストファイル
  ├── e2e/           # E2Eテスト
  └── setup/         # テストセットアップ
```

詳細は[アーキテクチャドキュメント](docs/docs/architecture/overview.md)を参照してください。

## 🔧 その他のコマンド

```bash
# Lighthouse CI実行
bun run lighthouse

# Cloudflare Workers型生成
bun run typegen

# プロダクションサーバー起動
bun run start
```

## 📝 コミット規約

このプロジェクトは[Conventional Commits](https://www.conventionalcommits.org/)形式を使用しています。

```
<type>(<scope>): <subject>

<body>

<footer>
```

**タイプ:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: その他

## 📄 ライセンス

Private

## 🔗 リンク

- [Portfolio Site](https://ageha734.jp)
- [Documentation](https://ageha734.github.io/portfolio/)
- [Component Library](https://ageha734.github.io/portfolio/ladle/)
