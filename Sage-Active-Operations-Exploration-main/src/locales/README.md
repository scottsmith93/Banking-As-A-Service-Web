# Localisation files

The localisation catalogues are stored in `en.json` and `fr.json`. Keep the
same key structure in both files so every English string has a French value.

Use dot-separated keys from React components through `getTranslation`, or use
the existing `useLanguage` hook to select a catalogue-specific value. Arrays
are supported for plan allowances and user roles.

When adding content:

1. Add the key and English copy to `en.json`.
2. Add the same key and French copy to `fr.json`.
3. Keep placeholders such as `{name}` unchanged between languages.
4. Run `npm run build` to check the JSON structure and TypeScript integration.
