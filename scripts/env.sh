#!/bin/bash
set -e

PROJECT_NAME="portfolio"
ENVIRONMENT="${1:-production}"
ENV_FILE="${2:-.env}"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found"
    exit 1
fi

echo "📦 Importing environment variables from $ENV_FILE to Cloudflare Pages ($ENVIRONMENT)..."
echo ""

while IFS= read -r line || [ -n "$line" ]; do
    if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
        continue
    fi

    if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
        key="${BASH_REMATCH[1]}"
        value="${BASH_REMATCH[2]}"

        value="${value#\"}"
        value="${value%\"}"
        value="${value#\'}"
        value="${value%\'}"

        if [[ "$key" == VITE_* ]]; then
            echo "  Setting $key..."

            echo "$value" | wrangler pages secret put "$key" --project-name "$PROJECT_NAME" 2>/dev/null || {
                echo "    ⚠️  Failed to set $key (may require interactive login)"
            }
        fi
    fi
done <"$ENV_FILE"

echo ""
echo "✅ Environment variables import completed!"
echo ""
echo "Note: To view or manage secrets, visit:"
echo "  https://dash.cloudflare.com/ > Workers & Pages > $PROJECT_NAME > Settings > Environment variables"
