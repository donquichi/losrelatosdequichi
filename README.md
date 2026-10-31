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

The ordered implementation plan is in [Website feature and delivery roadmap](docs/website-roadmap.md). It gathers the strongest ideas from the ten-site comparison, with desktop/mobile behavior, publishing automation, dependencies, and release acceptance. It takes precedence over the order of the older audit lists below. First finish pending visual review, then add voluntary support and improve archive discovery. The owner will supply an existing donation link; the public URL is still pending. Features in that plan are proposals, not deployed changes.

Affiliate setup has begun with a [program shortlist, application preparation, and first-page specification](docs/affiliate-launch.md). Amazon Associates US is a candidate to assess, with Awin as an alternative; no account approval or live referral links are claimed. The first live recommendations page needs actual affiliate links and selected products, with desktop/mobile verification.

### Consolidated future-feature checklist

All items below are planned and unchecked. Feature IDs match the detailed roadmap. Apply changes in small releases, preserve the black-and-red identity and existing layout, and check desktop and mobile appearance before marking visual work complete. The older audit sections below record completed work and its history.

#### Release 0 — Verify and protect the site

- [ ] **F01 — Finish visual review:** inspect the latest readability changes with fresh desktop and phone screenshots.
- [ ] **F02 — Automatic deployment and recovery:** GitHub deployment with theme validation, private backups, health checks, rollback, and a verified database/media recovery procedure.
- [ ] **F03 — Performance and audience baseline:** repeatable desktop/mobile loading and layout-stability measurements, playback checks, and actual audience figures when available.

#### Release 1 — Support and episode discovery

- [ ] **F04 — “Apoya el proyecto”:** a discreet donation link in navigation and after episodes/footer. Use the owner's existing public donation page; URL pending. Keep it separate from story submission and membership benefits.
- [ ] **F05 — Visible archive search:** search the full published catalog, including older episodes, accented titles, and SCP numbers; provide clear and empty-result states.
- [ ] **F06 — Category shortcuts and archive navigation:** clear category selection, reliable counts where available, and numbered pagination where useful. Keep phone controls easy to tap.
- [ ] **F07 — Spanish and search presentation:** correct publication language, consistent interface/footer labels, useful descriptions and headings, and removal of repeated About content.

#### Release 2 — Faster, more comfortable watching, listening, and reading

- [ ] **F08 — Ver / Escuchar / Leer shortcuts:** place available formats near each episode title and hide formats that do not exist.
- [ ] **F09 — Lightweight media players:** load heavy video/audio embeds on request, preserve working platform links, and size landscape/portrait media correctly.
- [ ] **F10 — Better episode cards:** short synopsis, accurate duration when available, readable dates/categories, consistent thumbnails, long-title wrapping, and balanced card/sidebar spacing.
- [ ] **F11 — Carousel accessibility:** pause/resume, keyboard controls, larger mobile touch targets, stable slide layout, and reduced-motion support.
- [ ] **F12 — Reading tools and chapters:** optional reading progress/text-size controls, text-based reading time, and real chapter timestamps for longer episodes.
- [ ] **F27 — Font and CSS cleanup:** review unused fonts/styles and accumulated overrides while preserving existing custom production styling.
- [ ] **F28 — Caching and public delivery:** review caching and Cloudflare challenge behavior, then measure results without weakening existing protection.

#### Release 3 — Collections and recommendations

- [ ] **F13 — “Empieza aquí”:** five selected introductory episodes with short reasons to choose them.
- [ ] **F14 — Relevant recommendations:** prioritize related categories, exclude the current episode and duplicates, and provide a bounded fallback automatically.
- [ ] **F15 — Series and collection pages:** introductions, ordered lists for genuine series, and previous/next navigation within each series.
- [ ] **F16 — Seasonal/editorial selections:** collections such as Halloween, SCP introductions, maritime horror, and disappearances.
- [ ] **F17 — “Sorpréndeme”:** an optional random public story, secondary to search and categories.

#### Release 4 — Community and returning visitors

