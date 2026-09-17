---
name: sage-frontend-reference
description: Consult Sage frontend JSON reference catalogues when building or reviewing prototype screens, using their hierarchy as optional evidence for page structure and existing product copy. Use alongside sage-prototype-ui for screens related to established Sage product flows; do not use these files as runtime locale catalogues or mandatory UI schemas.
---

# Sage frontend reference

Use the JSON catalogues in `references/catalogues/` as product reference material.
Their hierarchy can reveal related pages, sections, fields, actions, messages, and
interaction states. It is evidence for a design decision, not a requirement to
reproduce every branch or preserve the source application's implementation.

## Inspect only what is relevant

The catalogues are large. Do not load a complete file into context when a targeted
search is enough.

1. Extract a few domain terms from the requested screen or flow.
2. Search keys and values with `rg -ni '<term>' references/catalogues/`.
3. List candidate branches with `jq`, then inspect only the most relevant branch.
   Quote unusual keys explicitly, for example:
   `jq '."SalesInvoiceDto_FR"' references/catalogues/frontend_fr-FR.json`.
4. Use the branch to inform information architecture, field grouping, actions,
   states, and terminology. Reconcile it with the user's request and the current
   repository before implementing anything.

Prefer generic branches and the branch matching the active market when both are
available. Locale or feature suffixes such as `_FR`, `_ES`, or
`_BASE_Accounting_feature` are meaningful source identifiers; do not infer that
every suffixed branch belongs in every screen.

## Relationship to the application catalogues

These files are reference-only. Never import them into application code or treat
their hierarchy as the runtime translation API. The application source of truth
remains `src/locales/en-GB.json`, with matching Spanish, French, German, and
Portuguese catalogues as defined in `docs/localization.md`.

When reference copy is adopted in a prototype:

- place it under a semantic feature namespace in all five runtime JSON catalogues;
- keep English as the runtime source and default language;
- preserve complete sentences and genuine dynamic placeholders;
- use the French wording as a reference, not as a fallback for missing locales;
- follow Carbon, token, accessibility, and prototype documentation rules even
  when the reference tree suggests a different implementation.

## Add or update reference catalogues

Store reference files in `references/catalogues/` with these names:

- `frontend_en-GB.json`
- `frontend_es-ES.json`
- `frontend_fr-FR.json`
- `frontend_de-DE.json`
- `frontend_pt-PT.json`

The five files must have the same object keys, value types, array positions,
non-text values, and placeholder tokens. Only localized string values may differ.
Until all five sources are available, the validator accepts the subset present
and reports which catalogues are still missing.

After adding or replacing a file, run:

```bash
npm run validate:reference-catalogues
```

The validator prefers English as the structural baseline when present, otherwise
French, then the first available supported catalogue. Also run the repository's
normal locale validation and build when reference content is used in a screen.
