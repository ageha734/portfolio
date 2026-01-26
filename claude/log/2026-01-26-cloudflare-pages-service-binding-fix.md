# Cloudflare Pages Service Binding 修正作業ログ

## 日時
2026-01-26

## 解釈した仕様

### 問題の概要
`pulumi up` 実行時に Cloudflare Pages Project の Service Binding 設定でエラーが発生。
```
"Invalid Service name (). Check your Service name and try again."
```

デバッグログでは正しいサービス名（`portfolio-api-tntk2h`）が表示されるが、Cloudflare API には空の値が送信されていた。

### 根本原因
Pulumi Cloudflare Provider v6.13.0 の `PagesProject` リソースで `services` プロパティを設定する際、`pulumi.Output` の値が正しく Cloudflare API に渡されないバグが存在。

## 変更したファイル

### `infra/src/resources/pages.ts`

#### 変更内容
1. `@pulumi/command` パッケージをインポート追加
2. `PagesOutputs` インターフェースに `serviceBindingCommands` プロパティを追加
3. `deploymentConfigs` から `services` プロパティの設定を削除（Pulumi Provider のバグ回避）
4. `local.Command` リソースを追加し、Cloudflare API を直接呼び出して Service Binding を設定
5. `InfraConfig` から `apiToken` を取得して API 認証に使用

#### 技術的詳細
- Pulumi Cloudflare Provider の `services` プロパティは、ネストされた `pulumi.Output` 構造を正しく解決できない問題がある
- 回避策として、`PagesProject` リソース作成後に `command.local.Command` で Cloudflare REST API を PATCH リクエストで呼び出し
- `dependsOn` で `PagesProject` への依存関係を設定し、リソース作成順序を保証

## 検証した結果

### 成功したデプロイ
```
Resources:
    ~ 2 updated
    103 unchanged
```

### Cloudflare API レスポンス
```json
{
  "services": {
    "API_SERVICE": {
      "service": "portfolio-api-tntk2h",
      "environment": "production"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## 残っている課題

1. **Pulumi Cloudflare Provider のバグ報告**
   - GitHub issue を作成して、`PagesProject.deploymentConfigs.services` の `pulumi.Output` 解決問題を報告することを推奨

2. **`local.Command` の冪等性**
   - 現在の実装では、`pulumi up` を実行するたびに curl コマンドが実行される
   - `triggers` プロパティで変更検知を行っているが、完全な冪等性は保証されない

3. **DATABASE_URL 未設定の警告**
   - TiDB Cloud クラスターが未作成のため、DATABASE_URL が空
   - これは Service Binding とは別の問題

## 追加されたパッケージ
- `@pulumi/command@1.1.3`
