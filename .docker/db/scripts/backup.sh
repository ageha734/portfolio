#!/bin/bash
set -e

CONTAINER_NAME="${CONTAINER_NAME:-db}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-rootpassword}"
MYSQL_DATABASE="${MYSQL_DATABASE:-portfolio}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
BACKUP_NAME="${1:-backup-$(date +%Y%m%d-%H%M%S)}"
BACKUP_FILE="${BACKUP_DIR}/${BACKUP_NAME}.sql"

mkdir -p "${BACKUP_DIR}"

echo "📦 Creating MySQL backup..."
echo "Container: ${CONTAINER_NAME}"
echo "Database: ${MYSQL_DATABASE}"
echo "Backup file: ${BACKUP_FILE}"

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
	echo "❌ Error: Container '${CONTAINER_NAME}' is not running"
	exit 1
fi

docker exec "${CONTAINER_NAME}" mysqldump \
	-u root \
	-p"${MYSQL_ROOT_PASSWORD}" \
	--single-transaction \
	--routines \
	--triggers \
	--events \
	"${MYSQL_DATABASE}" >"${BACKUP_FILE}"

if command -v gzip &>/dev/null; then
	echo "🗜️  Compressing backup..."
	gzip -f "${BACKUP_FILE}"
	BACKUP_FILE="${BACKUP_FILE}.gz"
fi

FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "✅ Backup completed successfully!"
echo "   File: ${BACKUP_FILE}"
echo "   Size: ${FILE_SIZE}"
