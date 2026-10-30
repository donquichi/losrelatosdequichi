# Los Relatos de Quichi

Version control for the custom code used by the Los Relatos de Quichi Ghost website.

## Setup status

- GitHub repository: https://github.com/donquichi/losrelatosdequichi
- Active Ghost theme source: `theme/V64/`.
- Automatic deployment: not configured yet.

## Repository scope

Track the site's custom theme and deployment scripts. Keep Ghost's database, uploaded media, credentials, production configuration, and installed dependencies on the server and out of this public repository.

Before enabling deployment, back up the live theme, identify the deployment user and destination, and validate the theme. Deployment should update only the confirmed custom theme; Ghost core updates and database changes need a separate process.

## Improvement roadmap

Audit date: October 30, 2026. The audit checked 116 URLs directly through Ghost, including 99 episodes, and reviewed representative desktop and mobile pages. All checked URLs returned HTTP 200 from Ghost. Direct homepage responses took 80–181 ms in three samples; these are not end-user loading times or Core Web Vitals. Some automated public requests received Cloudflare challenges while ordinary browser visits worked.

### First pass: performance while preserving the design

- [x] Remove the unused approximately 1.67 MB homepage cover-image preload.
- [x] Serve compressed WebP hero and thumbnail images, with responsive sizes where useful.
- [x] Replace the ten category PNG backgrounds (approximately 6.3 MB combined) with optimized WebP assets.
- [x] Lazy-load images below the first screen; prioritize the first visible hero image.
- [x] Limit recommendation queries instead of rendering every episode and discarding most cards in JavaScript. The original homepage HTML contained 110 image elements.
- [x] Validate theme templates, image URLs, and rendered pages; compare desktop and mobile screenshots after deployment.

Deployed October 30, 2026. The original theme was backed up before deployment. Category artwork went from 6,341,053 bytes to 288,174 bytes (about 95% smaller); original PNGs are retained. The first hero WebP was 46,124 bytes versus the previous 1,133,162-byte PNG. Homepage HTML decreased from 96,537 to 45,258 bytes, and initial image elements decreased from 110 to 16. These are asset and markup reductions, not measured whole-page loading-time improvements.

Ghost 6 validation passed with no errors or warnings after removing unused inherited settings. Post-deployment checks passed for 116 published URLs, 33 representative WebP image URLs, and all ten category artwork files. Representative episode pages rendered four related cards and five recommendations. Desktop and phone screenshots were inspected, and search results plus video/audio player rendering were checked.

### Browsing and navigation

- [x] Restore visible category pagination. The SCP archive now exposes all 34 episodes across three pages, with Anterior/Siguiente links and a page counter.
- [ ] Add a main navigation menu: Inicio, Episodios, Categorías, Sobre mí; provide a usable mobile menu.
- [x] Make all current categories discoverable. Raised the homepage category query cap from ten to 100, restoring the SCP card and showing all 11 published categories. Existing grid styling is preserved. Revisit category pagination if the site approaches 100 categories.
- [ ] Review and consolidate the two similar dark-cases/disappearances categories; preserve existing URLs with redirects when needed.
- [x] Label recommendations honestly instead of calling randomly selected posts popular. The bounded lists are now titled “Descubre otros relatos”; measured popularity or editorial curation can be added later.

Pagination was deployed October 30, 2026 after backing up the current theme. It uses Ghost's built-in pagination and page URL helpers, with Spanish labels, keyboard focus styles, and phone-sized controls. The shared infinite-scroll hook was removed from archive lists so page navigation does not depend on JavaScript. The same list component also restores pagination on author archives. Single-page categories do not show unnecessary controls.

Verification followed all 11 category archives and the author archive: 23 archive pages in total. The SCP pages contained 12, 12, and 10 different episodes; Paranormales contained 12 and 1; the author archive exposed all 99 episodes across nine pages. Checks found no duplicate episode cards within an archive, missing next links, wrong previous links, or incorrect page counters. Desktop and phone screenshots and actual browser navigation were inspected. The next roadmap item is the main navigation menu.

### Mobile design and readability

- [ ] Reduce the mobile header and long hero-title footprint.
- [ ] Bring recent episodes closer to the top and avoid repeating the same featured episode unnecessarily.
- [ ] Improve dark-red text contrast against black, secondary text size, and link visibility while preserving the horror aesthetic.
- [ ] Use left-aligned text for long informational pages.
- [ ] Add carousel pause controls and reduced-motion support, or replace the carousel with one featured episode.

### Content, language, and search presentation

- [ ] Remove repeated paragraphs and sections on Sobre mí; clarify the relationship with the separate English About page.
- [ ] Set the Spanish publication language correctly; the audited homepage declared English.
- [ ] Translate search and interface labels consistently, including footer labels and accented Spanish text.
- [ ] Improve missing or repetitive page descriptions and review title/heading structure.

### Further performance and delivery work

- [ ] Defer third-party video and audio widgets with lightweight previews where practical, preserving playback and platform links.
- [ ] Review fonts, unused styles, and accumulated CSS overrides after the image work.
- [ ] Measure public mobile and desktop performance with repeatable before/after conditions and Core Web Vitals tooling.
- [ ] Review public caching and Cloudflare challenge behavior without weakening protection unnecessarily.
- [ ] Configure automatic deployment from GitHub with validation, a theme backup, rollback, and successful browser checks.

## Verification required for every visual change

Back up the active theme before deploying. Check the homepage, an episode page and its players, category archives and pagination, search, and informational pages at desktop and phone widths. Inspect screenshots for missing images, distorted proportions, clipped text, horizontal scrolling, and changes to spacing. Revert a deployment if it breaks the existing layout or key functionality. Keep verification evidence and private operational details outside this public repository.

## Development checks

Validate theme compatibility with `npx --yes gscan@5.4.3 theme/V64 --v6`. The `scripts/check-origin.cjs` script checks sitemap pages and representative optimized images using Node's built-in fetch. The `scripts/check-pagination.cjs` script follows category and author page links, checks page counters and previous links, and detects missing next links, loops, and duplicate episode cards. Run these scripts where the Ghost origin is reachable (default `http://127.0.0.1:2368`), or set the `ORIGIN` environment variable. They require no credentials and make no website changes. Allow Ghost to finish startup before running checks. Browser inspection is still required because HTTP checks do not establish visual correctness or full media playback.
