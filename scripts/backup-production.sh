#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/plately}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/plately}"
STAMP="$(date +%F-%H%M%S)"

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR" || true

if [ -f "$APP_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$APP_DIR/.env"
  set +a
fi

echo "==> Backup directory: $BACKUP_DIR"

if [ -n "${DATABASE_URL:-}" ]; then
  echo "==> Dumping Postgres"
  pg_dump "$DATABASE_URL" | gzip -9 > "$BACKUP_DIR/postgres-$STAMP.sql.gz"
fi

if [ -d "$APP_DIR/data" ]; then
  echo "==> Archiving data directory"
  tar -C "$APP_DIR" -czf "$BACKUP_DIR/data-$STAMP.tar.gz" data
fi

if [ -f "$APP_DIR/.env" ]; then
  echo "==> Archiving encrypted-ish env copy permissions only"
  install -m 600 "$APP_DIR/.env" "$BACKUP_DIR/env-$STAMP"
fi

find "$BACKUP_DIR" -type f -mtime +30 -name '*.gz' -delete
find "$BACKUP_DIR" -type f -mtime +30 -name 'env-*' -delete

echo "Backup complete:"
ls -lh "$BACKUP_DIR" | tail -20
