# AdSense verification and review

The owner supplied public publisher ID `ca-pub-8633694225257899` and the standard asynchronous AdSense script on November 5, 2026. The owner's Sites screenshot shows **Requires review** and **Ads.txt: Not found**. This is an account with a pending site review, not an approved site or evidence of earnings. The screenshot's Auto ads setting was OFF; the website deployment does not change account-side settings.

## Website files

Deployed and publicly verified November 5, 2026 after isolated Ghost rendering and a private rollback backup. Production checks passed for 117 public page URLs, 44 representative WebP images, ten category images, the homepage groups, and the publisher-code/seller-file checks. Desktop and 390-pixel phone screenshots showed no layout distortion or horizontal overflow. The provider added a zero-size unfilled element; no manual ad slot was added to the theme. The public browser displayed the exact seller record at `/ads.txt`. Google's account-side review and ads.txt recognition are still pending.

- `theme/V64/partials/components/adsense-head.hbs` contains the exact owner-supplied async script, included once before `ghost_head` in the default layout.
- `theme/V64/ads.txt` contains `google.com, pub-8633694225257899, DIRECT, f08c47fec0942fa0`.
- Ghost serves a theme-root ads.txt at `https://losrelatosdequichi.com/ads.txt`. No custom route, post, database update, or proxy rule is needed. See [Ghost's official integration guide](https://ghost.org/integrations/google-ad-manager/).
- `scripts/check-adsense.cjs` checks plain-text delivery, the exact seller record, and one async script with the correct publisher ID in the head of representative pages. It selects an episode from the current archive so a changed episode slug cannot invalidate the check. It does not establish Google approval, Google crawler access, consent readiness, ad fill or earnings.

## Owner's next steps

1. Open AdSense → Sites → losrelatosdequichi.com.
2. Complete the ownership verification shown there. If the page asks whether the code is installed, verify that step after the website deployment is confirmed.
3. Use Check for updates for ads.txt if that action is available. Google may take days to update the displayed status; a publicly reachable file does not immediately change the account screen.
4. Click Request review when available and complete any outstanding account setup directly with Google. Leave personal identity, payment, tax and sign-in information with Google.
5. Share the resulting site status or review feedback. Do not describe the site as approved until AdSense shows Ready.

The seller line follows Google's [official ads.txt format](https://support.google.com/adsense/answer/12171612?hl=en). If the account supplies additional or different authorized seller records, compare them before changing this file. Do not add invented sellers.

## Ad placements after approval

Manual ad units have not been created or requested by this release. Keep Auto ads off while manual placement is being arranged. After approval, create responsive display units under Ads → By ad unit → Display ads, and supply their public codes/slot IDs. Proposed placements are the wide-screen side areas, the homepage below discovery, and episode sidebar/end-of-story positions, with the appropriate mobile layout. Use the shared theme so future episodes inherit the placements.

Before enabling ad serving, verify the actual account/site approval, provider privacy and consent requirements for the audience, responsive sizing, performance and desktop/mobile visuals. Do not fill every empty area automatically or place ads over players/navigation. Google may return no ad for a request; empty placements need a collapse/fallback strategy. This verification-only release creates no visible ad containers and makes no revenue claim.

References: [AdSense code](https://support.google.com/adsense/answer/9274019?hl=en), [site review](https://support.google.com/adsense/answer/12131223?hl=en), [responsive display units](https://support.google.com/adsense/answer/9274025?hl=en).
