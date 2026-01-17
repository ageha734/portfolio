# API E2Eテスト

このディレクトリには、REST APIエンドポイントのE2Eテストが含まれています。

## ファイル構成

テストは機能ごとに分割されています：

- **`posts.spec.ts`**: Posts REST APIのテスト
- **`portfolios.spec.ts`**: Portfolios REST APIのテスト

## テスト内容

### Posts REST API (`posts.spec.ts`)

- `GET /api/posts` が正しいレスポンスを返すか
- `GET /api/post/:slug` が正しいレスポンスを返すか
- 存在しないスラッグへのリクエストが適切にエラーを返すか

### Portfolios REST API (`portfolios.spec.ts`)

- `GET /api/portfolios` が正しいレスポンスを返すか
- `GET /api/portfolio/:slug` が正しいレスポンスを返すか
- 存在しないスラッグへのリクエストが適切にエラーを返すか

## 実行方法

```bash
# すべてのE2Eテストを実行
bun run e2e

# 特定のテストファイルを実行
bun run e2e -- e2e/posts.spec.ts
bun run e2e -- e2e/portfolios.spec.ts
```

## 前提条件

- Cloudflare Workersの開発サーバーが起動している必要があります
- D1データベースが設定されている必要があります
