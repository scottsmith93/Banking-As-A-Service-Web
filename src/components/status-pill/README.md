# Shared status pills

`StatusPill` composes Sage Carbon's `Pill`; it is not a replacement component library.
All application Pill imports use this boundary so status treatment stays consistent.

- Fully rounded Sage container-circle radius.
- No visible border.
- A 5% semantic-colour fill using `color-mix`, not element opacity; labels use that same colour at full opacity.
- Original Carbon semantic variants and default tag colour are mapped to the matching Sage tokens.
- Warning text uses a darker Sage caution tone for legibility; dark-background badges retain inverse semantic tones.
- Removable/actionable tags and Carbon's internal multi-select pills retain Carbon's own interaction styles.
- The transaction-type filter explicitly opts its removable selections into the same rounded, borderless 5% tint treatment. Carbon's close buttons, keyboard handling and focus indicators remain intact; other multi-select tags are unchanged.
- Carbon props, labels, callbacks and focus indicators remain owned by Carbon. No new user-facing copy is introduced.

Use `isDarkBackground` only on a genuinely dark surface, not all bank-card colour variants.
This is a prototype visual variant, not a change to the upstream Carbon package.
