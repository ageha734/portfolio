# Docker E2Eコンテナのユーザー作成エラー修正

## 日付
2026年1月26日

## 問題の概要

`apps/api`で`bun run e2e`を実行した際に、以下のエラーが発生していました：

```
docker: Error response from daemon: unable to find user e2e: no matching entries in passwd file
```

## 原因分析

1. **エラーの原因**: Dockerイメージ`e2e`内に`e2e`ユーザーが存在しない
2. **根本原因**: ベースイメージ`mcr.microsoft.com/playwright:v1.57.0-noble`には既にUID 1000のユーザー（`ubuntu`）が存在していた
3. **問題の詳細**: Dockerfileの`RUN`コマンドで`useradd --uid 1000`を実行しようとしたが、UID 1000が既に使用されているため失敗。しかし、`|| true`によってエラーが隠され、ビルドは続行されたがユーザーは作成されなかった

## 実施した修正

### 1. Dockerfileの修正

`.docker/e2e/Dockerfile`の58-59行目を修正し、以下の処理を追加：

- 既存のUID 1000のユーザーが存在する場合、そのユーザーを削除
- `e2e`ユーザーが存在しない場合のみ、ユーザーを作成
- ユーザー作成の成功を確認し、失敗した場合はエラーを出す

修正前：
```dockerfile
RUN groupadd --gid "${USER_GID}" "${USERNAME}" || true; \
    useradd --uid "${USER_UID}" --gid "${USER_GID}" --shell /bin/bash --create-home "${USERNAME}" || true; \
```

修正後：
```dockerfile
RUN if id -u "${USER_UID}" >/dev/null 2>&1; then \
        EXISTING_USER=$(id -nu "${USER_UID}"); \
        if [ "${EXISTING_USER}" != "${USERNAME}" ]; then \
            userdel -r "${EXISTING_USER}" 2>/dev/null || true; \
        fi; \
    fi; \
    if ! id -u "${USERNAME}" >/dev/null 2>&1; then \
        groupadd --gid "${USER_GID}" "${USERNAME}" || true; \
        useradd --uid "${USER_UID}" --gid "${USER_GID}" --shell /bin/bash --create-home "${USERNAME}" || exit 1; \
    fi; \
```

## 検証結果

1. **Dockerイメージの再ビルド**: 成功
2. **ユーザー作成の確認**: `docker run --rm --entrypoint /bin/bash e2e:latest -c "id e2e"`で確認
   - 結果: `uid=1000(e2e) gid=1000(e2e) groups=1000(e2e)` ✅
3. **デフォルトユーザーの確認**: `docker run --rm --entrypoint /bin/bash e2e:latest -c "whoami"`で確認
   - 結果: `e2e` ✅

## 変更ファイル

- `.docker/e2e/Dockerfile`: ユーザー作成処理を修正

## 今後の注意事項

- Dockerイメージを再ビルドする際は、既存のユーザーとの競合に注意する
- ベースイメージの変更時は、ユーザー作成処理が正しく動作するか確認する

## 完了確認

✅ Dockerfileの修正完了
✅ Dockerイメージの再ビルド完了
✅ 動作確認完了
✅ フォーマット・静的解析完了
