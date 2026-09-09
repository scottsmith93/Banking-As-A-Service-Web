# Localisation files

The localisation catalogues are stored in `en-GB.json` and `fr-FR.json`. Keep the
same key structure in both files so every English string has a French value.

The prototype scope is the active Portal/Client journey only: Dashboard, File
management, Project calculator, Financial documents, Year end meeting and AI
Advisor. Hidden or operations-only routes are intentionally outside this
prototype scope and do not need catalogue entries yet.

Use dot-separated keys from React components through `getTranslation`, or use
the existing `useLanguage` hook to select a catalogue-specific value. Arrays
are supported for plan allowances and user roles.

When adding content:

1. Add the key and English copy to `en-GB.json`.
2. Add the same key and French copy to `fr-FR.json`.
3. Keep placeholders such as `{name}` unchanged between languages.
4. Run `npm run build` to check the JSON structure and TypeScript integration.

Before handoff, compare the leaf-key paths in both JSON files and confirm that
placeholder tokens (for example `{count}`) are unchanged.
