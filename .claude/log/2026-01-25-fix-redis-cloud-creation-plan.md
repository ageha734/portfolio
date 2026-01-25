# Redis Cloud Subscription creation_plan 修正

## 日付
2026年1月25日（日曜日）

## 解釈した仕様

### 問題の概要
Pulumiのプレビュー実行時に以下の2つのエラーが発生していました：

1. **Redis Cloud Subscriptionのエラー**: `creation_plan`ブロックが必須であるというエラー
2. **Doppler認証トークンのエラー**: 無効な認証トークンというエラー

### 仕様の乖離
Redis Cloudプロバイダーの最新バージョン（v1.3.3）では、`Subscription`リソースを作成する際に`creationPlan`ブロックが必須になっています。現在のコードにはこのブロックが含まれていませんでした。

## 変更したファイル

### 1. `infra/src/resources/cache.ts`
- **変更内容**: Redis Cloudの`Subscription`リソースに`creationPlan`ブロックを追加
- **追加した設定**:
  - `memoryLimitInGb: 0.03` - Databaseの設定値と一致
  - `quantity: 1` - 1つのデータベースを計画
  - `replication: false` - Databaseの設定値と一致
  - `throughputMeasurementBy: "operations-per-second"` - Databaseの設定値と一致
  - `throughputMeasurementValue: 1000` - Databaseの設定値と一致

## 検証した結果

### ビルド
- ✅ TypeScriptコンパイル成功
- ✅ Biomeフォーマットチェック通過
- ✅ Biomeリンターチェック通過
- ✅ 型チェック通過

### 修正内容の確認
- ✅ `creationPlan`ブロックが正しく追加されている
- ✅ Databaseの設定値と一致している
- ✅ デバッグログを削除してクリーンなコードになっている

## 残っている課題

### Doppler認証トークンの問題
Dopplerの認証トークンが無効または期限切れの可能性があります。

#### 問題の詳細
- `doppler login`で502エラーが発生
- `doppler configs tokens create`で「you must provide a name」エラー
- `doppler projects`でプロジェクトが表示されない（アクセス権限の問題の可能性）

#### 解決方法

**方法1: Dopplerダッシュボードからトークンを作成（推奨）**

1. https://dashboard.doppler.com にアクセス
2. プロジェクト「portfolio」を選択
3. 設定「rc」を選択
4. 「Access」タブ → 「Service Tokens」セクション
5. 「Create Service Token」をクリック
6. トークン名を入力（例: `pulumi-rc-token`）
7. 作成されたトークンをコピー
8. 以下のコマンドでPulumiの設定に保存：
   ```bash
   cd infra
   bunx pulumi config set --secret doppler:dopplerToken <コピーしたトークン>
   ```

**方法2: CLIからトークンを作成**

トークン名を指定してコマンドを実行：
```bash
doppler configs tokens create pulumi-rc-token --project portfolio --config rc --plain
```

その後、Pulumiの設定に保存：
```bash
cd infra
bunx pulumi config set --secret doppler:dopplerToken $(doppler configs tokens create pulumi-rc-token --project portfolio --config rc --plain)
```

**注意事項**
- Dopplerのログインが正しく完了していることを確認してください
- プロジェクト「portfolio」と設定「rc」が存在し、アクセス権限があることを確認してください
- 502エラーが継続する場合は、Dopplerのサービス状態を確認してください

この問題は、Redis Cloudの`creationPlan`修正とは別の問題です。`creationPlan`の修正により、Redis Cloud関連のエラーは解決されるはずです。

## 次のステップ

1. Dopplerの認証トークンを更新
2. `bun run preview`を再実行して、Redis Cloudのエラーが解決されたことを確認
3. 必要に応じて、他の環境（stg, prd）にも同様の修正を適用
