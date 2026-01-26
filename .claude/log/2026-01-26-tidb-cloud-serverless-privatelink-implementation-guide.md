# TiDB Cloud Serverless PrivateLink実装ガイド

## 日付
2026年1月26日

## 概要

TiDB Cloud Serverless（Starter/Essential）クラスターでAWS PrivateLinkを使用してプライベート接続を設定する方法と、Cloudflare WorkersからVPC Service Binding経由で接続する方法を説明します。

## 前提条件

- TiDB Cloud ServerlessクラスターがAWS上でホストされている
- AWS VPCでDNS hostnamesとDNS resolutionが有効になっている
- CloudflareアカウントとWorkersプランがある

## 実装手順

### ステップ1: TiDB Cloud ServerlessでPrivateLink情報を取得

1. TiDB Cloudコンソールでクラスターを選択
2. 「Connect」をクリック
3. 「Connection Type」で「Private Endpoint」を選択
4. 以下の情報をメモ:
   - **Service Name**: エンドポイントサービス名
   - **Availability Zone ID**: 可用性ゾーンID
   - **Region ID**: リージョンID

**注意**: 1つのAWSリージョンにつき1つのプライベートエンドポイントで、そのリージョン内のすべてのServerlessクラスターで共有可能です。

### ステップ2: AWS VPCインターフェースエンドポイントの作成

#### AWS Management Consoleを使用する場合

1. AWS Management ConsoleでVPCコンソールを開く
2. 「Endpoints」を選択し、「Create Endpoint」をクリック
3. 「Endpoint services that use NLBs and GWLBs」を選択
4. ステップ1でメモしたService Nameを入力
5. 「Verify service」をクリック
6. VPCとサブネットを選択（TiDBクラスターと同じAvailability Zone）
7. 「Additional settings」を展開し、「Enable DNS name」チェックボックスを選択
8. セキュリティグループを設定（ポート4000へのインバウンドアクセスを許可）
9. 「Create endpoint」をクリック

#### AWS CLIを使用する場合

```bash
aws ec2 create-vpc-endpoint \
  --vpc-id ${your_vpc_id} \
  --region ${region_id} \
  --service-name ${service_name} \
  --vpc-endpoint-type Interface \
  --subnet-ids ${your_subnet_id}
```

### ステップ3: Cloudflare Tunnelの設定

**重要**: Cloudflare Workers VPC Service Bindingsは現在HTTPサービスをサポートしていますが、TiDBはMySQLプロトコル（TCP）を使用するため、直接的な接続はできません。

**現在の制限**:
- VPC Service BindingsはHTTPのみサポート（TCPは近日対応予定）
- TiDBはMySQLプロトコル（TCPポート4000）を使用

**解決策**:
1. **Hyperdriveを使用**（推奨）:
   - HyperdriveはMySQLプロトコルをサポート
   - Cloudflare Tunnel経由でプライベートエンドポイントに接続可能
   - 接続プーリングとクエリキャッシュを提供

2. **TCPサポート待ち**:
   - Cloudflare Workers VPC Service BindingsのTCPサポートを待つ

### ステップ4: Hyperdriveを使用したプライベート接続（推奨）

#### Hyperdriveの設定

1. Cloudflare Dashboardで「Workers & Pages」>「Hyperdrive」を開く
2. 「Create a Hyperdrive」をクリック
3. 設定を入力:
   - **Name**: `tidb-private-hyperdrive`
   - **Primary Database**: TiDB Cloudのプライベートエンドポイント接続文字列
     - 例: `mysql://user:password@gateway01-privatelink.ap-northeast-1.prod.aws.tidbcloud.com:4000/database?sslaccept=strict`
   - **Caching**: 有効化（オプション）

#### Workerでの使用

```typescript
// apps/api/src/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Hyperdrive Binding経由でデータベースに接続
    const result = await env.HYPERDRIVE.query('SELECT * FROM users');
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

#### Pulumiでの設定

```typescript
// infra/src/resources/workers.ts
export interface WorkerConfig {
    // ... 既存のプロパティ
    hyperdriveBindings?: Array<{
        name: string;
        hyperdriveId: string;
    }>;
}

// Hyperdrive Bindingの作成
function buildHyperdriveBindings(
    hyperdriveBindings: Array<{ name: string; hyperdriveId: string }>
): WorkerBinding[] {
    const bindings: WorkerBinding[] = [];
    for (const hyperdrive of hyperdriveBindings) {
        bindings.push({
            name: hyperdrive.name,
            hyperdriveId: hyperdrive.hyperdriveId,
            type: "hyperdrive",
        });
    }
    return bindings;
}
```

### ステップ5: Cloudflare Tunnel経由でHyperdriveを設定（完全なプライベート接続）

1. **Cloudflare Tunnelの作成**:
   ```bash
   cloudflared tunnel create tidb-tunnel
   ```

2. **Tunnel設定ファイルの作成** (`config.yml`):
   ```yaml
   tunnel: tidb-tunnel
   credentials-file: /path/to/credentials.json
   
   ingress:
     - hostname: tidb-private.example.com
       service: tcp://gateway01-privatelink.ap-northeast-1.prod.aws.tidbcloud.com:4000
   ```

3. **Tunnelの起動**:
   ```bash
   cloudflared tunnel run tidb-tunnel
   ```

4. **Hyperdriveの設定**:
   - Primary Database: `mysql://user:password@tidb-private.example.com:4000/database?sslaccept=strict`

## 制限事項

1. **リージョン制限**:
   - クロスリージョンのプライベートエンドポイント接続はサポートされていない
   - TiDBクラスターと同じリージョン内のVPCのみ接続可能

2. **プロトコル制限**:
   - Cloudflare Workers VPC Service Bindingsは現在HTTPのみサポート
   - TiDBはMySQLプロトコル（TCP）を使用するため、Hyperdrive経由での接続が必要

3. **DNS要件**:
   - AWS VPCでDNS hostnamesとDNS resolutionが有効になっている必要がある

## 推奨事項

### オプション1: Hyperdrive + Cloudflare Tunnel（完全なプライベート接続）

**メリット**:
- 完全なプライベート接続が可能
- セキュリティが向上
- 接続プーリングとクエリキャッシュでパフォーマンス向上

**デメリット**:
- Cloudflare Tunnelの設定が必要
- 追加のインフラストラクチャ（EC2インスタンスなど）が必要

### オプション2: Hyperdrive + パブリックエンドポイント（接続最適化）

**メリット**:
- 設定が簡単
- 追加のインフラストラクチャが不要
- 接続プーリングとクエリキャッシュでパフォーマンス向上

**デメリット**:
- プライベート接続ではない（パブリックエンドポイント経由）
- セキュリティはIP allowlistingに依存

## 次のステップ

1. TiDB Cloud ServerlessクラスターでPrivateLink情報を取得
2. AWS VPCインターフェースエンドポイントを作成
3. Hyperdriveを作成してプライベートエンドポイントに接続
4. WorkerにHyperdrive Bindingを設定
5. （オプション）Cloudflare Tunnelを設定して完全なプライベート接続を実現

## 参考資料

- [TiDB Cloud Serverless PrivateLink設定](https://docs.pingcap.com/tidbcloud/set-up-private-endpoint-connections-serverless)
- [Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Cloudflare Workers VPC Service Bindings](https://developers.cloudflare.com/workers-vpc/)
