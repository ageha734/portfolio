# Portfolio Infrastructure

Pulumi を使用した Infrastructure as Code プロジェクト。

## 管理対象リソース

| サービス | 用途 | リージョン |
|---------|------|-----------|
| **Cloudflare DNS** | DNSレコード管理 | - |
| **Cloudflare Pages** | Web/Admin/Wiki のデプロイ | Global |
| **Cloudflare Workers** | API Worker | Global |
| **TiDB Cloud** | Serverless MySQL | AWS Tokyo (ap-northeast-1) のみ |
| **Redis Cloud** | キャッシュ | AWS Tokyo (ap-northeast-1) |
| **Grafana Cloud** | モニタリング | - |
| **Sentry** | エラートラッキング | - |

## ディレクトリ構成

```
infra/
├── src/
│   ├── index.ts              # エントリーポイント
│   ├── config.ts             # 設定管理 (Doppler/Pulumi Config)
│   └── resources/
│       ├── index.ts          # リソースモジュールのエクスポート
│       ├── dns.ts            # Cloudflare DNS
│       ├── pages.ts          # Cloudflare Pages
│       ├── workers.ts        # Cloudflare Workers
│       ├── databases.ts      # TiDB & Redis 設定
│       ├── secrets.ts        # Doppler シークレット管理
│       └── observability.ts  # Grafana & Sentry
├── Pulumi.yaml               # プロジェクト設定
├── Pulumi.dev.yaml           # 開発環境設定
├── Pulumi.prd.yaml           # 本番環境設定
├── package.json
└── tsconfig.json
```

## クイックスタート

### 前提条件

