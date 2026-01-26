# Cloudflare Accessによるプレビューデプロイメントのアクセス制御実装

## 日付
2026年1月26日

## タスク概要
admin、api、web、wikiのrc（release candidate）とstg（staging）環境において、Cloudflare Accessを使用してプレビューデプロイメントへのアクセスを制御する機能を実装しました。

## 実装内容

### 1. 新規ファイル作成
- **`infra/src/resources/access.ts`**: Cloudflare Access設定を管理するモジュールを新規作成

### 2. 実装した機能

#### `createPreviewDeploymentAccess`関数
- rc/stg環境でのみ有効化される条件分岐を実装
- admin、api、web、wikiの4つのサービスに対してAccess Applicationを作成
- 各サービスに対して、プレビューデプロイメントのドメインパターンを設定
  - Pages: `*.{project-name}-{service}-{suffix}.pages.dev`
  - Workers: `*-{worker-name}.{subdomain}.workers.dev`
- 各Access Applicationにポリシーを設定（デフォルトでは全員にアクセスを許可）

#### Access Application設定
- `ZeroTrustAccessApplication`リソースを使用
- アプリケーション内でポリシーを定義（`policies`プロパティを使用）
- ポリシー設定:
  - `decision: "allow"`: アクセスを許可
  - `precedence: 1`: ポリシーの優先順位
  - `includes: [{ everyone: {} }]`: 全員にアクセスを許可（必要に応じて特定のメールアドレスやグループに制限可能）

### 3. 変更したファイル

#### `infra/src/resources/access.ts` (新規作成)
- `AccessOutputs`インターフェース: Access Applicationの出力を定義
- `createAccessApplication`関数: Access Applicationを作成するヘルパー関数
- `createPreviewDeploymentAccess`関数: プレビューデプロイメント用のAccess設定を作成するメイン関数

#### `infra/src/index.ts`
- `createPreviewDeploymentAccess`関数をインポート
- `pagesProjects`と`workers`の作成後に`createPreviewDeploymentAccess`を呼び出し
- Access ApplicationのIDをエクスポート

#### `infra/src/resources/pages.ts`
- `generateRandomSuffix`関数から一時的なデバッグログを削除

## 技術的な詳細

### Cloudflare Accessの実装方法
- `ZeroTrustAccessApplication`リソースを使用してAccess Applicationを作成
- アプリケーション内で`policies`プロパティを使用してポリシーを定義
- 独立した`ZeroTrustAccessPolicy`リソースは使用せず、アプリケーション内でポリシーを定義する方式を採用

### ドメインパターンの設定
- Pagesのプレビューデプロイメント: `*.{project-name}-{service}-{suffix}.pages.dev`
- Workersのプレビューデプロイメント: `*-{worker-name}.{subdomain}.workers.dev`
- これらのパターンにより、すべてのプレビューデプロイメントURLが保護されます

### 環境別の有効化
- rc（release candidate）環境とstg（staging）環境でのみ有効化
- prd（production）環境では`null`を返し、Access設定を作成しない

## 検証結果
- 型チェック: 通過
- フォーマット: 通過
- リンター: 通過

## 今後の拡張可能性
- ポリシーの`includes`を変更することで、特定のメールアドレスやグループにアクセスを制限可能
- 例: `[{ email: { email: "user@example.com" } }]` で特定のメールアドレスのみ許可
- 例: `[{ group: { id: "group-id" } }]` で特定のAccessグループのみ許可

## 注意事項
- 現在の実装では、デフォルトで全員にアクセスを許可する設定になっています
- セキュリティ要件に応じて、ポリシーを適切に設定してください
- Cloudflare Accessの設定には、適切なIdentity Provider（IdP）の設定が必要です
