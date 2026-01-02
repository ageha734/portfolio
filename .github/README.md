# 🏎️💨 Portfolio

> Remix + Cloudflare Pagesベースのポートフォリオサイト

このリポジトリは、Feature-Sliced Design (FSD) アーキテクチャを採用したモダンなポートフォリオサイトです。

## 🚀 技術スタック

```text
gh-pages/
├── docs/              # 最新のdocsデプロイ(https://ageha734.github.io/docs/)
├── design-system      # 最新のdesign-systemデプロイ(https://ageha734.github.io/design-system/)
├── openapi            # 最新のopenapiデプロイ(https://ageha734.github.io/openapi/)
└── reports/           # 最新のテスト結果デプロイ
    ├── e2e/           # 最新のplaywrightデプロイ
    │   ├── ...        # テスト結果のレポート(https://ageha734.github.io/reports/e2e/) → 一番最新のテスト結果
    │   └── {uuid}/    # テスト結果のUUID(https://ageha734.github.io/reports/e2e/{uuid}/) →　履歴機能
    ├── coverage/      # 最新のvitestデプロイ
    │   ├── ...        # テスト結果のレポート(https://ageha734.github.io/reports/coverage/) → 一番最新のテスト結果
    │   └── {uuid}/    # テスト結果のUUID(https://ageha734.github.io/reports/coverage/{uuid}/) →　履歴機能
    └── lighthouse/    # 最新のlighthouseデプロイ
        ├── ...        # テスト結果のレポート(https://ageha734.github.io/reports/lighthouse/) → 一番最新のテスト結果
        └── {uuid}/    # テスト結果のUUID(https://ageha734.github.io/reports/lighthouse/{uuid}/) →　履歴機能
```

### Core

- **[Remix](https://remix.run)** - Full stack web framework
- **[React](https://reactjs.org)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Hosting platform
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[GraphCMS](https://graphcms.com/)** - Headless CMS
- **[Bun](https://bun.sh/)** - JavaScript runtime and package manager

### Development Tools

- **[Vite](https://vitejs.dev/)** - Build tool
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing framework
- **[Biome](https://biomejs.dev/)** - Linter and formatter
- **[Storybook](https://storybook.js.org/)** - Component development environment
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare Workers CLI
- **[TypeSpec](https://typespec.io/)** - API specification language

### Documentation

- **[Docusaurus](https://docusaurus.io/)** - Documentation site generator
- **[Swagger](https://swagger.io/)** - API documentation

### Cloudflare Pages

以下のコンテンツがCloudflare Pagesにデプロイされます

- **Remix**: アプリケーション (`https://portfolio.pages.dev`)

### GitHub Pages

以下のコンテンツがGitHub Pagesにデプロイされます

- **Storybook**: コンポーネント開発環境
- **Docusaurus**: ドキュメントサイト
- **Swagger**: APIドキュメント
- **テストレポート**
  - **Playwright**: E2Eテストレポート
  - **Vitest**: カバレッジレポート
  - **Lighthouse**: パフォーマンスレポート
