# Localisation files

The governing project-wide rules live in [`docs/localization.md`](../../docs/localization.md).
Read that reference before changing user-facing copy, locale-aware formatting, or
language support.

The localisation catalogues are stored in `en-GB.json` and `fr-FR.json`. Keep the
same key structure in both files so every English string has a French value.

The currently implemented localized scope is the Portal/Client journey:
Dashboard, File management, Project calculator, Financial documents, Year end
meeting and AI Advisor. New prototypes are localization-ready by default and
must declare any narrower scope in their page-level README.

Use `getLocale(language)` with the existing `useLanguage` hook for the normal
catalogue-object pattern. Use `getTranslation(language, path)` only for genuinely
dynamic dot-separated paths. Arrays are supported for ordered repeated content.

When adding content:

1. Add the key and English copy to `en-GB.json`.
2. Add the same key and French copy to `fr-FR.json`.
3. Keep placeholders such as `{name}` unchanged between languages.
4. Run `npm run validate:locales` to compare leaf paths and placeholders.
5. Run `npm run build` to check locale structure and TypeScript integration.

Before handoff, compare the leaf-key paths in both JSON files and confirm that
placeholder tokens (for example `{count}`) are unchanged.
