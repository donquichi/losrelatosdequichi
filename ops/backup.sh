#!/usr/bin/env bash
source "$(dirname "$0")/common.sh"
lock_ops
available=$(df -Pk "$STATE_DIR" | awk 'NR==2 {print $4}')
[[ "$available" -ge 2097152 ]] || { echo 'Less than 2 GiB available; refusing backup' >&2; exit 1; }
staging=$(mktemp -d "$STATE_DIR/backups/.partial-XXXXXXXX")
trap 'rm -rf -- "$staging"' EXIT
docker exec "$DB_CONTAINER" sh -c 'export MYSQL_PWD="${MYSQL_ROOT_PASSWORD:-${MARIADB_ROOT_PASSWORD:-}}"; exec mariadb-dump --single-transaction --quick --routines --triggers --events --hex-blob -uroot "${MYSQL_DATABASE:-${MARIADB_DATABASE:-ghost}}"' | gzip > "$staging/database.sql.gz"
printf 'SELECT type,status,COUNT(*) FROM posts GROUP BY type,status ORDER BY type,status;\n' | db_query > "$staging/post-counts.tsv"
docker inspect --format '{{.Image}}' "$DB_CONTAINER" > "$staging/database-image.txt"
docker inspect "$GHOST_CONTAINER" "$DB_CONTAINER" > "$staging/runtime-private.json"
tar --exclude='./logs' --exclude='./data/*.log' -czf "$staging/content.tar.gz" -C "$CONTENT_DIR" .
gzip -t "$staging/database.sql.gz"
tar -tzf "$staging/content.tar.gz" >/dev/null
(cd "$staging"; sha256sum database.sql.gz content.tar.gz post-counts.tsv database-image.txt runtime-private.json > SHA256SUMS)
date -u +%FT%TZ > "$staging/created-at.txt"
destination="$STATE_DIR/backups/full-$(date -u +%Y%m%dT%H%M%SZ)-${staging##*-}"
mv -- "$staging" "$destination"
trap - EXIT
echo "$destination"
