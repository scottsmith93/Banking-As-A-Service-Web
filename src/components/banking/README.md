# Shared bank identity

`BankLogo` is a read-only composed pattern, not a new interactive control. It
uses Carbon's `Icon type="bank"` for All accounts and failed-image fallbacks.
Surrounding account or bank text supplies the accessible name, so decorative
images have empty alternative text and do not duplicate it.

- Token-sized 24px and 32px circular masks share a faint token-based halo.
- External artwork uses `object-fit: contain` at 70% of the circle diameter so
  even square image corners fit wholly inside the mask. No bank mark is zoomed
  or cropped. Sage uses its original S artwork with empty outer SVG margins
  removed, centred on the same black circular surface.
- Bank movements, account options, account overview headings and bank-list
  headings share this component. Card network marks and decorative marketing
  artwork are separate patterns.
- External logos use no-referrer requests. They remain prototype dependencies;
  production should supply approved compact assets through the bank API/asset
  pipeline. Sources are recorded in `src/pages/banking/README.md`.
- The account select has no native leading-image slot. Its adapter uses the
  Carbon input ref to place a read-only React decoration inside the existing
  input layer. This avoids competing with Carbon's raised menu layers without
  altering its focus, popup or keyboard handling. Verify the `data-role` anchor
  after Carbon upgrades; replace this adapter if Carbon adds a native slot.

Localization scope: no standalone user-facing strings; existing localized bank
and account labels provide the context in all five supported languages.
