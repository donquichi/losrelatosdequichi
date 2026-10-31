#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
CONFIG=${QUICHI_OPS_CONFIG:-${XDG_CONFIG_HOME:-$HOME/.config}/losrelatosdequichi/ops.env}
[[ -f "$CONFIG" ]] || { echo 'Missing private ops configuration' >&2; exit 1; }
source "$CONFIG"
: "${CONTENT_DIR:?}" "${THEME_DIR:?}" "${STATE_DIR:?}" "${GHOST_CONTAINER:?}" "${DB_CONTAINER:?}" "${SITE_URL:?}"
[[ "$CONTENT_DIR" = /* && "$CONTENT_DIR" != / && -d "$CONTENT_DIR/themes" ]] || exit 1
[[ "$(realpath "$THEME_DIR")" = "$(realpath "$CONTENT_DIR")/themes/V64" ]] || { echo 'Unexpected theme destination' >&2; exit 1; }
[[ "$STATE_DIR" = /* && "$STATE_DIR" != / && "$STATE_DIR" != "$CONTENT_DIR"* ]] || exit 1
mkdir -p "$STATE_DIR/backups" "$STATE_DIR/logs"
lock_ops() { exec 9>"$STATE_DIR/ops.lock"; flock -w 5 9; }
db_query() {
    docker exec -i "$DB_CONTAINER" sh -c 'export MYSQL_PWD="${MYSQL_ROOT_PASSWORD:-${MARIADB_ROOT_PASSWORD:-}}"; exec mariadb -N -B -uroot "${MYSQL_DATABASE:-${MARIADB_DATABASE:-ghost}}"'
}
health() {
    docker exec -i "$GHOST_CONTAINER" node <<'NODE'
fetch('http://127.0.0.1:2368/', {headers:{Host:'losrelatosdequichi.com','X-Forwarded-Proto':'https'}, signal:AbortSignal.timeout(5000)}).then(r=>{if(r.status!==200)process.exitCode=1;}).catch(()=>{process.exitCode=1;});
NODE
}
wait_health() { for attempt in $(seq 1 60); do if health >/dev/null 2>&1; then return 0; fi; sleep 2; done; return 1; }
