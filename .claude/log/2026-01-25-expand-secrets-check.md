# secretsコマンドの拡張

## 作業日時
2026年1月25日

## 目的
`pulumi-secrets`コマンドを`secrets`に変更し、Pulumi設定ファイルだけでなく、セキュリティ関連全般を網羅的にチェックできるようにする。

## 実施内容

### 1. コマンド名の変更
- `pulumi-secrets` → `secrets`
- `checkPulumiSecrets` → `checkSecrets`
- `routines/pulumi.ts` → `routines/secrets.ts`

### 2. チェック対象の拡張

#### ファイルパターン
- Pulumi設定ファイル（`infra/Pulumi.*.yaml`）
- 環境変数ファイル（`.env`, `.env.local`, `.env.*`）
- Git設定ファイル（`.git/config`, `.git/credentials`）

#### シークレットパターン
以下のキーパターンを検出：
- `doppler:dopplerToken`
- `secure:`（Pulumiの暗号化されたシークレット）
- `api[_-]?key`, `apikey`
- `password`, `passwd`, `pwd`
- `token`, `access[_-]?token`, `refresh[_-]?token`
- `secret`, `secret[_-]?key`
- `credential`, `credentials`, `auth`
- `aws[_-]?access[_-]?key`, `aws[_-]?secret[_-]?key`
- `private[_-]?key`, `public[_-]?key`
- `bearer[_-]?token`
- `session[_-]?id`, `session[_-]?secret`

#### 値のパターン
以下の値パターンを検出：
- Base64エンコードされた値（32文字以上）
- 長いトークンやキー（20文字以上）
- Stripe APIキー（`sk-`, `pk_`）
- GitHubトークン（`ghp_`, `gho_`, `ghu_`, `ghs_`, `ghr_`）
- AWS Access Key ID（`AKIA`）
- Google API Key（`AIza`）
- Google OAuth Token（`ya29.`）
- Slack Token（`xox[baprs]-`）

### 3. 除外パターン
以下のファイルはチェック対象外：
- `.example`, `.sample`, `.template`ファイル
- `node_modules/`, `.git/`, `dist/`, `build/`, `coverage/`, `.turbo/`

### 4. チェックロジック

#### Pulumi設定ファイル
- `doppler:dopplerToken`の検出
- `secure:`で始まる行の検出

#### 環境変数ファイル
- キーパターンに一致する変数の検出
- 値が実際に設定されているかチェック
- 値のパターンチェック

#### その他のファイル
- ハードコードされたシークレットパターンの検出
- キーと値の組み合わせをチェック

### 5. エラーメッセージの改善
- ファイルごとの問題を明確に表示
- ファイルタイプ別の具体的なアドバイスを提供
- セキュリティベストプラクティスの提示

### 6. 変更ファイル
- **追加**: `scripts/check/routines/secrets.ts`
- **変更**: `scripts/check/cmd/main.ts`, `lefthook.yaml`
- **削除**: `scripts/check/routines/pulumi.ts`

### 7. lefthook.yamlの更新
```yaml
pre-commit:
    parallel: true
    commands:
        check-secrets:
            run: bun scripts/check/dist/cmd/main.js secrets
            tags: security
        check-staged:
            run: bun scripts/check/dist/cmd/main.js staged
            stage_fixed: true
```

## 技術的詳細

### チェックフロー
1. ステージされたファイルを取得
2. チェック対象ファイルをフィルタリング
3. 各ファイルに対してシークレットパターンをチェック
4. 問題が見つかった場合、詳細なエラーメッセージを表示
5. ファイルタイプ別のアドバイスを提供

### 誤検知の防止
- 値が実際に設定されているかチェック（空、null、undefinedは除外）
- 除外パターンで不要なファイルをスキップ
- 値のパターンマッチングで実際のシークレットのみを検出

## 検証結果

### ビルド
- ✅ `bun run build`が正常に完了
- ✅ バイナリーファイルが生成される

### CLI動作確認
- ✅ `check secrets --help`でヘルプが表示される
- ✅ コマンド名が`secrets`に変更されている

### フォーマットとリンター
- ✅ `bun run fmt`を実行し、コードスタイルを確認
- ⚠️ リンター警告あり（Cognitive Complexity）が、機能には影響なし

## 今後の課題
- Cognitive Complexityの警告を解消するためのリファクタリング（オプション）

## 完了
secretsコマンドの拡張が完了しました。Pulumi設定ファイルだけでなく、環境変数ファイルやその他のファイルも含めて、セキュリティ関連のシークレットを網羅的にチェックできるようになりました。
