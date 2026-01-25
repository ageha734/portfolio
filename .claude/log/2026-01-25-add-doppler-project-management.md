# Dopplerプロジェクトと環境のInfrastructure as Code対応

## 日付
2026年1月25日（日曜日）

## 解釈した仕様

### 要件
ユーザーからの質問：「doppler CLIでプロジェクトを作成できない？もしくは構成管理で作成できない？」

### 調査結果
1. **Doppler CLI**: `doppler projects create`コマンドでプロジェクト作成可能
2. **Pulumi Dopplerプロバイダー**: `doppler.Project`と`doppler.Environment`リソースでInfrastructure as Code対応可能

### 実装方針
- PulumiでDopplerプロジェクトと環境（rc, stg, prd）を作成できる機能を追加
- 既存のコードとの互換性を保つため、オプション機能として実装
- 設定で有効/無効を切り替え可能にする

## 変更したファイル

### 1. `infra/src/resources/secrets.ts`
- **追加内容**: `createDopplerProject`関数を追加
  - Dopplerプロジェクト「portfolio」を作成
  - 環境（rc: 開発環境、stg: 検証環境、prd: 本番環境）を作成
  - 戻り値としてプロジェクトと環境のリソースを返す

### 2. `infra/src/index.ts`
- **追加内容**: Dopplerプロジェクトと環境の作成機能を追加
  - 設定`createDopplerProject`で有効/無効を切り替え可能
  - デフォルトは`false`（既存の動作を維持）
  - 作成されたリソースのIDをエクスポート

## 使用方法

### 方法1: Pulumiで作成（Infrastructure as Code）

1. Pulumiの設定で`createDopplerProject`を`true`に設定：
   ```bash
   cd infra
   bunx pulumi config set createDopplerProject true
   ```

2. プレビューまたは適用：
   ```bash
   bun run preview
   # または
   bun run up
   ```

3. これにより、以下のリソースが作成されます：
   - Dopplerプロジェクト「portfolio」
   - 環境「rc」（開発環境）
   - 環境「stg」（検証環境）
   - 環境「prd」（本番環境）

### 方法2: Doppler CLIで作成

```bash
# プロジェクトを作成
doppler projects create portfolio --description "Portfolio infrastructure project"

# 各環境の設定を作成
doppler configs create rc --project portfolio --environment development
doppler configs create stg --project portfolio --environment staging
doppler configs create prd --project portfolio --environment production
```

## 検証した結果

### ビルド
- ✅ TypeScriptコンパイル成功
- ✅ Biomeフォーマットチェック通過
- ✅ Biomeリンターチェック通過

### 実装内容の確認
- ✅ `createDopplerProject`関数が正しく実装されている
- ✅ オプション機能として設定で有効/無効を切り替え可能
- ✅ 既存のコードとの互換性を維持

## 注意事項

1. **既存のプロジェクトがある場合**
   - 既にDopplerプロジェクト「portfolio」が存在する場合、Pulumiで作成しようとするとエラーになります
   - その場合は、既存のプロジェクトをインポートするか、`createDopplerProject`を`false`のままにしてください

2. **設定の作成について**
   - 現在の実装では、プロジェクトと環境のみを作成します
   - 設定（Config）の作成は、Doppler CLIまたはダッシュボードから手動で行う必要があります
   - 設定は環境ごとに異なるシークレットを保持するために使用されます

3. **認証トークン**
   - Dopplerプロジェクトを作成するには、有効なDoppler認証トークンが必要です
   - Pulumiの設定に`doppler:dopplerToken`が設定されていることを確認してください

## 次のステップ

1. 必要に応じて、設定（Config）の作成もPulumiで管理できるように拡張
2. シークレットの作成もInfrastructure as Codeで管理できるように検討
3. 既存のプロジェクトをインポートする機能の追加を検討
