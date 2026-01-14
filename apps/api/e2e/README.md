# API E2Eテスト

このディレクトリには、tRPC APIエンドポイントのE2Eテストが含まれています。

## ファイル構成

テストは機能ごとに分割されています：

- **`trpc.spec.ts`**: tRPCエンドポイントの基本テスト
- **`posts.spec.ts`**: postsルーターのテスト
- **`portfolios.spec.ts`**: portfoliosルーターのテスト

## テスト内容

### tRPCエンドポイント (`trpc.spec.ts`)

- `/trpc` エンドポイントが正しく動作するか
- エラーハンドリングが適切か

### Postsルーター (`posts.spec.ts`)

- `posts.list` クエリが正しいレスポンスを返すか
- `posts.bySlug` クエリが正しいレスポンスを返すか
- 存在しないスラッグへのリクエストが適切にエラーを返すか

### Portfoliosルーター (`portfolios.spec.ts`)

- `portfolios.list` クエリが正しいレスポンスを返すか
- `portfolios.bySlug` クエリが正しいレスポンスを返すか
- 存在しないスラッグへのリクエストが適切にエラーを返すか

## 実行方法

```bash
# すべてのE2Eテストを実行
bun run e2e

# 特定のテストファイルを実行
bun run e2e -- e2e/trpc.spec.ts
bun run e2e -- e2e/posts.spec.ts
bun run e2e -- e2e/portfolios.spec.ts
```

## 前提条件

- Cloudflare Workersの開発サーバーが起動している必要があります
- D1データベースが設定されている必要があります