- [ ] **F18 — Free email updates:** verified signup/confirmation/unsubscribe and an agreed episode-update or digest workflow.
- [ ] **F19 — Episode sharing:** copy link, supported native sharing on phones, and useful social previews.
- [ ] **F20 — “Cuéntanos tu relato”:** invite visitors to submit stories for possible adaptation into narrated videos. Add a menu link and an invitation after episodes, with a responsive form and a private editorial review workflow.
- [ ] **F21 — Save for later and reading position:** optional browser-local bookmarks/progress, with remove/reset controls and clear limits on cross-device support.
- [ ] **F22 — Creator introduction and follow options:** concise project information, contact route, available listening platforms, and a sustainable publication schedule if established.
- [ ] **F23 — Community feedback:** consider moderated comments or a lightweight feedback route when moderation capacity exists.

The story form should request a name or pseudonym, an anonymous-credit choice, a private contact email, story title, and full written story. Include an explicit permission choice for adaptation and publication as a narrated video, separate from newsletter signup. Start with written submissions; optional voice submissions can follow later. Confirm receipt and handle validation/delivery errors. Keep submissions and contact details outside this public repository. Review submissions privately before selecting, adapting, producing, and publishing; sending a story does not trigger automatic video creation or publication.

Proposed invitation: **“Tu historia podría convertirse en nuestro próximo video. ¿Viviste algo inexplicable? Cuéntanos lo que pasó. Seleccionaremos algunos relatos para narrarlos en Los Relatos de Quichi.”** Button: **“Enviar mi relato.”** Note: **“Revisamos todas las historias; el envío no garantiza su publicación.”** Choose the submission destination, storage, and reviewer before launch.

#### Release 5 — Optional future revenue

Revenue goal: earn affiliate/referral commissions from recommending other sellers' products, website advertisements, and social media as well as voluntary support. The owner does not have a product to sell; an owned-product store is optional later work. Affiliate programs, referral links, advertising accounts, and social monetization eligibility are not yet selected or verified. Research suitable offers alongside the earlier releases. No checkout, ad placement, affiliate enrollment, or monetization enrollment is enabled by this documentation.

- [ ] **F29 — Affiliate/referral recommendations:** choose suitable programs and products, then create a small Recomendados page and relevant episode recommendations using the owner's approved tracking links. The seller handles checkout and orders; the site earns a percentage or fixed commission on qualifying attributed sales according to program terms. Clearly identify affiliate links, preserve tracking parameters, check permitted website/social placements and destination regions, and use network-confirmed commissions rather than clicks as revenue evidence. Do not require the owner to create a product, hold inventory, or operate checkout.
- [ ] **F30 — Website advertising:** assess direct sponsor placements and an ad network such as AdSense. Verify account/site approval and content eligibility before integration. Begin with a limited labeled placement, reserve its dimensions, check desktop/mobile layout and load performance, and measure actual revenue. Never encourage visitors to click ads to support the site.
- [ ] **F31 — Social media revenue:** audit current channels and their monetization dashboards, assess native creator revenue and sponsored posts, and connect relevant content to product links. Adapt original episode excerpts for each platform and track which posts produce visits and completed sales. Do not assume followers/views guarantee eligibility, payouts, or monetization on every platform.
- [ ] **F24 — Supporter membership:** assess one sustainable paid benefit such as a monthly bonus story or early access, while retaining a useful free catalog.
- [ ] **F25 — Digital collections and merchandise:** assess a curated anthology and a small merchandise range after validating audience interest.
- [ ] **F26 — Sponsor/media kit:** verified audience figures, a contact route, and a limited sponsorship offer when demand supports it.

#### Requirements shared by all releases

