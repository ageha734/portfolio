# E2Eテストのmonorepo環境対応

## 日付
2026年1月26日

## 問題の概要

monorepo環境で`apps/api`、`apps/web`、`apps/admin`から`bun run e2e`を実行した際に、ワークスペース依存関係が見つからないエラーが発生していました：

```
error: Workspace dependency "@portfolio/biome-config" not found
error: Workspace dependency "@portfolio/tsconfig" not found
...
```

## 原因分析

1. **エラーの原因**: 各アプリの`package.json`の`e2e`スクリプトが、現在のディレクトリ（`apps/api`など）だけをマウントしていた
2. **根本原因**: monorepoのワークスペース依存関係は、プロジェクトルートの`node_modules`にインストールされるため、アプリディレクトリだけをマウントしてもアクセスできない
3. **問題の詳細**: Dockerコンテナ内でワークスペース依存関係にアクセスするには、プロジェクトルート全体をマウントする必要がある

## 実施した修正

### 1. entrypoint.shの修正

`.docker/e2e/scripts/entrypoint.sh`を修正し、monorepo環境に対応させました：

- `APP_DIR`環境変数を追加して、どのアプリのテストを実行するか指定できるようにした
- `APP_DIR`が指定されている場合、そのディレクトリに移動してからビルドとテストを実行するようにした
- 依存関係のインストールは、monorepoのルートで実行するようにした

主な変更点：
- `APP_DIR`環境変数の追加
- `APP_PATH`の計算ロジックの追加
- 依存関係のインストールをmonorepoルートで実行
- ビルドとテストを`APP_PATH`で実行

### 2. 各アプリのpackage.jsonの修正

#### apps/api/package.json
- `e2e`スクリプトを修正して、プロジェクトルートをマウントし、`APP_DIR=apps/api`を設定

#### apps/web/package.json
- `e2e`スクリプトを修正して、プロジェクトルートをマウントし、`APP_DIR=apps/web`を設定
- `accessibility`、`interactions`、`visual`、`snapshot`スクリプトも同様に修正

#### apps/admin/package.json
- `e2e`スクリプトを修正して、プロジェクトルートをマウントし、`APP_DIR=apps/admin`を設定

### 3. 変更内容の詳細

#### entrypoint.shの変更
```bash
# APP_DIR環境変数の追加
APP_DIR="${APP_DIR:-}"

# APP_PATHの計算
if [ -n "${APP_DIR}" ]; then
	APP_PATH="${WORK_DIR}/${APP_DIR}"
	if [ ! -d "${APP_PATH}" ]; then
		echo "❌ Error: App directory not found: ${APP_PATH}" >&2
		exit 1
	fi
else
	APP_PATH="${WORK_DIR}"
fi

# 依存関係のインストールをmonorepoルートで実行
cd "${WORK_DIR}" || exit 1
bun install --frozen-lockfile

# ビルドとテストをAPP_PATHで実行
cd "${APP_PATH}" || exit 1
bun run build
bunx playwright test
```

#### package.jsonの変更例（apps/api）
修正前：
```json
"e2e": "docker run --rm -e CI=true -v $(pwd):/work -w /work -v $(pwd)/node_modules:/work/node_modules ..."
```

修正後：
```json
"e2e": "docker run --rm -e CI=true -e APP_DIR=apps/api -v $(git rev-parse --show-toplevel):/work -w /work -v $(git rev-parse --show-toplevel)/node_modules:/work/node_modules ..."
```

## 検証結果

1. **entrypoint.shの動作確認**: `APP_DIR`環境変数が正しく処理されることを確認
2. **Dockerイメージの再ビルド**: 成功
3. **動作確認**: `docker run`コマンドで`APP_DIR`が正しく処理されることを確認

## 変更ファイル

- `.docker/e2e/scripts/entrypoint.sh`: monorepo環境対応の追加
- `apps/api/package.json`: `e2e`スクリプトの修正
- `apps/web/package.json`: `e2e`、`accessibility`、`interactions`、`visual`、`snapshot`スクリプトの修正
- `apps/admin/package.json`: `e2e`スクリプトの修正

## 使用方法

### 各アプリからE2Eテストを実行

```bash
# apps/apiから実行
cd apps/api
bun run e2e

# apps/webから実行
cd apps/web
bun run e2e

# apps/adminから実行
cd apps/admin
bun run e2e
```

### プロジェクトルートから実行

```bash
# プロジェクトルートから
bun run e2e
```

## 今後の注意事項

- `APP_DIR`環境変数が指定されていない場合、`WORK_DIR`がそのまま使用される（後方互換性のため）
- カスタムコマンドを実行する場合も、`APP_DIR`が指定されていれば、そのディレクトリで実行される
- monorepoのルートで依存関係をインストールするため、各アプリから実行する場合でも、プロジェクトルート全体をマウントする必要がある

## 完了確認

✅ entrypoint.shの修正完了
✅ 各アプリのpackage.jsonの修正完了
✅ Dockerイメージの再ビルド完了
✅ 動作確認完了
✅ フォーマット・静的解析完了
