# Localization and translation

This is the governing reference for adding or refining user-facing copy in the
Sage Design Playground. `AGENTS.md` and the repo-scoped localization skill both
route localization work here.

## Scope declaration

Every prototype must state its localization scope in its page-level `README.md`.
New prototypes are localization-ready by default: all user-facing copy belongs in
the locale catalogues unless the README explicitly records a narrower scope and
lists localization as a known limitation.

The currently implemented localized scope is the Portal/Client journey:

- Shared application navigation, nested menu links, footer actions, and template
  destination states
- Dashboard
- File management
- Project calculator
- Financial documents
- Year end meeting
- AI Advisor
- Manage subscription
- Customer management

Existing sales, purchasing, accounting, banking, compliance, settings,
playground, and other operational/demo routes predate this localization scope.
Do not treat their current hardcoded copy as a pattern for new work. When one of
those routes is intentionally changed or promoted into an active prototype,
declare its scope in its README and migrate the touched user-facing copy.

Navigation labels are shared infrastructure and remain in scope even when the
linked screen is not localized yet. New navigation requirements must add the
same labels, hierarchy, accessibility copy, and placeholder destination copy to
all five catalogues before the link is exposed.

## Source of truth

The locale catalogs are:

- `src/locales/en-GB.json` — source English copy
- `src/locales/es-ES.json` — Spanish translation
- `src/locales/fr-FR.json` — French translation
- `src/locales/de-DE.json` — German translation
- `src/locales/pt-PT.json` — Portuguese translation

English is the default language. A localized requirement is incomplete until
the same structure, content intent, and placeholders exist in all five files.

## Frontend reference catalogues

The repo-scoped `sage-frontend-reference` skill contains larger product
catalogues under `.agents/skills/sage-frontend-reference/references/catalogues/`.
Use their hierarchy as optional evidence for existing page groupings, fields,
actions, states, and terminology when building related screens.

These reference files are deliberately separate from `src/locales/*`. Do not
import them into the application, use them as a fallback, or make their French
catalogue the runtime source of truth. When reference copy is adopted, add it to
the normal semantic feature namespace in all five runtime catalogues; English
remains the source and default language.

Future reference files must use the `frontend_<locale>.json` naming convention
documented by the skill and remain structurally identical. Run
`npm run validate:reference-catalogues` after adding or replacing one. The normal
`npm run validate` workflow includes this structural check.

Every user-facing string in an in-scope page must come from a locale catalog.
Do not add language ternaries, hardcoded headings, button labels,
descriptions, empty states, status text, aria labels, placeholders, chart
labels, or tooltip copy directly to TSX.

Use `getLocale(language)` for the existing catalogue-object pattern, or
`getTranslation(language, path)` when a component genuinely needs a dynamic key.
Keep language selection out of presentation components wherever possible;
components should receive copy or read the active catalogue rather than deciding
translations themselves. `i18next` mirrors the selected language for integrations,
but it is not a second source of copy.

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

1. Keep the same key and indexed-array structure in all five catalogues.
2. Use camelCase keys; do not use English copy as a key.
3. Group related copy under a feature namespace rather than creating a flat
   global list.
4. Use arrays only for ordered, repeated content such as checklist items,
   cards, or table headings. Give repeated objects stable `id` values where
   the UI needs identity.
5. Keep values that are data, currencies, dates, and numbers separate from
   translated labels. Format those values in code using locale-aware formatters.
6. Keep brand and product names such as Sage Active, Copilot, and AI Advisor
   consistent unless an approved localized product name exists.
7. Keep punctuation, capitalization, spacing, and inclusive language natural
   for each language; do not translate word-for-word when that produces poor
   UX copy.

## Interpolation

Store a complete, natural sentence for each message. Use named placeholders only
for genuinely dynamic data, such as a name, count, date, or amount, and preserve
the exact placeholder names in every language:

```json
{
  "ready": "{count} of {total} ready"
}
```

Every translated value must also contain `{count}` and `{total}`. Replace or
render these values through a small helper rather than duplicating sentence
logic in TSX.

Do not use a variable to replace a translatable word or grammatical fragment
inside a sentence. Do not concatenate translated strings or fragments to build
a message. Word order, articles, agreement, and plural forms vary by language,
so each complete message must have its own catalogue entry.

```tsx
// Avoid: the placeholder replaces translated grammar.
t("invoice.status", { status: t("status.overdue") });

// Avoid: translators cannot safely change the sentence structure.
t("invoice.prefix") + customerName + t("invoice.suffix");

// Prefer: one complete message with only genuine dynamic data.
t("invoice.overdueForCustomer", { customerName });
```

## Currency

Keep amounts as numbers in data and format them with the active locale. For euro
amounts, use `Intl.NumberFormat` with `style: "currency"` and `currency: "EUR"`:

```ts
new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "EUR",
}).format(amount);
```

Do not insert the `€` symbol manually or hardcode separators and spacing. The
same numeric value is displayed differently by locale—for example, English uses
`€1,234.56`, while several continental European locales place the symbol after
the amount and use localized separators.

## Translation quality

Before handoff, check that:

- Spanish, French, German, and Portuguese are consistent with Sage terminology
  and the surrounding page.
- Labels are concise enough for buttons, navigation, pills, and table headers.
- Formal/informal address is consistent; use the established French tone.
- Accessibility copy is translated too, including `aria-label`, `alt`, and
  status text.
- Empty, loading, error, disabled, and success states are covered.
- Text expansion does not break cards, buttons, tables, or responsive layouts.
- Dates, currency, decimals, thousands separators, and plural wording are
  appropriate for the target locale.

Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, or a shared wrapper around them
for values. Do not assemble localized dates, money, percentages, or plural forms
with string concatenation.

## Required workflow

When adding or changing in-scope copy:

1. Add the source key and value to `en-GB.json`.
2. Add the identical key path to `es-ES.json`, `fr-FR.json`, `de-DE.json`, and
   `pt-PT.json` with approved translations.
3. Move the TSX copy to `getLocale(language)` or a component copy prop.
4. Check that no user-facing string remains hardcoded in the in-scope TSX.
5. Run `npm run validate:locales` to check JSON parsing, indexed leaf keys, and
   placeholder tokens across all five catalogues.
6. Run `npm run build` (which repeats locale validation).
7. Review all five languages at desktop and mobile widths, including text
   expansion in German and Portuguese.

Do not add fallback English copy silently for a missing translation. A missing
key should fail validation or be reported clearly so the localization team can
resolve it before release.

## Handoff checklist

- [ ] The prototype README declares the localization scope and known limitations.
- [ ] No new user-facing strings are hardcoded in in-scope TSX.
- [ ] All five indexed leaf-key paths match.
- [ ] Placeholder names and counts match.
- [ ] Accessibility strings are translated.
- [ ] Numbers, dates, currencies, and plurals are locale-aware.
- [ ] `npm run build` passes.
- [ ] The change has been reviewed in English, Spanish, French, German, and
      Portuguese.