- [ ] Apply template-driven features automatically to new episodes: listings, category links, available formats, related stories, sharing, and supported image handling.
- [ ] Document publishing conventions for excerpts, canonical categories, verified media duration, timestamps, and genuine series order. Omit missing data cleanly.
- [ ] Keep editorial selections, story review, email sends, paid benefits, and product decisions under deliberate owner/editor control.
- [ ] Check desktop, tablet where relevant, and 320/390-pixel phone layouts for image distortion, clipped text, horizontal scrolling, touch/keyboard usability, and affected media playback. Save and inspect screenshots for every visual release.

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
- [x] Add a main navigation menu: Inicio, Episodios, Categorías, Sobre mí; provide a usable mobile menu.
- [x] Make all current categories discoverable. Raised the homepage category query cap from ten to 100, restoring the SCP card. The site now has ten public categories after the consolidation below. Existing grid styling is preserved. Revisit category pagination if the site approaches 100 categories.
- [x] Consolidate the two dark-cases/disappearances categories as “Casos Oscuros y Desapariciones,” preserving all seven episodes and redirecting the old category URL.
- [x] Label recommendations honestly instead of calling randomly selected posts popular. The bounded lists are now titled “Descubre otros relatos”; measured popularity or editorial curation can be added later.

Pagination was deployed October 30, 2026 after backing up the current theme. It uses Ghost's built-in pagination and page URL helpers, with Spanish labels, keyboard focus styles, and phone-sized controls. The shared infinite-scroll hook was removed from archive lists so page navigation does not depend on JavaScript. The same list component also restores pagination on author archives. Single-page categories do not show unnecessary controls.

Verification followed all 11 category archives and the author archive: 23 archive pages in total. The SCP pages contained 12, 12, and 10 different episodes; Paranormales contained 12 and 1; the author archive exposed all 99 episodes across nine pages. Checks found no duplicate episode cards within an archive, missing next links, wrong previous links, or incorrect page counters. Desktop and phone screenshots and actual browser navigation were inspected.

Navigation was added October 30, 2026, preserving the centered logo, black background, red accents, existing typography, social icons, and episode card layout. Desktop links sit beneath the logo. Phones use a native expandable Menú control with keyboard support; it does not depend on JavaScript. Categorías links to the homepage's `#categorias` section, including the SCP card. Sobre mí opens the existing introduction page.

The new `/episodios/` channel lists all published episodes, automatically paginated at 12 per page. It uses the same cards and colors as category archives, without changing individual episode URLs or the homepage collection. The public routing configuration is tracked in `ghost/routes.yaml` and must be deployed with the theme when setting up another instance. Both the theme and previous route configuration were backed up before deployment. Validation covered all 99 episodes across nine archive pages, 117 page URLs, 40 representative WebP image URLs, all ten category artwork files, and existing archives. Browser checks covered desktop, tablet, and 320/390-pixel phone layouts, navigation destinations, and opening/closing the mobile menu with keyboard support.

The category consolidation was completed October 30, 2026. Two episodes were moved into the existing five-episode category through Ghost's Admin API, preserving their tag order and other tags. The empty duplicate was removed, and the surviving category was named “Casos Oscuros y Desapariciones.” Missing category metadata was preserved from the removed tag. All seven episode URLs, statuses, and publication dates were verified against a private backup; the published episode total remains 99. Public regression checks passed for 116 page URLs and all archive pagination after the duplicate was removed. The homepage now shows one combined card, with the existing colors and layout.

The canonical category URL is `/tag/casos-oscuros-desapariciones/`. The old `/tag/casos-oscuros/` URL, its RSS address, and subpaths permanently redirect to the canonical category using the public configuration in `ghost/redirects.yaml`. The category and RSS redirect destinations were checked successfully. Category assignments are stored in Ghost's database; pulling this theme repository does not perform the content migration on another instance. Private backups and migration records remain outside this repository.

For future publishing, reuse the existing category with slug `casos-oscuros-desapariciones` and name “Casos Oscuros y Desapariciones.” Automated publishers should resolve that slug to the existing tag instead of creating new categories from variant names. The external publishing workflow was not inspected or modified during this merge.

### Mobile design and readability

- [x] Reduce the mobile header and long hero-title footprint, preserving the logo, colors, navigation, social icons, and 44-pixel menu/button targets.
- [x] Bring recent episodes directly below the hero, ahead of categories, and remove the duplicate featured block. Hero, recent, and recommendation sections now show different episodes.
- [x] Improve dark-red text contrast against black, secondary text size, and link visibility while preserving the horror aesthetic. Screenshot review remains pending for this pass, as noted below.
- [x] Use left-aligned text for long informational pages.
- [ ] Add carousel pause controls and reduced-motion support, or replace the carousel with one featured episode.

