# Website feature and delivery roadmap

Prepared October 30, 2026 for Los Relatos de Quichi. This is the proposed order for future work, based on the existing Ghost theme and a review of ten related sites. It is not a ranking of those sites by audience, revenue, or design quality. All items below are planned unless explicitly described as existing.

## Goals and design rules

Help visitors find a story, choose how to enjoy it, discover another story, return, and optionally support the project. Preserve the black background, readable red accents, centered identity, horror artwork, and established card layout. Add useful features in small releases rather than placing every feature on the homepage.

Existing foundations include optimized images, a bounded homepage feed, distinct featured/recent/recommended groups, category and author pagination, the episode archive, desktop/mobile navigation, and the restored SCP category. Improve these rather than rebuilding them. The latest readability release still needs screenshot review; its HTTP and DOM checks passed, but that is not visual approval.

## Delivery order

| Release | Work | Why it comes here | Dependency |
| --- | --- | --- | --- |
| 0 | Finish visual review; establish a repeatable backup, deploy, and rollback process | Protect the existing appearance and content | Working browser capture; verify current backup/restore procedure |
| 1 | Donation link and better archive discovery | Simple support option plus easier access to the existing catalog | Public donation URL for the button; search behavior verified |
| 2 | Episode playback, lightweight players, carousel controls, richer cards | Improve the core watch/listen/read experience and loading | Confirm media sources and reliable duration data |
| 3 | Beginner selections, related stories, series and seasonal collections | Help visitors explore more of the catalog | Initial editorial selections and consistent tags |
| 4 | Email updates, sharing, story submissions, reading conveniences | Build repeat visits and community | Email delivery and submission handling configured |
| 5 | Product payment links, website ads, social monetization; optional membership | Validate revenue offers and their effect on the audience experience | Product and fulfillment decisions, provider/account eligibility, and audience data |

The donation task can be prepared while archive work proceeds. Do not show a placeholder or broken payment button. Work that depends on a missing service remains pending while independent work continues.

## Release 0: verification and reliable delivery

- [ ] **F01 — Complete the pending visual review.** Check the live readability changes on the homepage, About, episode, and archive pages at desktop and phone widths. Save fresh screenshots; verify that long titles and category labels fit.
- [ ] **F02 — Deployment and recovery.** Establish private theme, routing, database, and media backup coverage with a verified recovery procedure. Configure automatic GitHub deployment with theme validation, serialized deploys, backup, health checks, and rollback. Deploy theme changes separately from Ghost core or database upgrades. Visual changes require review before entering the production deployment branch; automation cannot claim visual approval from HTTP checks.
- [ ] **F03 — Measure the baseline.** Record repeatable public desktop/mobile load measurements, layout stability, archive-to-episode navigation, and playback start. Use actual audience data when available. Never label random recommendations as popular or infer donations from button clicks.

## Release 1: support and discovery

| ID | Feature | Desktop | Mobile | Automatic behavior and acceptance |
| --- | --- | --- | --- | --- |
| F04 | **Apoya el proyecto** donation button | A restrained header link and a short support invitation after an episode/footer | A menu link and an in-flow support button; keep playback unobstructed | One configured destination used everywhere. The owner said an existing public donation link will be supplied; URL is still pending. Verify destination and normal navigation without making a payment. No popup, forced signup, or promised membership rewards. |
| F05 | Visible archive search | Search field above the episode list, with an obvious clear action | Full-width field with a comfortable submit/clear target | Reuse or extend existing Ghost search after checking its capabilities. Search must reach the full published catalog, including older pages, handle empty results, and find accented titles and SCP numbers. Do not merely filter cards on the loaded page. |
| F06 | Category shortcuts and archive navigation | Compact category links with current selection and counts where reliable; numbered pagination if useful | Wrapped category shortcuts or a labeled category selector; retain clear previous/next controls | Categories/counts come from Ghost, with stable links and no hard-coded episode list. Category navigation and any combined search filters must have clear, honest behavior. |
| F07 | Consistent Spanish and search presentation | Correct document language, page titles/descriptions, heading structure, footer and search labels; remove repeated About content | Same content and accessible labels | Reuse sensible templates for new episodes; leave intentional English content marked correctly. Review and preserve existing URLs and metadata; redirect changed URLs. |

