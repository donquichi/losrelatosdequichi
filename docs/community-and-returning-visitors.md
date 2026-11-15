# Community and returning visitors

Status: the homepage story form and email-based invitation are live. Other community features remain planned. Preserve the existing black/red design and check desktop and mobile before publishing theme changes.

## Free email updates

Use Ghost's native free-member signup flow, with explicit signup, confirmation, a clear description of the emails, and unsubscribe access. Check membership settings, the default newsletter, sender identity, transactional mail, and newsletter delivery before displaying a working signup promise. Do not import or subscribe story submitters automatically. Test with the owner's address before opening signup publicly. Publishing an episode does not necessarily send an email: verify the publish-and-send workflow.

## Share an episode

Use the device's native share sheet when supported, with a copy-link fallback and accessible status messages. Share the canonical episode URL and title. Keep Ghost's built-in social metadata as the single source of truth; audit unique titles, descriptions, absolute HTTPS images, image dimensions, and duplicate tags. Test actual public previews separately from the rendered website. Do not load third-party sharing trackers.

## Cuéntanos tu relato

The homepage accepts stories through Formspree (https://formspree.io/f/xnpdjekp). The form asks only for the story; submitters are anonymous unless they include contact details. Formspree receives and stores submissions and its plan has a monthly quota. The owner should review stories privately and obtain clear permission before adapting or publishing them.

## Save for later and reading position

The live episode button stores a title, same-site episode URL and optional same-site image URL in the current browser only. The /guardados/ page lists saved episodes and allows individual removal. It explains device and browser-data limitations; no story text or personal data is stored. Invalid or unavailable storage produces a message. Long episode pages now store a local reading position and offer an explicit resume button on return; positions clear near the end of a story. This tracks reading, not audio or video playback, and stays in the same browser. A clear-all action is not implemented.

## Creator and contact

Use the real creator introduction, a confirmed project contact address, and verified YouTube/Spreaker/other listening links. Do not invent a biography, accounts, posting schedule, audience figures, or email address. Fix duplicated introduction paragraphs only after checking the authored page. Keep submission/contact links easy to find in desktop navigation and mobile menus.

## Feedback and comments

Start with private episode feedback sent to the same confirmed project inbox. Associate feedback with the episode's canonical URL. Avoid adding public comments until someone is assigned to moderation. Ghost native comments can be enabled for signed-in members and moderated by owner/admin staff; verify the site's settings and moderation workflow first. Do not describe post-publication moderation as pre-approval. Never auto-publish story submissions as comments.

## Release checks

- Verify signup confirmation, newsletter delivery and unsubscribe with the owner.
- Verify share/copy-link fallback on desktop and mobile.
- Test bookmark persistence, removal, corrupt/blocked storage, resume and completed stories.
- Test permission/credit validation and private form delivery without adding recipients to marketing lists.
- Verify submissions and secrets never appear in public pages, assets or source control.
- Check keyboard operation, readable labels, focus, touch targets and narrow screens against the existing design.
- Check social previews separately; a normal browser view cannot establish preview-cache behavior.

References: [Ghost signup forms](https://ghost.org/tutorials/form/), [Ghost email configuration](https://ghost.org/docs/config/), [Ghost comments and moderation](https://ghost.org/help/commenting/).
