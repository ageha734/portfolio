# Tech Stack

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

### Hosting & Deployment

- **Cloudflare Pages**: ホスティングプラットフォーム
  - 自動デプロイ（GitHub連携）
  - Edge Functions対応
  - グローバルCDN

## Development Tools

### Build Tools

- **Vite** (v5.4.0): ビルドツール
  - 高速なHMR（Hot Module Replacement）
  - 最適化されたバンドル

- **Bun** (v1.1.43+): JavaScriptランタイム・パッケージマネージャー
  - 高速なパッケージインストール
  - ネイティブTypeScriptサポート

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

- **TypeSpec** (v1.7.1): API仕様定義
  - GraphQL API型定義
  - OpenAPI生成

### Component Development

- **Ladle** (v5.1.1): コンポーネント開発環境
  - ストーリーブック風UI
  - コンポーネントの分離開発

## Libraries & Utilities

### UI Libraries

- **Framer Motion** (v12.23.26): アニメーションライブラリ
- **GSAP** (v3.14.2): 高度なアニメーション
- **Fireworks.js** (v2.10.8): 花火エフェクト

### Data & Content

- **GraphCMS**: Headless CMS
  - GraphQL API
  - リッチテキストレンダリング（`@graphcms/rich-text-react-renderer`）

- **i18next** (v25.7.3): 国際化（i18n）
  - `react-i18next` (v16.5.1)

### Utilities

- **date-fns** (v4.1.0): 日付処理
- **classnames** (v2.5.1): クラス名結合
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