Donation text proposal: **“Apoya Los Relatos de Quichi”** with a short explanation such as **“Tu apoyo ayuda a crear nuevos relatos.”** Use the existing red button styling with clear focus and a generous touch target. Begin with a normal link to the owner's existing service to avoid adding a heavy payment widget to every page. Do not imply a charitable tax status.

## Release 2: watch, listen, and read comfortably

| ID | Feature | Desktop | Mobile | Automatic behavior and acceptance |
| --- | --- | --- | --- | --- |
| F08 | Format shortcuts | Ver / Escuchar / Leer close to the episode title | Compact, large targets before long content | Detect available formats from supported post content/metadata. Hide absent formats; shortcuts reach the actual player or text, with useful platform fallback links. |
| F09 | Lightweight media previews | Replace heavy initial embeds where practical with matching preview/play controls | Reserve correct landscape/portrait space; load media on request | New supported player types use the same template behavior. Test real video/audio playback, keyboard use, and unavailable-media fallback. Avoid loading every provider just to display previews. |
| F10 | Better episode cards | Short synopsis, category, publication date, and accurate duration; consistent thumbnails and long-title wrapping | Shorter previews with legible metadata and undistorted images | Synopsis from a deliberate excerpt with a clean fallback; duration from verified media metadata. Do not invent duration or use reading time as listening time. Reserve image dimensions. |
| F11 | Carousel controls | Pause/resume, keyboard operation, visible selected slide, and reduced-motion support | Comfortable touch targets with stable title/button placement | Work for every new featured episode. Pause for interaction/focus; respect reduced-motion preferences. Check every slide and long title. Keep a single featured item as an alternative if the carousel remains distracting. |
| F12 | Reading and listening tools | Clear article width, optional reading progress and chapter links for long episodes | Comfortable text and an optional text-size control that does not interfere with browser zoom | Estimate reading time from text only. Show chapter links only where real timestamps exist; do not generate guessed chapter boundaries. Browser zoom and media controls remain usable. |

- [ ] **F27 — Font and CSS cleanup.** Review unused fonts/styles and accumulated overrides without discarding custom production styling. Compare relevant desktop and phone pages before and after cleanup.
- [ ] **F28 — Caching and public delivery.** Review public caching and Cloudflare challenge behavior, preserve existing protection, and measure changes under repeatable conditions.

## Release 3: help visitors choose another story

- [ ] **F13 — Empieza aquí.** A compact homepage invitation leading to five selected introductory episodes with short reasons to choose them. Initial selections need editorial input; a Ghost tag can manage membership. Automatically hide unpublished selections and avoid repeating a large featured block.
- [ ] **F14 — Relevant recommendations.** Improve existing related/recommended sections by prioritizing shared categories, excluding the current episode, and avoiding duplicates. Use a bounded recent fallback when a category has few episodes. This should work automatically on every newly published episode.
- [ ] **F15 — Series and collection pages.** Add short introductions and ordered episode lists for genuine series. Provide previous/next within a series, distinct from publication-date navigation. Theme/category collections need not imply narrative order. A first collection requires an editorial description and correct membership/order; subsequent correctly tagged episodes appear automatically.
- [ ] **F16 — Seasonal and editorial selections.** Examples: Halloween, SCP introductions, maritime horror, or disappearances. Reuse existing content and category art before commissioning more assets. Clearly identify editorial selections instead of claiming measured popularity.
- [ ] **F17 — A random story.** Optional “Sorpréndeme” discovery link using a bounded implementation that can select from the whole public catalog. Keep it secondary to search and categories. Consider after measuring use of the main discovery features.

## Release 4: returning visitors and community

