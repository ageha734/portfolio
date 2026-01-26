# TiDB Cloud プライベート接続の実装可能性調査

## 日付
2026年1月26日

## 質問
Cloudflare TunnelsとVPCサービスを使用して、API（Workers）からTiDB Cloudをプライベートネットワークで接続できるか？

## 調査結果

### 1. Cloudflare Workers VPC Service Bindings

**概要**:
- Cloudflare Workersから外部のプライベートネットワーク（AWS、Azure、GCP、オンプレミス）に接続可能
- Cloudflare Tunnelを使用してプライベートネットワークに接続
- VPC Service Bindingを設定することで、Workersからプライベートリソースにアクセス可能
- 現在ベータ版で、すべてのWorkersプランで無料

**機能**:
- HTTPサービスをサポート（TCPは近日対応予定）
- 暗号化された通信（トンネル経由）
- SSRF保護（指定されたサービスへのみルーティング）
- マルチクラウド対応（AWS、Azure、GCP、オンプレミス）

**使用方法**:
```typescript
// Workerコード内
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.VPC_SERVICE.fetch('https://private-service.example.com/api');
    return response;
  }
}
```

### 2. TiDB Cloud Private Endpoint

**TiDB Cloud Dedicatedクラスター**:
- AWS PrivateLink（推奨）
  - IPアドレス範囲の重複制限なし
  - セキュリティグループとネットワークACLの設定が簡素化
  - ハブアンドスポークアーキテクチャをサポート
- VPC Peering
  - IPアドレス範囲の重複が不可
  - VPC Peeringは推移的ではない
  - セキュリティグループとネットワークACLの設定が必要

**TiDB Cloud Serverlessクラスター（Starter/Essential）**:
- **AWS PrivateLinkをサポート**（AWS上でホストされている場合のみ）
- 1つのAWSリージョンにつき1つのプライベートエンドポイントで、そのリージョン内のすべてのServerlessクラスターで共有可能
- プライベートエンドポイントとパブリックエンドポイントの両方をサポート
- クロスリージョンのプライベートエンドポイント接続はサポートされていない

### 3. Cloudflare Tunnel + Hyperdrive

**概要**:
- Hyperdriveを使用してプライベートデータベースに接続可能
- Cloudflare Tunnel経由でプライベートデータベースにアクセス
- MySQLとPostgreSQLをサポート

**アーキテクチャ**:
```
Worker → Hyperdrive → Cloudflare Access → Cloudflare Tunnel → Local Database
```

**要件**:
- データベースがTLS/SSLで設定されている必要がある
- Cloudflareアカウントのホスト名が必要
- Wrangler CLI v3.65以上

## 実装可能性の評価

### 現在の状況

1. **TiDB Cloud Serverlessを使用している**
   - **AWS PrivateLinkをサポート**（AWS上でホストされている場合）
   - プライベートエンドポイントとパブリックエンドポイントの両方を利用可能

2. **プライベート接続を実現するには**:
   - TiDB Cloud ServerlessクラスターでAWS PrivateLinkを設定
   - AWS VPCにインターフェースエンドポイントを作成
   - Cloudflare Tunnelを設定して、プライベートエンドポイントに接続
   - VPC Service BindingをWorkersに設定

### 実装方法（TiDB Cloud ServerlessでPrivateLinkを使用する場合）

#### ステップ1: TiDB Cloud ServerlessクラスターでPrivateLinkを設定

1. TiDB CloudコンソールでServerlessクラスターを選択
2. 「Connect」をクリック
3. 「Connection Type」で「Private Endpoint」を選択
4. **Service Name**、**Availability Zone ID**、**Region ID**をメモ
   - 注意: 1つのAWSリージョンにつき1つのプライベートエンドポイントで、そのリージョン内のすべてのServerlessクラスターで共有可能

#### ステップ2: AWS VPCインターフェースエンドポイントの作成

1. AWS Management ConsoleでVPCコンソールを開く
2. 「Endpoints」を選択し、「Create Endpoint」をクリック
3. 「Endpoint services that use NLBs and GWLBs」を選択
4. ステップ1でメモしたService Nameを入力
5. 「Verify service」をクリック
6. VPCとサブネットを選択（TiDBクラスターと同じAvailability Zone）
7. 「Enable DNS name」チェックボックスを選択
8. セキュリティグループを設定（ポート4000へのインバウンドアクセスを許可）
9. 「Create endpoint」をクリック

**AWS CLIを使用する場合**:
```bash
aws ec2 create-vpc-endpoint \
  --vpc-id ${your_vpc_id} \
  --region ${region_id} \
  --service-name ${service_name} \
  --vpc-endpoint-type Interface \
  --subnet-ids ${your_subnet_id}
```

#### ステップ3: Cloudflare Tunnelの設定

