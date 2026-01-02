#!/usr/bin/env bash

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

WEB_SERVER_PORT=13000
LOCAL_WEB_URL="http://localhost:${WEB_SERVER_PORT}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="${SCRIPT_DIR}/../build"

cleanup() {
    echo ""
    echo -e "${YELLOW}クリーンアップ中...${NC}"
    if [ -d "$WEB_DIR" ]; then
        rm -rf "$WEB_DIR"
        echo -e "${GREEN}✓ distディレクトリを削除しました${NC}"
    fi
    echo -e "${YELLOW}サーバーを停止しました${NC}"
}

trap cleanup EXIT INT TERM

echo -e "${BOLD}${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║${NC}  ローカルWebサーバー起動                                ${BOLD}${CYAN}║${NC}"
echo -e "${BOLD}${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

check_dependency() {
    local cmd="$1"
    local install_hint="${2:-}"

    if ! command -v "$cmd" &>/dev/null; then
        echo -e "${RED}✗ エラー: ${cmd} がインストールされていません${NC}" >&2
        if [ -n "$install_hint" ]; then
            echo -e "${YELLOW}  インストール方法: ${install_hint}${NC}" >&2
        fi
        exit 1
    fi
}

echo -e "${YELLOW}依存関係を確認中...${NC}"
check_dependency "npx" "Node.js と npm をインストールしてください"
echo -e "${GREEN}✓ 依存関係の確認完了${NC}"
echo ""

echo -e "${YELLOW}ポート ${WEB_SERVER_PORT} の使用状況を確認中...${NC}"
if lsof -Pi :${WEB_SERVER_PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ ポート ${WEB_SERVER_PORT} は既に使用されています${NC}"
    echo ""
    echo -e "${YELLOW}既存のサーバーを停止するには、以下のコマンドを実行してください:${NC}"
    echo -e "${CYAN}  kill \$(lsof -ti:${WEB_SERVER_PORT})${NC}"
    echo ""
    exit 1
fi
echo -e "${GREEN}✓ ポート ${WEB_SERVER_PORT} は利用可能です${NC}"
echo ""

echo -e "${YELLOW}ビルドを実行中...${NC}"
cd "${SCRIPT_DIR}/.." || exit 1
if ! npx vite build; then
    echo -e "${RED}✗ エラー: ビルドに失敗しました${NC}" >&2
    exit 1
fi
echo -e "${GREEN}✓ ビルドが完了しました${NC}"
echo ""

echo -e "${YELLOW}ビルドディレクトリを確認中...${NC}"
if [ ! -d "$WEB_DIR" ]; then
    echo -e "${RED}✗ エラー: ビルドディレクトリが見つかりません: ${WEB_DIR}${NC}" >&2
    exit 1
fi
echo -e "${GREEN}✓ ビルドディレクトリが見つかりました: ${WEB_DIR}${NC}"
echo ""

echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}  サーバー起動中...${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✓ Webサーバーが起動しました${NC}"
echo -e "${CYAN}  アクセスURL: ${BOLD}${LOCAL_WEB_URL}${NC}"
echo -e "${CYAN}  ポート: ${BOLD}${WEB_SERVER_PORT}${NC}"
echo -e "${CYAN}  ディレクトリ: ${BOLD}${WEB_DIR}${NC}"
echo ""
echo -e "${YELLOW}サーバーを停止するには、Ctrl+C を押してください${NC}"
echo ""

cd "$WEB_DIR" || exit 1
npx --yes http-server -p ${WEB_SERVER_PORT} --cors -c-1