The mobile homepage pass was deployed October 30, 2026 after backing up the active theme. In the same phone preview, header height decreased from 217 to 148 pixels, hero height from 520 to approximately 315 pixels, and the recent-episode heading moved from 2,220 to approximately 526 pixels down the page. The hero uses smaller full titles and a shared grid row that grows with the longest title, avoiding clipping and slide-to-slide height jumps. Desktop hero styling is unchanged.

The homepage now shares one bounded query of the 13 most recent published episodes: three in the hero, five different episodes in the recent list, and five more in recommendations. This automatically refreshes when new episodes are published. The repeated standalone featured block was removed. Categories remain available through the navigation anchor, and the existing card grid, colors, and artwork are preserved. The new `scripts/check-homepage.cjs` check verifies distinct episode groups and content order; the existing page/image checks passed for 116 URLs, 43 representative WebP images, and all category artwork. Visual checks covered desktop and 320/390-pixel phone previews, all three hero titles and buttons, the expanded mobile menu, the category shortcut, About, and an episode page. No horizontal overflow was observed at either phone width.

The readability pass was deployed October 30, 2026 after a private theme backup. Text accents use a brighter red (`#ff6b6b`); dates and secondary labels use lighter gray and generally 13-pixel type. Ordinary article links are underlined, and interactive elements have a white keyboard-focus outline. Category cards allow more room for labels. Informational body text is left-aligned with a maximum reading width of 68 characters and 18-pixel desktop / 17-pixel mobile type. The black surfaces, artwork, and overall layout are retained.

Ghost 6 theme validation passed, along with checks for 116 page URLs, 43 representative WebP images, ten category artwork files, and distinct homepage episode groups. Browser DOM checks confirmed the deployed colors and text sizes, left-aligned About text, an expandable mobile menu, and no homepage horizontal overflow at 320, 390, and 1280 pixels. Category cards had no horizontal overflow at those widths. **Screenshot review of this readability pass is pending:** the screenshot service failed, and the native browser could not be restored during the session. DOM and HTTP checks do not establish visual correctness; do not treat this pass as visually approved.

### Next desktop recommendations

- [ ] Add carousel pause and keyboard controls, plus reduced-motion support. See the ordered roadmap for its release alongside playback improvements.
- [ ] Make episode search easier to discover and add category shortcuts on the episode archive.
- [ ] Review thumbnail proportions and long-title wrapping across archive cards.
- [ ] Improve longer archive navigation with numbered page links where useful.
- [ ] Review sidebar spacing and consider editorial selections or episode duration when reliable data is available.

### Next mobile recommendations

- [ ] Enlarge carousel touch targets and add an accessible pause control.
- [ ] Load third-party players on demand using lightweight previews, preserving playback and platform links.
- [ ] Review portrait video sizing and add quick access to watch, listen, or read on episode pages.
- [ ] Add compact archive search and category shortcuts that work comfortably with touch.
- [ ] Measure loading and layout stability on real phones and slower connections, alongside repeatable desktop measurements.

Shared priorities remain automatic GitHub deployment with validation, private backups and rollback; verified database and media backups; consistent Spanish interface labels; and improved page descriptions. These are recommendations, not completed features.

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

Validate theme compatibility with `npx --yes gscan@5.4.3 theme/V64 --v6`. The `scripts/check-origin.cjs` script checks sitemap pages, the full episode archive, and representative optimized images using Node's built-in fetch. The `scripts/check-pagination.cjs` script follows episode, category, and author page links, checks page counters and previous links, and detects missing next links, loops, and duplicate episode cards. The `scripts/check-homepage.cjs` script checks that featured, recent, and recommended episode groups do not repeat and that recent episodes precede categories. Run these scripts where the Ghost origin is reachable (default `http://127.0.0.1:2368`), or set the `ORIGIN` environment variable. They require no credentials and make no website changes. Allow Ghost to finish startup before running checks. Browser inspection is still required because HTTP checks do not establish visual correctness or full media playback.
