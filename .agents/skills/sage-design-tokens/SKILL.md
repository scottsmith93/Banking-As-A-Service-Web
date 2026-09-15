---
name: sage-design-tokens
description: Select, audit, import, or upgrade Sage design tokens in the Sage Design Playground. Use for custom CSS values, theme work, token variable names, token package versions, or the legacy-versus-modern token boundary; do not use for Carbon component choice alone.
---

# Sage design tokens

Read `docs/design-tokens.md` completely before changing styling tokens, theme
imports, or token dependencies. It defines the required boundary between the
Carbon-compatible 4.x package and the aliased modern 18.x package.

Use the upstream [Sage/design-tokens](https://github.com/Sage/design-tokens) README
and releases as the authority for current formats and versions. Confirm variable
names and import paths from the installed target package; do not infer them from
visual values or translate between legacy and modern naming conventions.

Prefer Carbon's built-in styling. For custom UI, use semantic tokens without
hardcoded fallbacks. After token or theme changes, run `npm run validate:tokens`,
lint, and build, then visually inspect representative Carbon controls, custom
surfaces, charts, and focus states.
