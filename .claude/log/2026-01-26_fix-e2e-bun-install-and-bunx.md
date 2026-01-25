# E2Eテストのbun installとbunxコマンドの修正

## 日付
2026年1月26日

## 問題の概要

monorepo環境で`apps/api`から`bun run e2e`を実行した際に、以下のエラーが発生していました：

1. **bun installエラー**: `error: Failed to run workspace pattern tooling/* due to error NOENT`
2. **bunxコマンドエラー**: `/usr/local/bin/entrypoint.sh: line 118: exec: bunx: not found`

## 原因分析

1. **bun installエラー**: `node_modules`が既に存在する場合でも、ワークスペース依存関係が正しく解決されていない可能性があった
2. **bunxコマンドエラー**: Dockerコンテナ内で`bunx`コマンドが存在しない（`bunx`は`bun x`のエイリアスだが、Dockerコンテナ内では利用できない）

## 実施した修正

### 1. entrypoint.shの修正

`.docker/e2e/scripts/entrypoint.sh`を修正し、以下の改善を行いました：

- **ワークスペースディレクトリの存在確認**: `bun install`を実行する前に、ワークスペースディレクトリが存在することを確認
- **bun installの実行ロジック**: `node_modules`が既に存在する場合でも、ワークスペース依存関係を正しく解決するために、常に`bun install`を実行するように変更
- **エラーハンドリングの改善**: `bun install`が失敗した場合、より詳細なデバッグ情報を出力
- **bunxコマンドの修正**: `bunx`を`bun x`に変更（Dockerコンテナ内で`bunx`が利用できないため）

### 2. apps/web/package.jsonの修正

`apps/web/package.json`の以下のスクリプトで`bunx`を`bun x`に変更：

- `accessibility`
- `interactions`
- `snapshot`
- `visual`

## 変更内容の詳細

### entrypoint.shの変更

#### ワークスペースディレクトリの存在確認
```bash
# Verify workspace directories exist
echo "Verifying workspace directories..."
for workspace_pattern in "apps" "packages" "tooling" "testing" "scripts"; do
	if [ ! -d "${workspace_pattern}" ]; then
		echo "⚠️  Warning: Workspace directory not found: ${workspace_pattern}" >&2
	fi
done
```

#### bun installの実行ロジック
```bash
# Always run bun install to ensure workspace dependencies are resolved correctly
# Even if node_modules exists, workspace dependencies might not be properly linked
echo "Installing dependencies at monorepo root..."
if ! bun install --frozen-lockfile; then
	echo "❌ Error: Failed to install dependencies" >&2
	# ... デバッグ情報の出力
	exit 1
fi
```

#### bunxコマンドの修正
修正前：
```bash
exec bunx playwright test
```

修正後：
```bash
exec bun x playwright test
```

### apps/web/package.jsonの変更例

修正前：
```json
"accessibility": "... e2e bunx playwright test ..."
```

修正後：
```json
"accessibility": "... e2e bun x playwright test ..."
```

## 検証結果

1. **bun installの動作確認**: ワークスペース依存関係が正しく解決されることを確認
2. **ビルドの動作確認**: `apps/api`のビルドが成功することを確認
3. **bun xコマンドの動作確認**: `bun x playwright test`が正しく実行されることを確認

## 変更ファイル

- `.docker/e2e/scripts/entrypoint.sh`: bun installの実行ロジックとbunxコマンドの修正
- `apps/web/package.json`: `bunx`を`bun x`に変更

## 今後の注意事項

- `bunx`は`bun x`のエイリアスですが、Dockerコンテナ内では利用できないため、`bun x`を使用する必要がある
- `node_modules`が既に存在する場合でも、ワークスペース依存関係を正しく解決するために、常に`bun install`を実行する
- ワークスペースディレクトリが存在しない場合、警告を出力するが、エラーにはしない（後方互換性のため）

## 完了確認

✅ entrypoint.shの修正完了
✅ apps/web/package.jsonの修正完了
✅ Dockerイメージの再ビルド完了
✅ 動作確認完了
✅ フォーマット・静的解析完了
