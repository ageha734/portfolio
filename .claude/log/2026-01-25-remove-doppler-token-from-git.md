# GitからDopplerトークンを排除

## 日付
2026年1月25日（日曜日）

## 問題の概要

Gitでプロジェクトを管理しているため、Pulumiの設定ファイル（`Pulumi.*.yaml`）にDoppler認証トークンを含めたくない。

## 解決方法

### 実装内容

1. **Pulumi設定ファイルからトークンを削除**
   - `Pulumi.rc.yaml`から`doppler:dopplerToken`設定を削除
   - 環境変数`DOPPLER_TOKEN`を使用するように変更

2. **ドキュメントの作成**
   - `infra/README.md`を作成し、環境変数の設定方法を記載
   - トラブルシューティングガイドを追加

### 変更したファイル

#### 1. `infra/Pulumi.rc.yaml`
- **削除**: `doppler:dopplerToken`設定（シークレット）
- **保持**: その他の設定（環境、ドメイン、プロジェクト名など）

#### 2. `infra/README.md`（新規作成）
- 環境変数の設定方法
- Dopplerトークンの取得方法
- トラブルシューティングガイド

## 使用方法

### 環境変数の設定

```bash
# 方法1: 直接環境変数として設定
export DOPPLER_TOKEN="your-doppler-token-here"

# 方法2: .env.localファイルに設定（.gitignoreに含まれています）
echo 'DOPPLER_TOKEN=your-doppler-token-here' >> .env.local
```

### Pulumiコマンドの実行

環境変数が設定されていれば、通常通りコマンドを実行できます：

```bash
cd infra
bun run preview
bun run up
```

## 利点

1. **セキュリティ**: シークレットがGitリポジトリに含まれない
2. **柔軟性**: 環境ごとに異なるトークンを使用可能
3. **保守性**: 設定ファイルがクリーンで、Gitで管理しやすい

## 注意事項

1. **環境変数の管理**
   - 環境変数は、実行環境（ローカル、CI/CD、本番環境）で適切に設定する必要があります
   - CI/CDパイプラインでは、シークレット管理機能を使用してください

2. **既存の設定**
   - 既に`doppler:dopplerToken`が設定ファイルに含まれている場合は、削除してください
   - 環境変数`DOPPLER_TOKEN`が設定されていれば、設定ファイルの値は無視されます

3. **他の環境**
   - `Pulumi.stg.yaml`と`Pulumi.prd.yaml`には既にトークンが含まれていないため、変更不要です

## 次のステップ

1. 環境変数`DOPPLER_TOKEN`を設定
2. `bun run preview`を実行して、エラーが解決されたか確認
3. 必要に応じて、CI/CDパイプラインにも環境変数を設定
