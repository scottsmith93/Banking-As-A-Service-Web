# Localisation files

The governing project-wide rules live in [`docs/localization.md`](../../docs/localization.md).
Read that reference before changing user-facing copy, locale-aware formatting, or
language support.

The localisation catalogues are `en-GB.json`, `es-ES.json`, `fr-FR.json`,
`de-DE.json`, and `pt-PT.json`. English is the source and default language. Keep
the same key structure in all five files so each requirement is complete in
every supported language.

The currently implemented localized scope is the Portal/Client journey:
Dashboard, File management, Project calculator, Financial documents, Year end
meeting and AI Advisor. New prototypes are localization-ready by default and
must declare any narrower scope in their page-level README.

Use `getLocale(language)` with the existing `useLanguage` hook for the normal
catalogue-object pattern. Use `getTranslation(language, path)` only for genuinely
dynamic dot-separated paths. Arrays are supported for ordered repeated content.

When adding content:

1. Add the key and source copy to `en-GB.json`.
2. Add the same key and translated copy to `es-ES.json`, `fr-FR.json`,
   `de-DE.json`, and `pt-PT.json`.
3. Keep placeholders such as `{name}` unchanged between all languages.
4. Run `npm run validate:locales` to compare every indexed leaf path and
   placeholder across all five catalogues.
5. Run `npm run build` to check locale structure and TypeScript integration.

Before handoff, confirm that all five files pass validation and that placeholder
tokens (for example `{count}`) are unchanged.
