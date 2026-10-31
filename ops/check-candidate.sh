#!/usr/bin/env bash
# Render candidate templates against a private copy of the current content/database.
source "$(dirname "$0")/common.sh"
lock_ops
available_memory=$(awk '/MemAvailable/ {print $2}' /proc/meminfo)
[[ "$available_memory" -ge 2097152 ]] || { echo 'Candidate check requires 2 GiB available memory' >&2; exit 1; }
: "${1:?Pass the full-backup directory}" "${2:?Pass the candidate theme directory}"
backup=$(realpath "$1")
theme=$(realpath "$2")
[[ "$backup" = "$STATE_DIR/backups/full-"* && "$theme" = "$STATE_DIR/"* && -s "$theme/package.json" ]] || exit 1
(cd "$backup"; sha256sum -c SHA256SUMS)
workspace=$(mktemp -d "$STATE_DIR/candidate-check-XXXXXXXX")
suffix=${workspace##*-}
db="quichi-candidate-db-$suffix"
app="quichi-candidate-app-$suffix"
network="quichi-candidate-$suffix"
cleanup() { docker rm -fv "$app" "$db" >/dev/null 2>&1 || true; docker network rm "$network" >/dev/null 2>&1 || true; rm -rf -- "$workspace"; }
trap cleanup EXIT
password=$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n')
printf 'MYSQL_ROOT_PASSWORD=%s\nMYSQL_DATABASE=ghost\n' "$password" > "$workspace/db.env"
printf 'NODE_ENV=production\nurl=%s\ndatabase__client=mysql\ndatabase__connection__host=%s\ndatabase__connection__user=root\ndatabase__connection__password=%s\ndatabase__connection__database=ghost\n' "$SITE_URL" "$db" "$password" > "$workspace/app.env"
unset password
docker network create --internal "$network" >/dev/null
docker run -d --pull=never --memory=512m --network "$network" --name "$db" --env-file "$workspace/db.env" "$(cat "$backup/database-image.txt")" >/dev/null
ready=false
for attempt in $(seq 1 90); do
    if docker exec "$db" sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; mariadb --protocol=TCP -h127.0.0.1 -uroot ghost -e "SELECT 1"' >/dev/null 2>&1; then ready=true; break; fi
    sleep 2
done
[[ "$ready" = true ]] || exit 1
gzip -dc "$backup/database.sql.gz" | docker exec -i "$db" sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mariadb -uroot ghost'
mkdir "$workspace/content"
tar -xzf "$backup/content.tar.gz" -C "$workspace/content"
rsync -a --delete "$theme/" "$workspace/content/themes/V64/"
image=$(docker inspect --format '{{.Config.Image}}' "$GHOST_CONTAINER")
docker run -d --pull=never --memory=768m --network "$network" --name "$app" --env-file "$workspace/app.env" --mount "type=bind,src=$workspace/content,dst=/var/lib/ghost/content" "$image" >/dev/null
original_container=$GHOST_CONTAINER
GHOST_CONTAINER=$app
wait_health
for check in check-origin.cjs check-pagination.cjs check-homepage.cjs check-discovery.cjs; do
    docker exec -i "$app" node < "$STATE_DIR/scripts/$check"
done
GHOST_CONTAINER=$original_container
echo 'PASS: candidate rendered in isolated Ghost; production untouched; visual review still required'
