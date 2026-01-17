#!/bin/bash
set -e

if [ $# -eq 0 ]; then
    echo "❌ Error: Backup file is required"
    echo "Usage: $0 <backup-file.sql>"
    exit 1
fi

CONTAINER_NAME="${CONTAINER_NAME:-db}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-rootpassword}"
MYSQL_DATABASE="${MYSQL_DATABASE:-portfolio}"
BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "❌ Error: Backup file '${BACKUP_FILE}' not found"
    exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "❌ Error: Container '${CONTAINER_NAME}' is not running"
    exit 1
fi

echo "🔄 Restoring MySQL database..."
echo "Container: ${CONTAINER_NAME}"
echo "Database: ${MYSQL_DATABASE}"
echo "Backup file: ${BACKUP_FILE}"

read -p "⚠️  This will overwrite the current database. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

if [[ "${BACKUP_FILE}" == *.gz ]]; then
    echo "📦 Decompressing backup..."
    TEMP_FILE=$(mktemp)
    gunzip -c "${BACKUP_FILE}" > "${TEMP_FILE}"
    BACKUP_FILE="${TEMP_FILE}"
    trap 'rm -f "${TEMP_FILE}"' EXIT
fi

docker exec -i "${CONTAINER_NAME}" mysql \
    -u root \
    -p"${MYSQL_ROOT_PASSWORD}" \
    "${MYSQL_DATABASE}" < "${BACKUP_FILE}"

echo "✅ Database restored successfully!"