- [Bun](https://bun.sh/) または Node.js
- [Pulumi CLI](https://www.pulumi.com/docs/install/)
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) (推奨)

### 1. 依存関係のインストール

```bash
cd infra
bun install
```

### 2. Pulumi スタックの選択

```bash
# 開発環境
pulumi stack select dev

# 本番環境
pulumi stack select prd
```

## シークレット管理

このプロジェクトでは **Doppler** を使用したシークレット管理を推奨しています。

### Doppler で管理するもの

| シークレット名 | 説明 | 必須 |
|--------------|------|:----:|
| `DATABASE_URL` | TiDB Cloud 接続文字列 | ✓ |
| `REDIS_URL` | Redis Cloud 接続文字列 | ✓ |
| `TIDB_HOST` | TiDB Cloud ホスト名 | ✓ |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API トークン | ✓ |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID | ✓ |
| `CLOUDFLARE_ZONE_ID` | Cloudflare ゾーン ID | ✓ |
| `GRAFANA_API_KEY` | Grafana Cloud API キー | ✓ |
| `GRAFANA_ORG_SLUG` | Grafana Cloud 組織スラッグ | ✓ |
| `SENTRY_AUTH_TOKEN` | Sentry 認証トークン | ✓ |
| `SENTRY_ORG` | Sentry 組織スラッグ | ✓ |
| `SENTRY_DSN` | Sentry DSN | |
| `BETTER_AUTH_SECRET` | Better Auth シークレット | |
| `GOOGLE_CLIENT_ID` | Google OAuth クライアント ID | |
| `GOOGLE_CLIENT_SECRET` | Google OAuth クライアントシークレット | |

### Doppler で管理しないもの

以下の設定は Doppler ではなく **Pulumi Config** で管理します:

| 設定キー | 説明 | 理由 |
|---------|------|------|
| `environment` | 環境名 (dev/staging/prd) | 環境識別子のため |
| `useDoppler` | Doppler を使用するか | Pulumi 実行時の切り替えフラグ |
| `cloudflareDomain` | ドメイン名 | 環境によって異なる可能性 |
| `grafanaStackSlug` | Grafana スタックスラッグ | 環境固有の設定 |
| `doppler:project` | Doppler プロジェクト名 | Doppler 接続設定 |
| `doppler:config` | Doppler 環境名 | Doppler 接続設定 |

### 方法 1: Doppler を使用 (推奨)

Doppler を使用すると、シークレットを一元管理でき、チーム間で安全に共有できます。

#### Doppler のセットアップ

```bash
# Doppler CLI のインストール
brew install dopplerhq/cli/doppler

# ログイン
doppler login

# プロジェクトのセットアップ
doppler setup
```

#### Doppler プロジェクト構成

| Config | 用途 |
|--------|------|
| `dev` | 開発環境 - ローカル開発用 |
| `staging` | ステージング環境 - PR/プレビュー用 |
| `prd` | 本番環境 - 本番デプロイ用 |

#### Doppler での Pulumi 実行

```bash
# プレビュー
doppler run -- pulumi preview

# デプロイ
doppler run -- pulumi up

# プロジェクト・環境を指定して実行
doppler run --project portfolio --config dev -- pulumi up
```

### 方法 2: Pulumi Config を使用

Doppler を使用しない場合は、Pulumi Config でシークレットを管理できます。

```bash
# Doppler を無効化
pulumi config set useDoppler false

# Cloudflare
pulumi config set --secret cloudflare:apiToken <token>
pulumi config set cloudflareAccountId <account-id>
pulumi config set cloudflareZoneId <zone-id>

# Grafana Cloud
pulumi config set --secret grafanaApiKey <api-key>
pulumi config set grafanaOrgSlug <org-slug>

# Sentry
pulumi config set --secret sentryAuthToken <auth-token>
pulumi config set sentryOrg <org-slug>
```

## 使用方法

### npm スクリプト

```bash
# TypeScript ビルド
bun run build

# TypeScript 型チェック
bun run typecheck

# プレビュー (変更確認)
bun run preview

# デプロイ
bun run up

# リソースの更新
bun run refresh

# リソースの削除
bun run destroy

# アーキテクチャ図の生成
bun run stack:graph      # PNG形式
bun run stack:graph:svg  # SVG形式
```

### Doppler と組み合わせた実行

```bash
# 開発環境
doppler run --config dev -- bun run preview
doppler run --config dev -- bun run up

# 本番環境
doppler run --config prd -- bun run preview
doppler run --config prd -- bun run up
```

## 設定一覧

### Pulumi Stack Config

| 設定キー | 説明 | デフォルト |
|---------|------|-----------|
| `environment` | 環境名 (dev/staging/prd) | 必須 |
| `useDoppler` | Doppler を使用するか | `true` |
| `cloudflareDomain` | ドメイン名 | `ageha734.jp` |
| `grafanaStackSlug` | Grafana スタックスラッグ | `portfolio` |

### 環境別設定例

```yaml
# Pulumi.dev.yaml
config:
  portfolio-infra:environment: dev
  portfolio-infra:useDoppler: true
  doppler:project: portfolio
  doppler:config: dev
```

## TiDB Cloud Serverless

このプロジェクトでは TiDB Cloud Serverless を使用します。

### リージョン制限

**許可されているリージョン: `ap-northeast-1` (AWS Tokyo) のみ**

他のリージョンを使用しようとすると、デプロイ時にエラーが発生します。
リージョンを追加する場合は `src/resources/databases.ts` の `TIDB_ALLOWED_REGIONS` を更新してください。

```typescript
// 現在の設定
export const TIDB_ALLOWED_REGIONS = ["ap-northeast-1"] as const;
```

### スペック

| 項目 | 値 |
|-----|-----|
| クラウドプロバイダー | AWS |
| リージョン | ap-northeast-1 (Tokyo) |
| プラン | Serverless (Free Tier) |
| ストレージ | 5 GiB (Free) |
| Request Units | 50M RU/月 (Free) |

### 接続設定

```
Host: gateway01.ap-northeast-1.prod.aws.tidbcloud.com
Port: 4000
SSL: Required (VERIFY_IDENTITY)
```

### 推奨接続プール設定

```typescript
{
  minConnections: 1,
  maxConnections: 10,
  idleTimeoutMs: 60000
}
```

## 注意事項

### Cloudflare DNS

- **既存のDNSレコードは変更されません**
- このプロジェクトで定義したレコードのみが管理対象です
- Zone ID を使用して追加レコードのみを作成する設計です

### TiDB Cloud / Redis Cloud

- 実際のクラスタ/データベースは各コンソールで事前に作成してください
- 接続文字列は Doppler で管理し、Pulumi 経由で他リソースに注入します
- TiDB は **AWS ap-northeast-1 リージョンのみ** 許可されています

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

既存リソースを Pulumi の管理下に置く場合:

```bash
pulumi import cloudflare:index/record:Record <name> <zone-id>/<record-id>
```

### Doppler 接続の確認

```bash
# 設定確認
doppler configure

# シークレット一覧
doppler secrets

# 特定のシークレット確認
doppler secrets get DATABASE_URL
```

### ローカル開発用 .env ファイル生成

```bash
# Doppler から .env を生成
doppler secrets download --no-file --format env > .env
```

### TiDB リージョンエラー

以下のエラーが発生した場合:

```
Error: TiDB region "us-east-1" is not allowed. Allowed regions: ap-northeast-1
```

`src/resources/databases.ts` の `TIDB_ALLOWED_REGIONS` に必要なリージョンを追加してください。

## CI/CD 連携

### GitHub Actions での使用例

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install Pulumi
        uses: pulumi/actions@v5

      - name: Install Doppler CLI
        uses: dopplerhq/cli-action@v3

      - name: Deploy
        env:
          DOPPLER_TOKEN: ${{ secrets.DOPPLER_TOKEN }}
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
        run: |
          cd infra
          bun install
          doppler run -- pulumi up --yes
```

## 参考リンク

- [Pulumi Documentation](https://www.pulumi.com/docs/)
- [Doppler Documentation](https://docs.doppler.com/)
- [TiDB Cloud Documentation](https://docs.pingcap.com/tidbcloud/)
- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [@pulumiverse/doppler](https://www.pulumi.com/registry/packages/doppler/)
- [@pulumiverse/grafana](https://www.pulumi.com/registry/packages/grafana/)
