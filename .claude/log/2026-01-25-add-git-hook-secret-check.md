# GitフックによるPulumiシークレット検証の追加

## 日付
2026年1月25日（日曜日）

## 解釈した仕様

### 要件
Gitでプロジェクトを管理しているため、コミット時にPulumi設定ファイルにシークレットが含まれていないか自動的にチェックし、エラーにする。

### 実装方針
- lefthookを使用してpre-commitフックを追加
- Pulumi設定ファイル（`infra/Pulumi.*.yaml`）をチェック
- シークレットが検出された場合、コミットを拒否

## 変更したファイル

### 1. `scripts/git/check-pulumi-secrets.sh`（新規作成）
- **機能**: Pulumi設定ファイルにシークレットが含まれていないかチェック
- **チェック内容**:
  - `doppler:dopplerToken`設定の検出
  - `secure:`で始まる行（Pulumiの暗号化されたシークレット）の検出
- **動作**: エラーが見つかった場合、エラーメッセージを表示して終了コード1を返す

### 2. `lefthook.yaml`
- **追加内容**: pre-commitフックに`check-pulumi-secrets`コマンドを追加
- **実行タイミング**: `infra/`ディレクトリのファイルが変更された場合
- **並列実行**: `lint-staged`と並列で実行される

### 3. `infra/README.md`
- **追加内容**: Gitフックによるシークレット検証の説明を追加
- **内容**:
  - チェック内容の説明
  - エラーメッセージの例
  - シークレットを削除する方法
  - トラブルシューティング

## 使用方法

### 自動実行

Gitコミット時に自動的に実行されます：

```bash
git add infra/Pulumi.rc.yaml
git commit -m "feat"
# シークレットが含まれている場合、エラーが表示されてコミットが拒否されます
```

### 手動実行

スクリプトを直接実行してチェックできます：

```bash
bash scripts/git/check-pulumi-secrets.sh
```

## チェックされるパターン

### 1. `doppler:dopplerToken`設定

```yaml
# ❌ エラーになる例
config:
  doppler:dopplerToken:
    secure: AAABAIz4EFrP0ERbtL0iSD1sX64KSTwJ4n7YiHdHSLm+Tbi5NWlDJjNV
```

### 2. `secure:`で始まる行

```yaml
# ❌ エラーになる例
config:
  someSecret:
    secure: encrypted-value-here
```

## エラーメッセージ

シークレットが検出された場合、以下のようなエラーメッセージが表示されます：

```
❌ Error: infra/Pulumi.rc.yaml contains 'doppler:dopplerToken'
   Please use DOPPLER_TOKEN environment variable instead.
   See infra/README.md for details.

💡 Tip: Remove secrets from Pulumi config files and use environment variables instead.
   Example: export DOPPLER_TOKEN='your-token'
```

## 検証結果

### スクリプトの動作確認
- ✅ スクリプトが正常に実行される
- ✅ シークレットがない場合、エラーが発生しない
- ✅ 実行権限が正しく設定されている

### 設定ファイルの確認
- ✅ `Pulumi.rc.yaml`にシークレットが含まれていない
- ✅ `Pulumi.stg.yaml`にシークレットが含まれていない
- ✅ `Pulumi.prd.yaml`にシークレットが含まれていない

## 利点

1. **セキュリティ**: シークレットがGitリポジトリにコミットされることを防止
2. **自動化**: 手動チェックが不要
3. **早期検出**: コミット前にエラーを検出できる
4. **明確なエラーメッセージ**: 問題の解決方法が明確

## 注意事項

1. **lefthookのインストール**
   - 初回セットアップ時は`bunx lefthook install`を実行してください
   - これは通常、`bun run setup`または`bun run prepare`で自動的に実行されます

2. **スキップ方法**
   - 緊急時は`git commit --no-verify`でスキップできますが、推奨されません
   - シークレットを削除してからコミットしてください

3. **CI/CDでのチェック**
   - このフックはローカルでのみ実行されます
   - CI/CDパイプラインでも同様のチェックを追加することを推奨します

## 次のステップ

1. CI/CDパイプラインにも同様のチェックを追加することを検討
2. 他のシークレットパターンも検出できるように拡張することを検討
3. チームメンバーにGitフックの設定方法を共有
