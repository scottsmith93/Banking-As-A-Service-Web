---
name: sage-localization
description: Add, translate, audit, or refactor user-facing copy and locale-aware formatting in the Sage Design Playground. Use for locale catalogues, language switching, interpolation, dates, numbers, currencies, plurals, and localization scope; do not use for styling-only changes.
---

# Sage localization

Read `docs/localization.md` completely before changing copy, catalogue structure,
formatting, or language behavior. That file is the source of truth; do not copy
its rules into this skill.

Confirm the prototype's page-level README declares localization scope. Keep
`en-GB.json` and `fr-FR.json` structurally aligned, preserve named placeholders,
and localize accessibility and interaction-state copy as well as visible labels.
Use the existing catalogue helpers and locale-aware `Intl` formatting rather than
language ternaries or concatenated strings.

Run `npm run validate:locales` and `npm run build`. For visual changes, inspect all
supported languages at the affected breakpoints and check text expansion.
