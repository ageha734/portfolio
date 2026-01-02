# APIテスト

このディレクトリには、APIエンドポイントのレスポンスを検証するテストが含まれています。

## ファイル構成

テストは機能ごとに分割されています：

- **`blog.spec.ts`**: ブログAPI関連のテスト
- **`portfolio.spec.ts`**: ポートフォリオAPI関連のテスト
- **`seo.spec.ts`**: SEO関連ファイル（sitemap.xml、robots.txt）のテスト
- **`headers.spec.ts`**: HTTPヘッダーとステータスコードのテスト

## テスト内容

### ブログAPI (`blog.spec.ts`)

- `/api/blog`エンドポイントが正しいレスポンスを返すか
- 存在しないブログポストへのリクエストが404を返すか
- JSONレスポンスが正しい形式か

### ポートフォリオAPI (`portfolio.spec.ts`)

- `/api/portfolio`エンドポイントが正しいレスポンスを返すか
- 存在しないポートフォリオアイテムへのリクエストが404を返すか
- JSONレスポンスが正しい形式か

### SEOファイル (`seo.spec.ts`)

- `sitemap.xml`が正しいXML構造を返すか
- `robots.txt`が正しく返されるか

### HTTPヘッダー (`headers.spec.ts`)

- CORSヘッダーが適切に設定されているか
- ステータスコードが適切か

## 実行方法

```bash
# すべてのAPIテストを実行
bun run e2e -- tests/e2e/api

# 特定のテストファイルを実行
bun run e2e -- tests/e2e/api/blog.spec.ts
bun run e2e -- tests/e2e/api/portfolio.spec.ts
bun run e2e -- tests/e2e/api/seo.spec.ts
bun run e2e -- tests/e2e/api/headers.spec.ts
```
