# Sage design tokens

This is the source of truth for choosing and importing design tokens in the Sage
Design Playground. The upstream source is
[Sage/design-tokens](https://github.com/Sage/design-tokens); check its README and
release notes before changing package versions or import paths.

## Why this repository has two token packages

The two dependency names intentionally point to different generations of the
same upstream package:

| Dependency | Role in this repository | Import boundary |
|---|---|---|
| `@sage/design-tokens` | Carbon 159 compatibility, legacy global variables, and Sage UI font assets | Existing Carbon/custom CSS that uses variables such as `--spacing200` and `--colorsUtilityYang100` |
| `@sage/design-tokens-fusion` | npm alias for the modern 18.x package | Modern token files that are missing from the Carbon-compatible package, currently dataviz and selected inverse-surface semantics |

`carbon-react@159.2.0` declares `@sage/design-tokens@^4.17.0` as a peer
dependency, so the unaliased package must remain on the compatible 4.x line until
Carbon changes that contract. Do not replace it with 18.x as a routine upgrade.
The alias lets the two generated token formats coexist without changing the
package Carbon resolves.

The installed ranges are declared in `package.json`; the lockfile records the
exact resolved versions. Treat those files, rather than version numbers copied
into examples, as the local version source of truth.

## Current imports

Global imports live at the top of `src/index.css`:

```css
@import url("@sage/design-tokens/css/base.css");
@import url("@sage/design-tokens-fusion/css/light.css");
@import url("@sage/design-tokens-fusion/css/components/dataviz.css");
```

Font assets use the Carbon-compatible package in `src/fonts.css`. Do not import a
second global token bundle inside a page or component. A new modern component
token file may be added globally only when the component is used and the legacy
package does not provide an equivalent. Current examples include dataviz colours
and semantic inverse-surface values used by the dark navigation shell.

The upstream 18.x package supports granular light/dark/component CSS, combined
`light-all.css`, SCSS, CommonJS, and ES modules. This Vite project uses CSS custom
properties; do not introduce another format unless a concrete implementation
requires it.

## Selecting a token

1. Prefer a Sage Carbon component and its built-in styling.
2. For custom UI, choose the semantic token that describes the purpose (surface,
   text, action, status, spacing, radius), not a literal value that merely looks
   correct.
3. Search the imported token CSS or the upstream package before typing a variable
   name. Do not guess names.
4. Use `var(--token-name)` without a hardcoded fallback. A fallback can hide a
   missing import or misspelled token.
5. Do not hardcode colours, spacing, typography, radii, shadows, or transitions.
   Intrinsic values such as percentages, grid fractions, zero, and data-driven
   chart dimensions are not design decisions and may remain literal.

Run `npm run validate:tokens` after changing CSS or imports. It compares CSS
variable references in `src/**/*.css` with variables defined locally and by the
token stylesheets loaded by the application. It does not replace visual review or
decide whether the chosen semantic token is appropriate.

Legacy camelCase variables and modern kebab-case variables come from different
generated formats. Do not translate a token name between conventions by hand.

## Themes

The current application explicitly sets `color-scheme: light` and imports the
modern light mode only. Dark mode is therefore not currently supported. If a
prototype requires dark mode, treat it as a scoped feature: import the matching
upstream mode, verify Carbon compatibility, and test every custom surface and
dataviz state. Do not claim dark-mode support merely because variables are used.

## Upgrading

Before upgrading either dependency:

1. Check the upstream release notes and `carbon-react` peer dependencies.
2. Keep the unaliased 4.x dependency compatible with Carbon.
3. Confirm every imported CSS path exists in the target package.
4. Search the codebase for variables supplied by the package being upgraded.
5. Run `npm run validate:tokens`, `npm run lint`, and `npm run build`.
6. Visually check representative Carbon controls, custom surfaces, charts, focus
   states, and any supported theme.

Do not collapse the two dependencies until Carbon and the application can use one
generation without losing required variables or assets.
