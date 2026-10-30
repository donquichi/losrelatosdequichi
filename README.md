# Los Relatos de Quichi

Version control for the custom code used by the Los Relatos de Quichi Ghost website.

## Setup status

- GitHub repository: https://github.com/donquichi/losrelatosdequichi
- Active Ghost theme source: `theme/V64/`.
- Automatic deployment: not configured yet.

## Repository scope

Track the site's custom theme and deployment scripts once the live installation has been inspected. Keep Ghost's database, uploaded media, credentials, production configuration, and installed dependencies on the server and out of this public repository.

Before enabling deployment, back up the live theme, identify the deployment user and destination, and validate the theme. Deployment should update only the confirmed custom theme; Ghost core updates and database changes need a separate process.

## Improvement roadmap

Audit date: October 30, 2026. The audit checked 116 URLs directly through Ghost, including 99 episodes, and reviewed representative desktop and mobile pages. All checked URLs returned HTTP 200 from Ghost. Direct homepage responses took 80–181 ms in three samples; these are not end-user loading times or Core Web Vitals. Some automated public requests received Cloudflare challenges while ordinary browser visits worked.

### First pass: performance while preserving the design

- [ ] Remove the unused approximately 1.67 MB homepage cover-image preload.
- [ ] Serve compressed WebP hero and thumbnail images, with responsive sizes where useful.
- [ ] Replace the ten category PNG backgrounds (approximately 6.3 MB combined) with optimized WebP assets.
- [ ] Lazy-load images below the first screen; prioritize the first visible hero image.
- [ ] Limit recommendation queries instead of rendering every episode and discarding most cards in JavaScript. The original homepage HTML contained 110 image elements.
- [ ] Validate theme templates, image URLs, and rendered pages; compare desktop and mobile screenshots after deployment.

### Browsing and navigation

- [ ] Restore visible category pagination. The SCP archive showed 12 of 34 episodes with no visible next-page control.
- [ ] Add a main navigation menu: Inicio, Episodios, Categorías, Sobre mí; provide a usable mobile menu.
- [ ] Make all categories discoverable. The alphabetical ten-category homepage limit omitted SCP.
- [ ] Review and consolidate the two similar dark-cases/disappearances categories; preserve existing URLs with redirects when needed.
- [ ] Provide genuine curated or measured popular episodes, or label recommendations honestly instead of calling randomly selected posts popular.

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
