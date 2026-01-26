# TiDB Cloud Pulumiプロバイダーの作成

## 日付
2026年1月26日

## タスク概要
TiDB Cloudの公式Pulumiプロバイダーが存在しないため、TiDB Cloud APIを直接呼び出すカスタムPulumiプロバイダーを作成しました。

## 実装内容

### 1. TiDB Cloud APIクライアントの作成

**`infra/src/resources/tidbcloud-provider.ts`** (新規作成)

**主な機能**:
- HTTP Digest Authenticationの実装
- TiDB Cloud API v1beta1 Serverless Clusterエンドポイントへの接続
- クラスターの作成、取得、削除機能

**実装したクラス**:
- `TiDBCloudApiClient`: TiDB Cloud APIとの通信を担当
- `TiDBCloudServerlessClusterProvider`: Pulumi Dynamic Resource Providerの実装
- `TiDBCloudServerlessCluster`: Pulumiリソースクラス

**HTTP Digest Authentication**:
- TiDB Cloud APIはHTTP Digest Authenticationを使用
- 401レスポンスから`www-authenticate`ヘッダーを取得
- MD5ハッシュを使用して認証情報を生成

### 2. データベースリソースの更新

**`infra/src/resources/databases.ts`**:

**変更内容**:
- `createPortfolioTiDBConfig`関数に`apiKeys`パラメータを追加
- `createTiDBCluster`設定オプションを追加（`createTiDBCluster` Pulumi設定）
- クラスター作成リソースを統合
- `TiDBOutputs`インターフェースに`cluster`プロパティを追加

**動作**:
- `createTiDBCluster=true`が設定され、APIキーが提供されている場合: TiDBクラスターを自動作成
- それ以外の場合: 既存の動作（手動作成を前提とした設定情報のみ返す）

### 3. シークレット管理の更新

**`infra/src/resources/secrets.ts`**:
- `SecretKeys`インターフェースに`TIDBCLOUD_PUBLIC_KEY`と`TIDBCLOUD_PRIVATE_KEY`を追加
- `getDopplerSecrets`関数でTiDB Cloud APIキーを取得

**`infra/src/config.ts`**:
- `getDopplerSecrets`関数に`TIDBCLOUD_PUBLIC_KEY`と`TIDBCLOUD_PRIVATE_KEY`を追加

**`infra/src/index.ts`**:
- `dopplerSecrets`オブジェクトにTiDB Cloud APIキーを追加
- `createPortfolioTiDBConfig`関数にAPIキーを渡すように修正
- `DATABASE_URL`の自動設定で、クラスター作成時の接続文字列を優先

## 使用方法

### ステップ1: TiDB Cloud APIキーの取得

1. [TiDB Cloud](https://tidbcloud.com/) にログイン
2. 「Settings」>「API Keys」を選択
3. 「Create API Key」をクリック
4. Public KeyとPrivate Keyをコピー（Private Keyは一度しか表示されません）

### ステップ2: DopplerにAPIキーを設定

```bash
doppler secrets set TIDBCLOUD_PUBLIC_KEY="your-public-key" --project portfolio --config rc
doppler secrets set TIDBCLOUD_PRIVATE_KEY="your-private-key" --project portfolio --config rc
```

### ステップ3: Pulumi設定でクラスター作成を有効化

```bash
cd infra
pulumi config set createTiDBCluster true
```

### ステップ4: デプロイ

```bash
pulumi up
```

## 実装の詳細

### APIエンドポイント

- **作成**: `POST /api/v1beta1/clusters` または `/api/v1beta1/projects/{projectId}/clusters`
- **取得**: `GET /api/v1beta1/clusters/{clusterId}` または `/api/v1beta1/projects/{projectId}/clusters/{clusterId}`
- **削除**: `DELETE /api/v1beta1/clusters/{clusterId}` または `/api/v1beta1/projects/{projectId}/clusters/{clusterId}`

### リクエストボディ（クラスター作成）

```json
{
  "display_name": "cluster-name",
  "cloud_provider": "AWS",
  "region": "ap-northeast-1",
  "cluster_type": "SERVERLESS",
  "config": {
    "spending_limit_monthly": 0
  }
}
```

### レスポンス（クラスター情報）

```json
{
  "id": "cluster-id",
  "display_name": "cluster-name",
  "region": "ap-northeast-1",
  "status": "AVAILABLE",
  "connection_strings": {
    "standard": "mysql://user:password@host:4000/database"
  }
}
```

## デバッグトレース

実装には以下のデバッグトレースが含まれています：

- **ENTRY**: 関数の開始時に引数を出力
- **STATE**: 重要な状態変数の値を出力
- **EXIT**: 関数の終了時に戻り値を出力
- **ERROR**: エラー発生時にエラー情報を出力

## 制限事項と注意事項

1. **API仕様の確認**: TiDB Cloud API v1beta1の詳細仕様が完全に公開されていないため、実際のAPIレスポンスに合わせて調整が必要な場合があります。

2. **HTTP Digest Authentication**: 実装は基本的なHTTP Digest Authenticationをサポートしていますが、すべての認証シナリオをカバーしていない可能性があります。

3. **エラーハンドリング**: APIエラーレスポンスの詳細な処理が必要な場合があります。

4. **クラスター作成の待機**: クラスター作成は非同期処理のため、作成完了まで待機する必要がある場合があります（現在の実装では即座に返される可能性があります）。

5. **プロジェクトID**: プロジェクトIDが指定されていない場合、デフォルトプロジェクトが使用されます。

## 検証結果

- 型チェック: 通過
- フォーマット: 通過
- リンター: 通過

## 次のステップ

1. TiDB Cloud APIキーをDopplerに設定
2. `createTiDBCluster=true`をPulumi設定に追加
3. `pulumi up`を実行してクラスター作成をテスト
4. 実際のAPIレスポンスに合わせて実装を調整（必要に応じて）

## 参考資料

- [TiDB Cloud API Overview](https://docs.pingcap.com/tidbcloud/api-overview)
- [TiDB Cloud API v1beta1 Serverless](https://docs.pingcap.com/tidbcloud/api/v1beta1/serverless)
- [TiDB Cloud API Key Management](https://docs.pingcap.com/tidbcloud/api/v1beta#section/Authentication/API-key-management)
