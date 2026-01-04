# CI/CDツール

このプロジェクトでは、コード品質と依存関係管理のために以下のツールを使用しています。

## Renovate

Renovateは依存関係の自動更新を管理するツールです。

### 設定

設定ファイルは `.github/renovate.json` にあります。

### 主な機能

- **自動依存関係検出**: `package.json` の依存関係を自動的に検出
- **スケジュール実行**: 毎週月曜日の午前10時（JST）にPRを作成
- **グループ化**: 関連するパッケージをまとめて更新
  - Remix関連パッケージ
  - Radix UIパッケージ
  - Docusaurusパッケージ
  - TypeScript関連パッケージ
  - 開発依存関係
- **自動マージ**: マイナー・パッチバージョンの更新は自動マージ可能
- **セキュリティ更新**: 脆弱性が検出された場合は即座にPRを作成

### 使用方法

1. **Renovate Appのインストール**:
   - GitHub MarketplaceからRenovate Appをリポジトリにインストール
   - 初回実行時に設定ファイルを自動検出

2. **PRの確認**:
   - Renovateが作成したPRをレビュー
   - マイナー・パッチバージョンは自動マージ可能
   - メジャーバージョンは手動レビューが必要

3. **設定のカスタマイズ**:
   - `.github/renovate.json` を編集して設定を変更
   - 変更後、次回のスケジュール実行時に反映

### 設定例

```json
{
  "schedule": ["before 10am on monday"],
  "timezone": "Asia/Tokyo",
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ]
}
```

## SonarCloud

SonarCloudはコード品質・セキュリティ分析を行うクラウドサービスです。

### 設定

設定ファイルは `sonar-project.properties` にあります。

### 主な機能

- **コード品質分析**: TypeScript/JavaScriptコードの品質を分析
- **セキュリティ脆弱性検出**: 既知の脆弱性パターンを検出
- **コードカバレッジ統合**: テストカバレッジレポートを統合
- **PRコメント**: プルリクエストに品質ゲート結果をコメント

### 初期設定

1. **SonarCloudでプロジェクト作成**:
   - [SonarCloud](https://sonarcloud.io/) にアクセス
   - GitHubアカウントでログイン
   - 組織を作成（初回のみ）
   - プロジェクトをインポート

2. **トークンの生成**:
   - SonarCloudの「My Account」→「Security」からトークンを生成
   - GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」に追加
   - シークレット名: `SONAR_TOKEN`

3. **プロジェクトキーの確認**:
   - SonarCloudのプロジェクトページでプロジェクトキーを確認
   - `sonar-project.properties` の `sonar.projectKey` と `sonar.organization` を更新

### CI統合

CIワークフロー（`.github/workflows/ci.yml`）に `run-sonarcloud` ジョブが含まれています。

- **実行タイミング**: カバレッジレポート生成後
- **権限**: `security-events: write` が必要
- **エラーハンドリング**: `continue-on-error: true` により、失敗しても他のジョブに影響しない

### カバレッジレポート

SonarCloudは以下のカバレッジレポートを使用します：

- **パス**: `docs/vitest/coverage/lcov.info`
- **形式**: LCOV形式
- **生成**: `bun run coverage` コマンドで生成

### 品質ゲート

SonarCloudの品質ゲートは以下の条件で評価されます：

- コードカバレッジ
- コードスメル（コードの臭い）
- セキュリティ脆弱性
- バグ

品質ゲートが失敗した場合、PRにコメントが追加されます。

### 除外設定

以下のパスは分析から除外されています：

- `node_modules/`
- `build/`, `dist/`
- `docs/`
- テストファイル（`*.test.ts`, `*.spec.ts` など）
- 設定ファイル（`*.config.ts`, `*.json` など）

詳細は `sonar-project.properties` の `sonar.exclusions` を参照してください。

## トラブルシューティング

### RenovateがPRを作成しない

- Renovate Appがリポジトリにインストールされているか確認
- `.github/renovate.json` が正しく配置されているか確認
- Renovate Appのログを確認

### SonarCloudが実行されない

- `SONAR_TOKEN` シークレットが設定されているか確認
- `sonar-project.properties` のプロジェクトキーが正しいか確認
- CIワークフローのログを確認

### カバレッジレポートが見つからない

- `bun run coverage` が正常に実行されているか確認
- `docs/vitest/coverage/lcov.info` が生成されているか確認
- カバレッジレポートのパスが正しいか確認
