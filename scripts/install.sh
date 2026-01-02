#!/usr/bin/env bash

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ "${NODE_ENV:-}" = "production" ] || [ "${CI:-}" = "true" ]; then
    exit 0
fi

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

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  開発環境セットアップ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}依存関係を確認中...${NC}"
check_dependency "node" "Node.js をインストールしてください (https://nodejs.org/)"
check_dependency "bun" "Bun をインストールしてください (https://bun.sh/)"
check_dependency "bunx" "Bunx をインストールしてください (https://bun.sh/docs/cli/bunx)"
check_dependency "gh" "GitHub CLI をインストールしてください (https://cli.github.com/)"
check_dependency "docker" "Docker をインストールしてください (https://www.docker.com/)"
echo -e "${GREEN}✓ 依存関係の確認完了${NC}"
echo ""

echo -e "${YELLOW}GitHub CLI の認証状態を確認中...${NC}"
if ! gh auth status --hostname github.com &>/dev/null; then
    echo -e "${RED}✗ GitHub CLI が認証されていません${NC}" >&2
    echo -e "${YELLOW}  認証方法: gh auth login --hostname github.com${NC}" >&2
    exit 1
fi
echo -e "${GREEN}✓ GitHub CLI の認証確認完了${NC}"
echo ""

if [ -f "${HOME}/.docker/config.json" ] && grep -q "ghcr.io" "${HOME}/.docker/config.json" 2>/dev/null; then
    echo -e "${GREEN}✓ GitHub Container Registry は既にログイン済みです${NC}"
else
    echo -e "${YELLOW}GitHub Container Registry にログイン中...${NC}"
    if gh auth token --hostname github.com | docker login ghcr.io -u "$(git config user.name)" --password-stdin; then
        echo -e "${GREEN}✓ GitHub Container Registry へのログイン完了${NC}"
    else
        echo -e "${RED}✗ GitHub Container Registry へのログインに失敗しました${NC}" >&2
        exit 1
    fi
fi
echo ""

echo -e "${YELLOW}lefthook をセットアップ中...${NC}"
bunx lefthook install || echo -e "${YELLOW}⚠ lefthook のセットアップで警告がありましたが、続行します${NC}" || true
echo -e "${GREEN}✓ lefthook のセットアップ完了${NC}"
echo ""

echo -e "${YELLOW}playwright をインストール中...${NC}"
if bunx playwright install; then
    echo -e "${GREEN}✓ playwright のインストール完了${NC}"
else
    echo -e "${RED}✗ playwright のインストールに失敗しました${NC}" >&2
    exit 1
fi
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  セットアップ完了${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
