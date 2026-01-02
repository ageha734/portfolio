# Deployment

## Cloudflare Pages

このプロジェクトはCloudflare Pagesにデプロイされます。

### 自動デプロイ

GitHubリポジトリと連携しており、以下の場合に自動デプロイされます：

- `main`ブランチへのプッシュ
- プルリクエストの作成（プレビュー環境）

### 手動デプロイ

```bash
# Remixアプリのデプロイ
bun run deploy:remix

# Ladle UIのデプロイ
bun run deploy:ui
```

## GitHub Pages

以下のコンテンツがGitHub Pagesにデプロイされます：

- Docusaurusドキュメント
- Ladle UI
- Playwrightテスト結果
