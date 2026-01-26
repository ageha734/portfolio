# Pulumiデプロイエラーの修正

## 日付
2026年1月26日

## 発生したエラー

### 1. Zero Trust Accessの認証エラー（403 Forbidden）
```
error: failed to make http request: POST "https://api.cloudflare.com/client/v4/accounts/.../access/apps": 403 Forbidden
{"success":false,"errors":[{"code":10000,"message":"Authentication error"}]}
```

**原因**: Cloudflare APIトークンにZero Trust Accessの権限が不足していた

**解決策**: APIトークンに以下の権限を追加
- **Account** → **Access: Apps and Policies** → **Edit**

### 2. DNSレコードのエラー

#### 2.1 存在しないレコードの更新エラー（404 Not Found）
```
error: failed to make http request: PUT "https://api.cloudflare.com/client/v4/zones/.../dns_records/...": 404 Not Found
{"result":null,"success":false,"errors":[{"code":81044,"message":"Record does not exist."}],"messages":[]}
```

**原因**: Pulumiの状態ファイルと実際のCloudflareの状態が一致していない（レコードが存在しないのに更新しようとしている）

**解決策**: 
- `pulumi refresh`を実行して状態を同期
- または、Pulumiの状態から該当リソースを削除: `pulumi state delete <resource-urn>`

#### 2.2 Workers管理DNSレコードとの競合（400 Bad Request）
```
error: failed to make http request: POST "https://api.cloudflare.com/client/v4/zones/.../dns_records": 400 Bad Request
{"result":null,"success":false,"errors":[{"code":81062,"message":"A DNS record managed by Workers already exists on that host."}],"messages":[]}
```

**原因**: Workersのカスタムドメイン機能が自動的にDNSレコードを作成するため、手動でDNSレコードを作成しようとすると競合する

**解決策**: Workersのカスタムドメインが使用されている場合、DNSレコードの作成をスキップするようにコードを修正

## 実装した修正

### 1. DNSレコード作成ロジックの改善

`infra/src/resources/dns.ts`の`createPortfolioDnsRecords`関数を修正：

- `workerCustomDomains`パラメータを追加
- Workersのカスタムドメインが使用されている場合、`api`のDNSレコード作成をスキップ

```typescript
// Workersのカスタムドメインが使用されている場合、DNSレコードはWorkersが自動的に作成するためスキップ
const hasApiCustomDomain = workerCustomDomains && Object.keys(workerCustomDomains).length > 0;
if (!hasApiCustomDomain) {
    records.push({
        name: "api",
        type: "CNAME",
        content: apiSubdomain,
        proxied: true,
        comment: "API worker",
    });
}
```

### 2. `index.ts`の修正

`createPortfolioDnsRecords`の呼び出し時に`workers.domains`を渡すように修正：

```typescript
const dnsRecords = createPortfolioDnsRecords(
    config,
    cloudflareProvider,
    pagesProjects.subdomains,
    workers.subdomains,
    workers.domains,
);
```

### 3. READMEの更新

`infra/scripts/README.md`にZero Trust Accessの権限を追加：

- APIトークン作成時の権限リストに「**Account** → **Access: Apps and Policies** → **Edit**」を追加
- `verify.ts`の必要な権限セクションにも同様の権限を追加

## 今後の対応

### DNSレコードの404エラーが発生した場合

1. **状態の確認**: `pulumi stack --show-urns`でリソースの状態を確認
2. **状態の同期**: `pulumi refresh`を実行して状態を同期
3. **リソースの削除**: 存在しないリソースが状態に残っている場合、`pulumi state delete <resource-urn>`で削除

### Zero Trust Accessの権限エラーが発生した場合

1. CloudflareダッシュボードでAPIトークンの権限を確認
2. 必要に応じて新しいAPIトークンを作成し、環境変数を更新

## 検証結果

- 型チェック: 通過
- フォーマット: 通過
- リンター: 通過

## 注意事項

- Workersのカスタムドメインを使用する場合、DNSレコードは自動的に作成されるため、手動で作成する必要はありません
- Pulumiの状態ファイルと実際のCloudflareの状態が一致しない場合、`pulumi refresh`を実行して状態を同期してください
