#!/usr/bin/env bash
source "$(dirname "$0")/common.sh"
lock_ops
: "${1:?Pass the absolute full-backup directory}"
backup=$(realpath "$1")
[[ "$backup" = "$STATE_DIR/backups/full-"* && -f "$backup/SHA256SUMS" ]] || exit 1
(cd "$backup"; sha256sum -c SHA256SUMS)
workspace=$(mktemp -d "$STATE_DIR/restore-check-XXXXXXXX")
container="quichi-restore-check-${workspace##*-}"
cleanup() { docker rm -fv "$container" >/dev/null 2>&1 || true; rm -rf -- "$workspace"; }
trap cleanup EXIT
image=$(cat "$backup/database-image.txt")
docker image inspect "$image" >/dev/null
password=$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n')
printf 'MYSQL_ROOT_PASSWORD=%s\nMYSQL_DATABASE=ghost\n' "$password" > "$workspace/database.env"
unset password
docker run -d --pull=never --network none --name "$container" --env-file "$workspace/database.env" "$image" >/dev/null
ready=false
for attempt in $(seq 1 90); do
    if docker exec "$container" sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; mariadb --protocol=TCP -h127.0.0.1 -uroot ghost -e "SELECT 1"' >/dev/null 2>&1; then ready=true; break; fi
    sleep 2
done
[[ "$ready" = true ]] || { echo 'Isolated database did not become ready' >&2; exit 1; }
gzip -dc "$backup/database.sql.gz" | docker exec -i "$container" sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mariadb -uroot ghost'
printf 'SELECT type,status,COUNT(*) FROM posts GROUP BY type,status ORDER BY type,status;\n' | docker exec -i "$container" sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mariadb -N -B -uroot ghost' > "$workspace/post-counts.tsv"
diff -u "$backup/post-counts.tsv" "$workspace/post-counts.tsv"
mkdir "$workspace/content"
tar -xzf "$backup/content.tar.gz" -C "$workspace/content"
[[ -s "$workspace/content/themes/V64/package.json" && -d "$workspace/content/images" ]]
echo 'PASS: isolated database import, post counts, archive checksums, and content extraction'
cat "$workspace/post-counts.tsv"