1. `cloudflared`をインストール（AWS VPC内のEC2インスタンスなど、プライベートエンドポイントにアクセス可能な場所）
2. Cloudflare Tunnelを作成
3. プライベートエンドポイントへのルーティングを設定
   - ホスト名: プライベートDNS名（例: `gateway01-privatelink.ap-northeast-1.prod.aws.tidbcloud.com`）
   - ポート: 4000（TiDBのデフォルトポート）

#### ステップ3: VPC Service Bindingの設定

**Pulumiでの設定例**:

```typescript
// infra/src/resources/workers.ts
export interface WorkerConfig {
    // ... 既存のプロパティ
    vpcServiceBindings?: Array<{
        name: string;
        service: string; // VPC Serviceの名前
    }>;
}

// VPC Service Bindingの作成
function buildVpcServiceBindings(
    vpcServiceBindings: Array<{ name: string; service: string }>
): WorkerBinding[] {
    const bindings: WorkerBinding[] = [];
    for (const vpc of vpcServiceBindings) {
        bindings.push({
            name: vpc.name,
            service: vpc.service,
            type: "vpc_service",
        });
    }
    return bindings;
}
```

**Cloudflare Dashboardでの設定**:
1. Workers & Pages > VPC Services
2. VPC Serviceを作成
3. Cloudflare Tunnelを選択
4. プライベートエンドポイントのホスト名とポートを設定

#### ステップ4: Workerコードでの使用

```typescript
// apps/api/src/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // VPC Service Binding経由でプライベートエンドポイントに接続
    const dbUrl = `https://${env.TIDB_PRIVATE_ENDPOINT}/api`;
    const response = await env.TIDB_VPC_SERVICE.fetch(dbUrl);
    return response;
  }
}
```

## 代替案: Hyperdriveを使用

TiDB Cloud Serverlessのまま、Hyperdriveを使用して接続を最適化することも可能です：

1. **Hyperdriveの設定**:
   - Cloudflare DashboardでHyperdriveを作成
   - TiDB Cloudのパブリックエンドポイントを設定
   - 接続プーリングとクエリキャッシュを有効化

2. **Workerでの使用**:
```typescript
// Hyperdrive Binding経由でデータベースに接続
const result = await env.HYPERDRIVE.query('SELECT * FROM users');
```

**注意**: Hyperdriveはプライベート接続ではなく、パブリックエンドポイント経由での接続を最適化するものです。

## 推奨事項

### オプション1: TiDB Cloud Dedicatedに移行（完全なプライベート接続）

**メリット**:
- 完全なプライベート接続が可能
- セキュリティが向上
- ネットワークレイテンシが低減

**デメリット**:
- コストが増加（Serverlessより高価）
- 設定が複雑（AWS PrivateLink/VPC Peering、Cloudflare Tunnel）
- 移行作業が必要

### オプション2: Hyperdriveを使用（接続最適化）

**メリット**:
- 現在のServerlessクラスターを継続使用可能
- 設定が簡単
- 接続プーリングとクエリキャッシュでパフォーマンス向上

**デメリット**:
- プライベート接続ではない（パブリックエンドポイント経由）
- セキュリティはIP allowlistingに依存

### オプション3: 現状維持（パブリックエンドポイント + IP allowlisting）

**メリット**:
- 追加の設定不要
- コストが低い

**デメリット**:
- プライベート接続ではない
- セキュリティはIP allowlistingに依存

## 結論

**TiDB Cloud Serverlessクラスターでも、AWS PrivateLinkを使用してプライベート接続が可能です。**

プライベート接続を実現するには：
1. TiDB Cloud ServerlessクラスターでAWS PrivateLinkを設定
2. AWS VPCにインターフェースエンドポイントを作成
3. Cloudflare Tunnelを設定（AWS VPC内からプライベートエンドポイントにアクセス可能な場所に`cloudflared`をインストール）
4. Cloudflare DashboardでVPC Serviceを作成
5. VPC Service BindingをWorkersに設定

**制限事項**:
- AWS上でホストされているServerlessクラスターのみサポート
- クロスリージョンのプライベートエンドポイント接続はサポートされていない
- 1つのAWSリージョンにつき1つのプライベートエンドポイントで、そのリージョン内のすべてのServerlessクラスターで共有可能

**注意**: Cloudflare Workers VPC Service Bindingsは現在HTTPサービスをサポートしていますが、TiDBはMySQLプロトコル（TCP）を使用するため、直接的な接続はできません。Hyperdriveを使用するか、TCPサポートが追加されるまで待つ必要があります。

**代替案**: Hyperdriveを使用して接続を最適化することも可能です（プライベート接続ではありませんが、接続プーリングとクエリキャッシュでパフォーマンス向上）。