- [ ] **F18 — Free email updates.** A restrained signup after episodes/footer with clear confirmation and unsubscribe behavior. Verify Ghost newsletter delivery for this installation before enabling it. Publishing a post must not silently send email; define whether updates are sent per episode or as a digest and keep editorial control.
- [ ] **F19 — Share an episode.** Copy-link and supported native sharing, with useful social preview title/image/description. Emphasize a simple share control on phones rather than a row of heavy third-party widgets. Work automatically on every public episode.
- [ ] **F20 — Cuéntanos tu relato.** A separate page inviting stories for possible adaptation into narrated videos, linked from the menu and after episodes. Use a responsive written form for name/pseudonym, anonymous-credit choice, private contact email, title, and full story. Include explicit permission for adaptation and video publication, separate from email marketing. Choose the private submission destination, storage, and reviewer before launch. Confirm receipt, validation errors, and delivery failures; keep submissions and contact details outside the public repository. Review, select, adapt, and produce videos editorially; never auto-publish submissions or promise every story a video. Start with text; optional voice upload can follow later. Invitation: “Tu historia podría convertirse en nuestro próximo video.” Button: “Enviar mi relato.” Note: “Revisamos todas las historias; el envío no garantiza su publicación.”
- [ ] **F21 — Save for later and reading position.** Optional browser-local bookmarks and text position with a clear reset/remove action and an explanation that they are limited to that browser. Do not promise cross-device sync or audio/video resume unless the provider integration supports it and it has been tested.
- [ ] **F22 — Better introduction and follow options.** Short creator/project introduction, contact route, available listening platforms, and an accurate publication schedule only if one is sustainable. Use a compact page/section rather than a second oversized homepage banner.
- [ ] **F23 — Community feedback.** Consider moderated member comments or a lightweight feedback route after there is capacity to manage it. Do not add an empty forum or live chat as a default.

## Release 5: later revenue experiments

The owner wants revenue from product payment links, website ads, and social media and has not yet chosen a product or confirmed the relevant social accounts. Research and offer selection can proceed alongside earlier releases. The release number is not a requirement to delay commercial planning until every other feature ships. Launch only the selected, configured channel rather than enabling every revenue option at once.

- [ ] **F29 — Product payment links.** Research audience interest in a digital story collection or other first offer before committing to inventory. Once selected, prepare a small responsive Tienda/catalog page with images, description, currency/price, and Comprar links to a reputable provider's hosted checkout. Define receipt, fulfillment, customer support, and return/refund behavior. A payment link alone does not establish automated file delivery or physical shipping. Verify paid order status through the provider before fulfillment; neither a click nor a success-page visit proves payment. Reuse public product links on supported social profiles/posts. Product, price, provider, and delivery method remain undecided.
- [ ] **F30 — Website advertisements.** Compare direct sponsor placements with an ad network such as AdSense using actual traffic and content suitability. Review approval, applicable provider requirements, and any necessary consent integration before loading ad scripts. Test a limited labeled placement with reserved dimensions and phone-safe sizing. Measure revenue, load performance, and layout shifts. Do not ask visitors to click advertisements, place deceptive controls near ads, or predict earnings without data.
- [ ] **F31 — Social monetization.** Identify the actual channels and inspect owner-provided account analytics/monetization status before choosing programs. Evaluate native creator revenue, branded posts, and product referrals separately. Adapt original episode excerpts for each channel, link to relevant full episodes or products where supported, and track source visits and provider-confirmed sales. Eligibility depends on account, region, content, and program; do not claim enrollment or promised payouts. Posting and commercial agreements need the owner's direction before publishing or accepting them.

- [ ] **F24 — One supporter membership.** If donations and engagement show demand, define one sustainable benefit such as a monthly bonus story or early access. Assess native Ghost membership versus an existing audience platform before choosing. Payment setup, pricing, and benefits require owner decisions; retain a useful free catalog.
- [ ] **F25 — Digital collections and merchandise.** Test interest in a curated digital anthology before a large store or inventory commitment. Consider a small print-on-demand range only after validating audience interest. These require product creation and fulfillment choices, not just a theme update.
- [ ] **F26 — Sponsor/media kit.** Present verified audience and engagement figures, a clear contact route, and a limited sponsorship offer when evidence supports it. Do not claim guaranteed reach, estimated competitor earnings, or revenue without records.

