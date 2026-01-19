# Redis Docker Container for Portfolio Development

このディレクトリには、開発環境用のRedis 7 Alpine Dockerコンテナの設定が含まれています。

## ファイル構成

- **Dockerfile**: Redis 7 AlpineのDockerイメージ定義
- **redis.conf**: Redis設定ファイル（メモリ、永続化、ログ設定）
- **.dockerignore**: Dockerビルド時に除外するファイル

## 使用方法

### イメージのビルド

```bash
docker build -t cache -f .docker/cache/Dockerfile .docker/cache
```

### コンテナの起動

```bash
docker run -d \
  --name cache \
  -p 6379:6379 \
  -e REDIS_PASSWORD=password \
  -v cache-data:/data \
  cache
```

### 環境変数

以下の環境変数で設定をカスタマイズできます：

- `REDIS_PASSWORD`: Redis認証パスワード（デフォルト: `password`）
- `TZ`: タイムゾーン（デフォルト: `UTC`）

### データの永続化

データはDockerボリューム `cache-data` に保存されます。

### Redisへの接続

#### redis-cliを使用

```bash
# パスワード認証ありで接続
docker exec -it cache redis-cli -a password

# 接続後、PINGコマンドで確認
127.0.0.1:6379> PING
PONG
```

#### アプリケーションから接続

接続URL形式：

```url
redis://:password@localhost:6379
```

または、パスワードなしの場合（開発環境）：

```url
redis://localhost:6379
```

### 基本的なRedis操作

```bash
# Redis CLIに接続
docker exec -it cache redis-cli -a password

# キーと値の設定
SET mykey "Hello Redis"
GET mykey

# リスト操作
LPUSH mylist "item1"
LPUSH mylist "item2"
LRANGE mylist 0 -1

# セット操作
SADD myset "member1"
SADD myset "member2"
SMEMBERS myset

# ハッシュ操作
HSET myhash field1 "value1"
HGET myhash field1
HGETALL myhash

# キーの一覧表示
KEYS *

# データベースの切り替え
SELECT 1

# 現在のデータベースの情報
INFO
```

### ログの確認

```bash
# コンテナのログを確認
docker logs cache

# リアルタイムでログを確認
docker logs -f cache
```

### ヘルスチェック

コンテナのヘルスステータスを確認：

```bash
docker ps --filter name=cache --format "table {{.Names}}\t{{.Status}}"
```

### データのバックアップ

```bash
# RDBファイルをコピー
docker cp cache:/data/dump.rdb ./backup-$(date +%Y%m%d-%H%M%S).rdb

# または、ボリュームから直接コピー
docker run --rm -v cache-data:/data -v $(pwd):/backup alpine \
  cp /data/dump.rdb /backup/backup-$(date +%Y%m%d-%H%M%S).rdb
```

### データのリストア

```bash
# RDBファイルをコンテナにコピー
docker cp backup.rdb cache:/data/dump.rdb

# Redisを再起動してデータを読み込む
docker restart cache
```

### コンテナの停止と削除

```bash
# コンテナを停止
docker stop cache

# コンテナを削除（データは保持）
docker rm cache

# データも削除する場合
docker volume rm cache-data
```

## 設定の詳細

### Redis設定（redis.conf）

- **メモリ**: 最大256MB、LRUエビクション
- **永続化**: RDBスナップショット（AOFは無効）
- **ログ**: noticeレベル
- **スローログ**: 10ms以上のクエリを記録
- **データベース数**: 16個

### パフォーマンス設定

- 最大メモリ: 256MB
- メモリ不足時のポリシー: allkeys-lru（全キーからLRUで削除）
- RDBスナップショット: 900秒で1回、300秒で10回、60秒で10000回

## トラブルシューティング

### コンテナが起動しない

```bash
# ログを確認
docker logs cache

# コンテナの状態を確認
docker ps -a --filter name=cache
```

### ポートが既に使用されている

別のポートを使用：

```bash
docker run -d --name cache -p 6380:6379 ...
```

環境変数 `REDIS_URL` も更新：

```env
REDIS_URL="redis://localhost:6380"
```

### 接続できない

```bash
# Redisが起動しているか確認
docker exec cache redis-cli -a password PING

# ネットワーク設定を確認
docker exec cache redis-cli -a password CONFIG GET bind
```

### データが消えた

ボリュームが削除されていないか確認：

```bash
docker volume ls | grep cache-data
```

## Redis Cloudとの違い

このDockerコンテナは開発環境用です。本番環境ではRedis Cloudを使用することを推奨します。

### Redis Cloudへの移行

本番環境では、`.env` ファイルの `REDIS_URL` をRedis Cloudの接続URLに変更してください：

```bash
REDIS_URL="redis://:password@your-redis-cloud-host:port"
```

## セキュリティ注意事項

⚠️ **この設定は開発環境用です。本番環境では以下を実施してください：**

- 強力なパスワードの使用
- TLS/SSL接続の強制
- ファイアウォール設定
- 認証の有効化
- 定期的なバックアップ
- アクセスログの監視
