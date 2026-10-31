#!/usr/bin/env bash
source "$(dirname "$0")/common.sh"
latest=$(find "$STATE_DIR/backups" -mindepth 1 -maxdepth 1 -type d -name 'full-*' | sort | tail -n 1)
[[ -n "$latest" ]] || { echo 'No completed full backup available' >&2; exit 1; }
exec bash "$(dirname "$0")/verify-restore.sh" "$latest"
