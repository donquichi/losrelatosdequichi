# Reliability and discovery operations

Work started October 31, 2026 on `codex/reliability-discovery`. Interface changes must remain separate from production until desktop/mobile screenshots and actual search behavior are checked. Browser capture was unavailable during preparation. A passing theme validator or HTTP check is not visual approval.

## Private configuration

Operations scripts read `~/.config/losrelatosdequichi/ops.env`, or `QUICHI_OPS_CONFIG`. Set `CONTENT_DIR`, `THEME_DIR`, `STATE_DIR`, `GHOST_CONTAINER`, `DB_CONTAINER`, and `SITE_URL`. Keep configuration and backups private. The theme destination must resolve to the configured content directory's `themes/V64`; state must be outside content. Run with the existing server account's Docker permissions. No database credential is stored in the public scripts; the database container supplies it at runtime.

## Backups and recovery checks

`ops/backup.sh` creates a private completed snapshot directory only after successful database export, content archiving, and archive checks. It includes SQL, Ghost content (including media, theme and routing files), post counts, the database image identifier, runtime configuration, and SHA-256 checksums. Runtime configuration contains credentials: never upload the snapshot to this public repository. Snapshot directories are owner-only by default.

The SQL export uses a transactional snapshot. File copying and SQL are not a single atomic snapshot of the whole application; pause publishing/uploads when an exact coordinated recovery point is required. Scheduling while publishing is quiet reduces that risk. The script refuses to start with less than 2 GiB available. It does not delete older backups automatically. Review storage regularly before choosing a retention policy.

`ops/verify-restore.sh ABSOLUTE_BACKUP_PATH` checks checksums, imports SQL into a newly created MariaDB container with no network and no published ports, compares post status/type counts, and extracts content into a temporary directory. It then removes only its temporary container/volume and extraction directory. `ops/verify-latest.sh` selects the newest completed full snapshot for the same check. No production database import occurs during this test.

This verifies database import and content extraction, not a full end-to-end traffic switchover. A real recovery requires stopping Ghost, preserving the failed state, restoring content and SQL into the intended confirmed targets, checking the private runtime settings, starting Ghost, and checking routes, posts, images, search, players and browser layouts before reopening publishing. Do not run a destructive production restore merely to test a backup.

These snapshots are local to the server. Protection against loss of the server/disk still needs a chosen private off-server destination and a tested copy/restore procedure. Do not call local snapshots an off-site disaster-recovery solution.

## Automatic theme delivery

`ops/deploy.sh` is intended for a five-minute server poll of public GitHub `main`. It uses a shared operations lock, validates a candidate with pinned GScan, saves the previous theme, updates only the confirmed V64 directory, restarts Ghost, and runs origin/pagination/homepage checks. Failure after activation restores the previous theme and checks health. Routes, content migrations, and Ghost core changes are separate operations.

The file `STATE_DIR/deployment-paused` prevents any fetch/deployment. Install with this marker present. Do not remove it until the production baseline, candidate validation, rollback behavior, and visual review are accepted. GitHub `validate-theme.yml` provides independent theme/JavaScript/shell checks. Reviewed changes must reach `main` before deployment; working feature branches must never be polled into production.

The npm validator needs access to its package or cache. A validation/network failure must leave production unchanged. Health/origin checks measure the direct Ghost origin, not Cloudflare or real-user performance. No email, Slack, or other external alerts are configured by these scripts; failures are recorded in private job logs.

## Support and discovery preparation

The episode/category archives gain a prominent native Ghost search control and category shortcuts with live post counts. Search is global across categories, as its nearby help text explains; category links navigate to the existing paginated archives. The native search index covers the current 99-episode catalog rather than only cards on the loaded page. Check older titles, accented words, SCP numbers, no results, keyboard focus and closing the modal before release.

`donation_url` is an optional Ghost theme setting. Blank means no donation menu item or support section is rendered. Set only a reviewed public HTTPS donation URL after the owner chooses a provider. Do not insert an account name or fake payment link. Keep donations separate from affiliate recommendations.

To obtain a link, the owner can create a creator page at [Ko-fi](https://ko-fi.com/) and connect their own payment method, or create a [PayPal.Me link](https://www.paypal.com/us/cshelp/article/what-is-paypalme-help432) from their PayPal account. The owner completes private account and agreement steps directly with the provider, then supplies only the public page URL. No payment account has been created by this work.

Spanish theme labels and an `es` locale file are prepared. The live publication language, native search translation, metadata and repeated About content need a separately verified Ghost settings/content pass; changing theme labels alone does not complete that work.

`scripts/measure-origin.cjs` records three HTTP response samples for representative pages. It reports bytes and response timings; it does not measure LCP, INP, CLS, real-phone speed, media startup, or audience size. Keep repeatable before/after conditions for those later browser measurements.
