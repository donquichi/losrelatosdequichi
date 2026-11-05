# Advertising and affiliate setup

The owner lives in the United States and confirmed on November 5, 2026 that no affiliate account exists. Audience shopping countries and traffic are unknown. No affiliate or advertising account, approval, public publisher ID, or referral URL has been supplied. There are no new commission-generating links or ad scripts in this release.

## Two separate revenue sources

- Affiliate links: recommend another merchant's products and receive a commission on qualifying sales. Assess [Amazon Associates US](https://affiliate-program.amazon.com/) first for a few relevant books or collectibles, subject to the site's content and audience suitability. The owner registers and completes payment/tax information directly with Amazon. Read its [application guidance](https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM) and [participation policies](https://affiliate-program.amazon.com/help/operating/policies) before applying. Approval and income are not guaranteed. Follow the existing [affiliate launch specification](affiliate-launch.md).
- Display advertising: a provider serves advertising on the site. [Google AdSense](https://adsense.google.com/start/) is a candidate to assess. Add the website to the account, verify ownership, and request review. The site must reach [Ready status](https://support.google.com/adsense/answer/12131223?hl=en) before serving ads. Review the actual stories and artwork against [publisher restrictions](https://support.google.com/publisherpolicies/answer/10437795?hl=en); graphic or shocking content can receive limited advertising. Being a horror website does not establish approval or rejection by itself.

## What the owner supplies

1. Which route to begin: affiliate links, display ads, or both.
2. Audience countries and monthly traffic if known. Unknown figures must remain unknown; do not fabricate an application estimate.
3. For affiliates: the chosen program, account status, three to five actual products, and public referral links generated under that account.
4. For ads: provider name, account/site review status, public publisher ID (such as `ca-pub-…`), the real ad-unit/slot ID, and the provider's exact ads.txt record when available. Site-verification metadata can be installed before review; ad serving remains off until approved.
5. A confirmed project contact email for contact/privacy and private submissions. The earlier community work is still waiting for this address.

Do not request passwords, authentication codes, tax forms, bank details, private API credentials, or identity documents in this public repository. The owner handles provider registration, agreement acceptance, payment and identity details directly with the provider.

## Homepage placement

Below Categorías, a compact Sigue explorando area links to the existing full episode archive, SCP archive, and creator introduction. An eventual advertising placement belongs below that section with a visible Publicidad label, clearly separated from episode buttons and category cards. Do not show a fake ad, a fabricated referral tag, an empty public advertising box, or an advertisement-for-sale claim without a real offer.

Start with one manual responsive unit, reserving dimensions appropriate to the approved format so content does not jump. Keep the black/red site palette; do not alter the provider's creative. Avoid popups and ads over players, reading controls, navigation or play buttons. Check page speed and visual layout at desktop and 320/390-pixel phone widths before and after adding actual provider code. Verify the site's privacy/consent configuration against the provider requirements for the audience before activating advertising. No provider script or consent setting has been installed by this document.

Affiliate recommendations should have useful editorial descriptions and clear commission disclosures near the links, merchant-specific calls to action, and `rel="sponsored noopener"` when opened in a new tab. Keep them distinct from donations. Do not invent prices, product testing, commissions or revenue forecasts. Track program-reported qualifying sales separately from ordinary outbound clicks.

## Automatic latest-episode behavior

The homepage uses one query of thirteen posts in descending publication order. Últimos episodios receives positions 1–5, the carousel positions 6–8, and Descubre otros relatos positions 9–13. This keeps the newest posts in the explicitly labeled latest list and avoids repeating episodes across those three groups. A publish event requires no manual list update. Publication dates determine order, so intentionally backdated posts do not become the newest entries. Public cache behavior still matters; distinguish an outdated cached page from the former template offset bug.

The regression check compares the five latest homepage links, in order, against the first five episode-archive cards. It also checks the three nonoverlapping groups and the exploration section. A future publishing or theme change must preserve these checks or explicitly change the intended behavior.
