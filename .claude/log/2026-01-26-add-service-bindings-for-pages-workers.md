# Cloudflare Pages - Workers間のService Bindings実装

## 日付
2026年1月26日

## タスク概要
admin + api、web + apiがCloudflare Service Bindingsを利用してプライベートネットワーク内で通信するように実装しました。

## 実装内容

### 1. Service Binding設定の追加

#### `infra/src/resources/pages.ts`

**変更内容**:
- `ServiceBindingConfig`インターフェースを追加
  - `service`: Workerのスクリプト名（`pulumi.Input<string>`）
  - `entrypoint`: エントリーポイント（オプション）
  - `environment`: 環境（オプション、デフォルトは"production"）

- `PagesProjectConfig`インターフェースに`serviceBinding`プロパティを追加
  - 単一のService Bindingを設定可能

- `createPagesProjects`関数を修正
  - `deploymentConfigs`の`production`と`preview`に`services`プロパティを追加
  - Service Bindingの変数名は`API_SERVICE`に固定（Pages Functionsコード内で使用する変数名）

- `createPortfolioPagesProjects`関数を修正
  - `apiWorkerScriptName`パラメータを追加（`pulumi.Output<string>`型）
  - adminとwebプロジェクトに`serviceBinding`を設定
  - wikiプロジェクトにはService Bindingを設定しない

#### `infra/src/index.ts`

**変更内容**:
- Workerの作成をPagesプロジェクトの作成より前に移動
- `apiWorkerScriptName`を取得して、`createPortfolioPagesProjects`に渡すように修正

### 2. 実装の詳細

#### Service Bindingの設定方法

```typescript
serviceBinding: apiWorkerScriptName
    ? {
          service: apiWorkerScriptName,
          environment: "production",
      }
    : undefined,
```

#### Pages Functionsでの使用方法

Pages Functionsコード内では、以下のようにService Bindingを使用できます：

```typescript
// Pages Functions内（例: functions/api/[[path]].ts）
export async function onRequest(context: EventContext) {
    const response = await context.env.API_SERVICE.fetch(new Request("https://api.example.com/path"));
    return response;
}
```

### 3. 設定されるService Bindings

- **admin（Pages）** → **api（Workers）**: `API_SERVICE`という変数名でバインド
- **web（Pages）** → **api（Workers）**: `API_SERVICE`という変数名でバインド
- **wiki（Pages）**: Service Bindingなし

### 4. 動作の仕組み

1. Worker（api）が先に作成され、そのスクリプト名が取得される
2. Pagesプロジェクト（admin、web）の作成時に、Workerのスクリプト名をService Bindingとして設定
3. Pages Functionsコード内で`env.API_SERVICE.fetch()`を使用することで、パブリックなURLを経由せずにWorkerに直接アクセス可能
4. 通信はCloudflare内部ネットワーク内で行われ、低レイテンシで安全

## 検証結果

- 型チェック: 通過
- フォーマット: 通過
- リンター: 通過

## 注意事項

- Service Bindingの変数名（`API_SERVICE`）は、Pages Functionsコード内で使用する変数名と一致させる必要があります
- Workerのスクリプト名は、Workerが作成された後に取得されるため、Pagesプロジェクトの作成順序を変更しました
- `entrypoint`パラメータはオプションですが、Workerに名前付きエクスポートがある場合は指定できます
- `environment`パラメータはオプションで、デフォルトは"production"です

## 今後の拡張可能性

- 複数のService Bindingを設定する場合は、`serviceBindings`配列をサポートするように拡張可能
- 異なる環境（production/preview）で異なるWorkerをバインドすることも可能