No advertising network, membership checkout, donation account, product store, or recurring charge is created by this roadmap. Advertising implementation remains a separate measured release because loading speed is a priority; a limited placement can be considered after approval and baseline checks.

Provider references: [Stripe Payment Links](https://docs.stripe.com/payment-links) can be shared on websites and social media; [AdSense eligibility](https://support.google.com/adsense/answer/9724) requires eligible original content and review; [YouTube Partner Program](https://support.google.com/youtube/answer/72851) has account and audience requirements; [Facebook Content Monetization](https://about.fb.com/news/2024/10/monetize-content-facebooks-new-streamlined-program/) is a separate platform program. These are research references, not selected services or evidence that this project's accounts qualify. Recheck current requirements before implementation.

## New-episode publishing rules

Template-driven features should apply without editing the theme for each episode: archive listing, category shortcuts, available-format links, share metadata, bounded related stories, and image handling. Richer data requires a consistent publishing convention:

1. Supply title, intentional excerpt, feature image, canonical category, and supported player links/content.
2. Supply verified duration and timestamps when available; omit missing values cleanly.
3. Use existing canonical tags, especially `casos-oscuros-desapariciones`; do not create category duplicates from spelling variants.
4. Add a series identifier and order only for genuine ordered series. Use a separate editorial tag for beginner/seasonal selections.
5. Keep a small publishing guide in the repository when the conventions are implemented. Backfill older episodes in a reviewed batch with a private content backup.

Editorial selections, story submissions, product creation, and publication schedules cannot be made reliable simply by updating the theme. Email sends must follow the agreed workflow. Payment receipts and successful donations belong to the chosen payment provider; a click is not proof of payment.

## Release acceptance

For each release, document changed behavior, backup, verification, and remaining limitations. Validate Ghost theme compatibility and run relevant existing URL, homepage, and pagination checks. Inspect desktop plus 320/390-pixel phone layouts and a tablet breakpoint where relevant. Test long titles, image proportions, expanded menu, keyboard focus, empty states, and real media playback for affected features. Save fresh screenshots and review them before marking visual work complete. If capture is unavailable, explicitly leave visual review pending rather than claiming it passed.

Measure outcomes without promises: easier archive navigation, working search across older episodes, playback start, repeat visits, signup completion, and provider-confirmed support when available. Compare before/after under equivalent conditions. Never rebuild the accumulated production CSS blindly; preserve existing custom styling when preparing changes.

## Reference sites

These are feature references, not traffic rankings or proof of commercial success. Mobile and desktop proposals above are adaptations for this site, not claims that all ten competitors passed device or performance tests.

| Reference | Observed feature used in this plan |
| --- | --- |
| [Relatos de la Noche](https://rdlnoficial.com/) | Listening links, audience submissions, email signup, books and merchandise |
| [Turno Nocturno](https://www.turnonocturno.mx/episodes/) | Archive search, seasons, duration and descriptions |
| [Noviembre Nocturno](https://noviembrenocturno.es/) | Distinct audio/YouTube offerings and supporter invitation |
| [La Fundación SCP](https://lafundacionscp.wikidot.com/) | Newcomer guides and organized collections |
| [Insomnio](https://podcastinsomnio.com/) | Latest episode, platform links, playlists and timestamps |
| [The NoSleep Podcast](https://www.thenosleeppodcast.com/new-to-the-nosleep-podcast) | Beginner episode sampler |
| [PseudoPod](https://pseudopod.org/) | Written stories alongside audio, duration, credits and show notes |
| [The Magnus Archives](https://rustyquill.com/show/the-magnus-archives/) | Clear introduction to the story universe and related productions |
| [Creepy](https://www.creepypod.com/support) | Voluntary support and supporter benefits; themed collections in its episode archive |
| [Nightmare Magazine](https://www.nightmare-magazine.com/category/fiction/short-stories/) | Reading/listening choices and narration/duration metadata |

Ghost also documents [native tips and donations](https://ghost.org/help/tips-and-donations/). The first implementation should use the owner's existing public donation link; native payment integration is an alternative to assess only if needed.
