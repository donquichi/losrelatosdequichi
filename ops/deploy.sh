#!/usr/bin/env bash
source "$(dirname "$0")/common.sh"
lock_ops
[[ ! -e "$STATE_DIR/deployment-paused" ]] || { echo 'Deployment paused; no live files changed'; exit 0; }
repo="$STATE_DIR/repository.git"
if [[ ! -d "$repo" ]]; then git init --bare "$repo" >/dev/null; git --git-dir="$repo" remote add origin https://github.com/donquichi/losrelatosdequichi.git; fi
git --git-dir="$repo" fetch --depth=1 origin main
revision=$(git --git-dir="$repo" rev-parse FETCH_HEAD)
[[ "$revision" != "$(cat "$STATE_DIR/deployed-revision" 2>/dev/null || true)" ]] || exit 0
candidate=$(mktemp -d "$STATE_DIR/candidate-XXXXXXXX")
docker_candidate="/tmp/quichi-validate-${candidate##*-}"
cleanup() { docker exec "$GHOST_CONTAINER" rm -rf -- "$docker_candidate" >/dev/null 2>&1 || true; rm -rf -- "$candidate"; }
trap cleanup EXIT
git --git-dir="$repo" archive "$revision" theme/V64 scripts | tar -x -C "$candidate"
docker cp "$candidate/theme/V64" "$GHOST_CONTAINER:$docker_candidate" >/dev/null
docker exec -w /tmp "$GHOST_CONTAINER" npx --yes gscan@5.4.3 "$docker_candidate" --v6
release="$STATE_DIR/backups/theme-$(date -u +%Y%m%dT%H%M%SZ)-${revision:0:12}"
mkdir "$release"
cp -a "$THEME_DIR" "$release/V64"
printf '%s\n' "$revision" > "$release/candidate-revision"
activated=false
rollback() {
    result=$?
    if [[ "$activated" = true ]]; then
        rsync -a --delete "$release/V64/" "$THEME_DIR/"
        docker restart "$GHOST_CONTAINER" >/dev/null
        if wait_health; then echo 'Rolled back to the previous theme' >&2; else echo 'Rollback health check failed: operator action required' >&2; fi
    fi
    cleanup
    exit "$result"
}
trap rollback ERR
activated=true
rsync -a --delete "$candidate/theme/V64/" "$THEME_DIR/"
docker restart "$GHOST_CONTAINER" >/dev/null
wait_health
for check in check-origin.cjs check-pagination.cjs check-homepage.cjs check-adsense.cjs; do
    docker exec -i "$GHOST_CONTAINER" node < "$candidate/scripts/$check"
done
printf '%s\n' "$revision" > "$STATE_DIR/deployed-revision"
activated=false
echo "Deployed $revision"
