# Portfolio Infrastructure

Pulumi を使用した Infrastructure as Code プロジェクト。

## 管理対象リソース

- **Cloudflare DNS**: DNSレコード管理（既存レコードは変更しない）
- **Cloudflare Pages**: Web/Admin/Wiki のデプロイ
- **Cloudflare Workers**: API Worker
- **TiDB Cloud**: Serverless MySQL データベース
- **Redis Cloud**: キャッシュ用データベース
- **Grafana Cloud**: モニタリングダッシュボード
- **Sentry**: エラートラッキング

## ディレクトリ構成

```
infra/
├── src/
│   ├── index.ts           # エントリーポイント
│   ├── config.ts          # 設定管理
│   └── resources/
│       ├── index.ts       # リソースモジュールのエクスポート
│       ├── dns.ts         # Cloudflare DNS
│       ├── pages.ts       # Cloudflare Pages
│       ├── workers.ts     # Cloudflare Workers
│       ├── databases.ts   # TiDB & Redis
│       └── observability.ts # Grafana & Sentry
├── Pulumi.yaml            # プロジェクト設定
├── Pulumi.dev.yaml        # 開発環境設定
├── Pulumi.prod.yaml       # 本番環境設定
├── package.json
└── tsconfig.json
```

## セットアップ

### 1. 依存関係のインストール

```bash
cd infra
npm install
```

### 2. Pulumi スタックの初期化

```bash
# 開発環境
pulumi stack init dev

# 本番環境
pulumi stack init prod
```

### 3. シークレットの設定

```bash
# Cloudflare
pulumi config set --secret cloudflare:apiToken <token>
pulumi config set portfolio-infra:cloudflareAccountId <account-id>
pulumi config set portfolio-infra:cloudflareZoneId <zone-id>
pulumi config set portfolio-infra:cloudflareDomain ageha734.jp

# TiDB Cloud
pulumi config set --secret portfolio-infra:tidbPublicKey <public-key>
pulumi config set --secret portfolio-infra:tidbPrivateKey <private-key>
pulumi config set portfolio-infra:tidbProjectId <project-id>

# Redis Cloud
pulumi config set --secret portfolio-infra:redisApiKey <api-key>
pulumi config set --secret portfolio-infra:redisSecretKey <secret-key>

# Grafana Cloud
pulumi config set --secret portfolio-infra:grafanaApiKey <api-key>
pulumi config set portfolio-infra:grafanaOrgSlug <org-slug>

# Sentry
pulumi config set --secret portfolio-infra:sentryAuthToken <auth-token>
pulumi config set portfolio-infra:sentryOrg <org-slug>
```

## 使用方法

### プレビュー（変更確認）

```bash
npm run preview
# または
pulumi preview
```

### デプロイ

```bash
npm run up
# または
pulumi up
```

### リソースの更新

```bash
npm run refresh
# または
pulumi refresh
```

### アーキテクチャ図の生成

```bash
# PNG形式
npm run stack:graph

# SVG形式
npm run stack:graph:svg
```

生成された `architecture.png` または `architecture.svg` を確認してください。

## 設定一覧

| 設定キー | 説明 | シークレット |
|---------|------|-------------|
| `cloudflare:apiToken` | Cloudflare API トークン | ✓ |
| `portfolio-infra:cloudflareAccountId` | Cloudflare アカウント ID | |
| `portfolio-infra:cloudflareZoneId` | Cloudflare ゾーン ID | |
| `portfolio-infra:cloudflareDomain` | ドメイン名 | |
| `portfolio-infra:tidbPublicKey` | TiDB Cloud 公開キー | ✓ |
| `portfolio-infra:tidbPrivateKey` | TiDB Cloud 秘密キー | ✓ |
| `portfolio-infra:tidbProjectId` | TiDB Cloud プロジェクト ID | |
| `portfolio-infra:redisApiKey` | Redis Cloud API キー | ✓ |
| `portfolio-infra:redisSecretKey` | Redis Cloud シークレットキー | ✓ |
| `portfolio-infra:grafanaApiKey` | Grafana Cloud API キー | ✓ |
| `portfolio-infra:grafanaOrgSlug` | Grafana Cloud 組織スラッグ | |
| `portfolio-infra:sentryAuthToken` | Sentry 認証トークン | ✓ |
| `portfolio-infra:sentryOrg` | Sentry 組織スラッグ | |

## 注意事項

### Cloudflare DNS

- **既存のDNSレコードは変更されません**
- このプロジェクトで定義したレコードのみが管理対象です
- Zone ID を使用して追加レコードのみを作成する設計です

### TiDB Cloud / Redis Cloud

- 公式の Pulumi プロバイダーがないため、設定のみを管理
- 実際のクラスタ/データベースは各コンソールで作成してください
- 接続文字列は Pulumi の Output として他リソースに渡されます

### リソースの保護

- DNS レコードには `protect: true` が設定されています
- 誤って削除しないよう保護されています
- 削除する場合は明示的に保護を解除してください

## トラブルシューティング

### スタックの状態をリセット

```bash
pulumi refresh --skip-preview
```

### リソースのインポート

既存リソースをPulumiの管理下に置く場合：

```bash
pulumi import cloudflare:index/record:Record <name> <zone-id>/<record-id>
```
