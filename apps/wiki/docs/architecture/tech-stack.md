# Tech Stack

## Monorepo & Package Management

### Monorepo

- **Turborepo**: 高速なビルドシステム
  - キャッシュ機能による高速化
  - 並列実行による効率化
  - 依存関係の最適化

### Package Manager

- **Bun** (v1.1.43+): JavaScriptランタイム・パッケージマネージャー
  - 高速なパッケージインストール
  - ネイティブTypeScriptサポート
  - Workspaces対応

## Core Technologies

### Frontend Framework

- **Remix** (v2.17.2): Full stack web framework

  - ファイルベースルーティング
  - サーバーサイドレンダリング（SSR）
  - データローディングとフォーム処理
  - Cloudflare Pagesアダプター使用

- **React** (v18.3.1): UI library

  - 関数コンポーネントとHooks
  - サーバーコンポーネント（Remix経由）

- **TypeScript** (v5.9.3): Type-safe JavaScript

  - 厳格モード（strict mode）有効
  - パスエイリアス設定

### Styling

- **TailwindCSS** (v4.1.18): Utility-first CSS framework

  - PostCSS統合
  - カスタムテーマ設定
  - ダークモード対応

- **PostCSS**: CSS処理

  - Autoprefixer
  - CSSnano（本番環境）
  - PostCSS Preset Env

### Backend Framework

- **Hono** (v4.x): 軽量なWebフレームワーク
  - Cloudflare Workers対応
  - REST API実装
  - 高速なルーティング

### Database

- **Cloudflare D1**: SQLiteベースの分散データベース
  - Edge対応
  - Prisma統合
  - 自動レプリケーション

### Hosting & Deployment

- **Cloudflare Pages**: ホスティングプラットフォーム（Web, Admin, Wiki）
  - 自動デプロイ（GitHub連携）
  - Edge Functions対応
  - グローバルCDN

- **Cloudflare Workers**: サーバーレスプラットフォーム（API）
  - Edge実行環境
  - 低レイテンシー
  - 自動スケーリング

## Development Tools

### Build Tools

- **Vite** (v6.1.0): ビルドツール

  - 高速なHMR（Hot Module Replacement）
  - 最適化されたバンドル
  - Remix、React、Viteの統合

- **Bun** (v1.1.43+): JavaScriptランタイム・パッケージマネージャー

  - 高速なパッケージインストール
  - ネイティブTypeScriptサポート
  - Workspaces対応
  - 組み込みテストランナー

### Testing

- **Vitest** (v3.2.4): ユニットテストフレームワーク

  - Vite統合
  - カバレッジレポート（v8）

- **Playwright** (v1.57.0): E2Eテストフレームワーク

  - マルチブラウザ対応
  - スクリーンショットテスト

- **Testing Library**: Reactコンポーネントテスト

  - `@testing-library/react`
  - `@testing-library/user-event`
  - `@testing-library/jest-dom`

### Code Quality

- **Biome** (v2.3.10): Linter and formatter
  - フォーマットとリントを統合
  - TypeScript/JSX対応
  - Monorepo対応

- **TypeSpec** (v1.7.1): API仕様定義
  - GraphQL API型定義
  - OpenAPI生成

- **Knip**: デッドコード検出
  - 未使用のエクスポート検出
  - 依存関係の最適化

- **Syncpack**: 依存バージョン整合性チェック
  - ワークスペース間の依存バージョン統一
  - バージョン不一致の検出

- **Sherif**: パッケージ依存関係の検証
  - 許可されていない依存関係の検出

### Component Development

- **Storybook** (v8.6.14): コンポーネント開発環境

  - ストーリーブックUI
  - コンポーネントの分離開発
  - アクセシビリティテスト統合
  - インタラクションテスト対応

### API & Data Fetching

- **Orval + TypeSpec**: 型安全なAPI通信
  - TypeSpecでOpenAPI仕様を定義
  - OrvalでTypeScriptクライアントを自動生成
  - エンドツーエンドの型安全性
  - 自動型推論
  - クライアント/サーバー統合

- **Better-auth**: 認証ライブラリ
  - セッション管理
  - OAuth統合
  - 型安全な認証

## Libraries & Utilities

### UI Libraries

- **Framer Motion** (v12.23.26): アニメーションライブラリ
  - 宣言的なアニメーション
  - レイアウトアニメーション
  - ジェスチャーサポート

- **GSAP** (v3.14.2): 高度なアニメーション
  - タイムライン制御
  - スクロールトリガー
  - パフォーマンス最適化

- **Fireworks.js** (v2.10.8): 花火エフェクト
  - Canvasベースのアニメーション
  - パーティクルエフェクト

- **Radix UI**: アクセシブルなUIコンポーネント

  - `@radix-ui/react-dialog` (v1.1.15)
  - `@radix-ui/react-dropdown-menu` (v2.1.16)
  - `@radix-ui/react-navigation-menu` (v1.2.14)
  - `@radix-ui/react-separator` (v1.1.8)
  - `@radix-ui/react-slot` (v1.2.4)

- **Three.js** (v0.182.0): 3Dグラフィックスライブラリ

  - `three-stdlib` (v2.36.1): 標準ライブラリ拡張

- **Lucide React** (v0.562.0): アイコンライブラリ

### Data & Content

- **GraphCMS**: Headless CMS

  - GraphQL API
  - リッチテキストレンダリング（`@graphcms/rich-text-react-renderer`）

- **i18next** (v25.7.3): 国際化（i18n）

  - `react-i18next` (v16.5.1)

### Utilities

- **date-fns** (v4.1.0): 日付処理

- **classnames** (v2.5.1): クラス名結合

- **clsx** (v2.1.1): クラス名結合ユーティリティ

- **tailwind-merge** (v3.4.0): Tailwindクラス名マージ

- **class-variance-authority** (v0.7.1): バリアント管理

- **zod** (v4.3.4): スキーマバリデーション

- **reading-time** (v1.5.0): 読了時間計算

### Content Processing

- **MDX** (`@mdx-js/react` v3.1.1): Markdown + JSX

- **Prism.js** (v1.30.0): コードシンタックスハイライト

- **rehype-slug** (v6.0.0): 見出しにIDを追加

- **rehype-img-size** (v1.0.1): 画像サイズ取得

## Documentation

- **Docusaurus**: ドキュメントサイトジェネレーター

  - Markdown/MDXサポート
  - 検索機能
  - GitHub Pagesデプロイ

## CI/CD

- **GitHub Actions**: CI/CDパイプライン

  - リント、フォーマット、型チェック
  - テスト実行
  - 自動デプロイ

- **Lighthouse CI**: パフォーマンス監視

  - パフォーマンス、アクセシビリティ、SEOスコア

## Git Hooks

- **Lefthook** (v2.0.13): Gitフック管理

  - コミット前: lint-staged, commitlint
  - プッシュ前: build

- **commitlint**: コミットメッセージ検証

  - Conventional Commits形式

## その他のツール

- **MSW** (v2.12.7): APIモック（テスト用）
- **Orval** (v7.17.2): APIクライアント生成
- **Wrangler** (v4.54.0): Cloudflare Workers CLI
- **reg-cli**: 画像差分検出（ビジュアルリグレッションテスト）
- **Lefthook**: Git Hooks管理
- **Renovate**: 依存関係の自動更新
