# Tienda de Quichi — draft, not published

The owner requested an image-focused homepage preview, removal of affiliate cards from episode pages, and a Tienda de Quichi product grid resembling the episode archive. The preview heading and navigation open `/tienda/` in a new tab on the existing website. Shop product cards link to the original Amazon affiliate destinations in new tabs. No additional domain, checkout or separate website is needed.

Draft validation completed November 5: Ghost 6 gscan, isolated rendering of 119 snapshot URLs, archive pagination, homepage grouping, and AdSense verification passed. The draft shop check confirmed one product, a home preview with new-tab shop links, and no product cards on an episode. Desktop and 320/390-pixel phone views were inspected; no horizontal overflow appeared. A dark introductory-text contrast issue found during review was corrected. These visual checks used a clearly labeled placeholder, not the real product photograph. The missing-photo release guard was exercised and failed publication as intended. Production files and routing were not changed.

## Current blocker: product photos

The first product has no permitted photo configured. The existing live affiliate sidebar remains unchanged while this replacement is a draft. Private previews use a clearly labeled image-pending box; no product image is invented or copied from Amazon's retail page. The draft cannot be treated as a completed image storefront.

The owner's Amazon Creators API screenshot shows the approved-Associates-account requirement is not met. Its FAQ also states that access to the product API through Creators API requires at least ten qualifying sales within the past thirty days. Amazon's [registration guide](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/onboarding/register-for-creators-api) describes account acceptance, qualifying referrals, and registration under Associates → Tools → Creators API. Access has not been granted, credentials have not been created, and no API refresh process is installed.

The owner confirmed that tracking ID `relatosquichi-20` is listed under the account with Store ID `quichipicks-20`. These are valid owner-confirmed IDs in the same account. Preserve the existing original product link and its current tracking; the differing IDs are not grounds to replace its tag.

## Prepared layout

- Homepage only: Tienda de Quichi heading/new-tab link and a compact product-image preview, plus a short affiliate note. It does not show the previous long product descriptions or direct merchant buttons.
- Shop route `/tienda/`: heading, introduction, disclosures and a responsive product grid. Desktop supports four columns, with fewer columns at smaller breakpoints. The initial catalog contains one real product, not duplicated filler cards.
- Episode pages: no shop preview or affiliate product cards; the navigation shortcut remains available.
- The same `ghost/recommendations.json` supplies both views. Adding a reviewed item once updates the generated home preview and catalog; individual episodes need no edits.
- Affiliate checkout remains with Amazon. Disclosure and sponsored-link markup remain on the shop's actual merchant links. No prices, ratings, stock or personal product-testing claims are added.

## Complete with permitted photos

For a photo owned by the creator or licensed for this use, put the actual image under `theme/V64/assets/products/` and replace the item's `image: null` with an object containing:

```json
{
  "asset": "products/halloween-led-tree.webp",
  "alt": "Accurate description of the actual product photograph",
  "rights": "owner"
}
```

Use `licensed` only when permission actually exists. Do not mark a copied Amazon retail photo as owner/licensed content. Amazon-supplied automated images will need a separate approved Creators API integration and refresh/expiry handling once access is available; the current generator intentionally does not accept unconfigured API image URLs.

Run `node scripts/build-shop.cjs` to build the preview/catalog and `node scripts/build-shop.cjs --check` to verify generated files. The older `build-recommendations.cjs` command delegates to this generator. Before publishing, run `node scripts/build-shop.cjs --release --check`; missing photos fail this command. A generated `assets/data/shop-status.json` also marks the release unready, and the prepared deployment script rejects it before changing live files.

After photos are supplied, finish strict image/URL checks, Ghost validation, route deployment with a private backup, and desktop/mobile screenshots with the actual images. Check that the heading/navigation opens the same-site shop in a new tab, product links preserve tracking, episode pages contain no product cards, and the current AdSense setup remains intact. Do not deploy the placeholder preview. Automatic whole-theme deployment remains paused.
