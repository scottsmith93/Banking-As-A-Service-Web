# Localization and translation prompt

Use this note when adding or refining user-facing copy in the Sage Active
prototype.

## Scope

The current prototype scope is the active Portal/Client journey:

- Dashboard
- File management
- Project calculator
- Financial documents
- Year end meeting
- AI Advisor
- Manage subscription

Sales, purchasing, accounting, banking, compliance, settings, playground, and
other operational/demo routes are outside the current prototype scope. Do not
add localization keys for those routes unless they are intentionally brought
into the Portal/Client experience.

## Source of truth

The locale catalogs are:

- `src/locales/en-GB.json` — source English copy
- `src/locales/fr-FR.json` — French translation

Every user-facing string in an in-scope page must come from a locale catalog.
Do not add English/French ternaries, hardcoded headings, button labels,
descriptions, empty states, status text, aria labels, placeholders, chart
labels, or tooltip copy directly to TSX.

Use `getLocale(language)` for page and component copy. Keep language selection
out of presentation components wherever possible; components should receive
copy or read the active catalog rather than deciding translations themselves.

## JSON format

Use one namespace per feature or page. Keep keys semantic and stable:

```json
{
  "dashboard": {
    "title": "...",
    "subtitle": "...",
    "actions": {
      "save": "...",
      "cancel": "..."
    },
    "states": {
      "empty": "...",
      "loading": "..."
    }
  }
}
```

Follow these rules:

1. Keep the same key structure in `en-GB.json` and `fr-FR.json`.
2. Use camelCase keys; do not use English copy as a key.
3. Group related copy under a feature namespace rather than creating a flat
   global list.
4. Use arrays only for ordered, repeated content such as checklist items,
   cards, or table headings. Give repeated objects stable `id` values where
   the UI needs identity.
5. Keep values that are data, currencies, dates, and numbers separate from
   translated labels. Format those values in code using locale-aware formatters.
6. Keep brand and product names such as Sage Active, Copilot, and AI Advisor
   consistent unless an approved French product name exists.
7. Keep punctuation, capitalization, spacing, and inclusive language natural
   for each language; do not translate word-for-word when that produces poor
   UX copy.

## Interpolation

Use named placeholders for dynamic values and preserve the exact placeholder
names in every language:

```json
{
  "ready": "{count} of {total} ready"
}
```

The French value must also contain `{count}` and `{total}`. Replace or render
these values through a small helper rather than duplicating sentence logic in
TSX.

## Translation quality

Before handoff, check that:

- French is consistent with Sage terminology and the surrounding page.
- Labels are concise enough for buttons, navigation, pills, and table headers.
- Formal/informal address is consistent; use the established French tone.
- Accessibility copy is translated too, including `aria-label`, `alt`, and
  status text.
- Empty, loading, error, disabled, and success states are covered.
- Text expansion does not break cards, buttons, tables, or responsive layouts.
- Dates, currency, decimals, thousands separators, and plural wording are
  appropriate for the target locale.

## Required workflow

When adding or changing Portal copy:

1. Add the English key and value to `en-GB.json`.
2. Add the identical key path to `fr-FR.json` with an approved translation.
3. Move the TSX copy to `getLocale(language)` or a component copy prop.
4. Check that no user-facing string remains hardcoded in the in-scope TSX.
5. Validate JSON parsing, matching leaf keys, and matching placeholder tokens.
6. Run `npm run build`.
7. Review the English and French screens at desktop and mobile widths.

Do not add fallback English copy silently for a missing French key. A missing
key should fail validation or be reported clearly so the localization team can
resolve it before release.

## Handoff checklist

- [ ] Copy is limited to the active Portal/Client scope.
- [ ] No new user-facing strings are hardcoded in in-scope TSX.
- [ ] English and French leaf-key paths match.
- [ ] Placeholder names and counts match.
- [ ] Accessibility strings are translated.
- [ ] Numbers, dates, currencies, and plurals are locale-aware.
- [ ] `npm run build` passes.
- [ ] The change has been reviewed in both English and French.
