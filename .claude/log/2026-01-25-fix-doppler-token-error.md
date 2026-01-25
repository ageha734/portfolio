# Doppler認証トークンエラーの解決

## 日付
2026年1月25日（日曜日）

## 問題の概要

Pulumiのプレビュー実行時に以下のエラーが発生：

```
error: pulumi:providers:doppler resource 'default_0_9_0_github_/api.github.com/pulumiverse' has a problem: 
Provider is missing a required configuration key, try `pulumi config set doppler:dopplerToken`: 
A Doppler token, either a personal or service token. 
This can also be set via the DOPPLER_TOKEN environment variable.
```

## 原因

Dopplerプロバイダーが認証トークンを要求していますが、以下のいずれかの問題が発生しています：

1. `doppler:dopplerToken`がPulumiの設定に設定されていない
2. 設定されているトークンが無効または期限切れ
3. `createDopplerProject: true`が設定されているが、認証トークンがない

## 解決方法

### 方法1: 既存のプロジェクトを使用する（推奨）

既にDopplerプロジェクト「portfolio」が存在する場合、`createDopplerProject`を`false`に設定します：

```bash
cd infra
bunx pulumi config set createDopplerProject false
```

その後、有効なDoppler認証トークンを設定します。

### 方法2: Doppler認証トークンを更新する

#### ステップ1: Dopplerダッシュボードからトークンを取得

1. https://dashboard.doppler.com にアクセス
2. プロジェクト「portfolio」を選択
3. 設定「rc」を選択
4. 「Access」タブ → 「Service Tokens」セクション
5. 「Create Service Token」をクリック
6. トークン名を入力（例: `pulumi-rc-token`）
7. 作成されたトークンをコピー

#### ステップ2: Pulumiの設定に保存

```bash
cd infra
bunx pulumi config set --secret doppler:dopplerToken <コピーしたトークン>
```

#### ステップ3: 環境変数で設定（代替方法）

```bash
export DOPPLER_TOKEN=<コピーしたトークン>
bun run preview
```

### 方法3: Doppler CLIからトークンを作成（プロジェクトアクセスが可能な場合）

```bash
# トークンを作成
doppler configs tokens create pulumi-rc-token --project portfolio --config rc --plain

# Pulumiの設定に保存
cd infra
bunx pulumi config set --secret doppler:dopplerToken $(doppler configs tokens create pulumi-rc-token --project portfolio --config rc --plain)
```

## 現在の設定状態

`Pulumi.rc.yaml`の設定：
- `createDopplerProject: "false"` - 既存のプロジェクトを使用
- `doppler:dopplerToken` - 設定されているが、無効の可能性あり

## 次のステップ

1. Doppler認証トークンを更新
2. `bun run preview`を再実行して、エラーが解決されたか確認
3. 必要に応じて、他の環境（stg, prd）にも同様の設定を適用

## 注意事項

- `createDopplerProject: true`を設定する場合は、必ず有効なDoppler認証トークンが必要です
- トークンは機密情報のため、`--secret`フラグを使用して暗号化して保存してください
- 環境変数`DOPPLER_TOKEN`を使用する場合も、セキュリティに注意してください
