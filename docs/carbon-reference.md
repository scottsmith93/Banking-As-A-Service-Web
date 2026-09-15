# Carbon reference

This is the reference doc for Carbon, tokens, and import patterns in this playground.

For enforcement rules, see `AGENTS.md`. For prototype workflow guidance, see `docs/prototyping-guidelines.md`.

## Core stack
- Use `carbon-react` for UI components.
- Do not use `@carbon/react`.
- Use `@sage/design-tokens` for any custom styling outside Carbon components.

## How to confirm a component exists
Treat Carbon Storybook and the Carbon export list as the canonical source for the available component set.

- Storybook: `https://carbon.sage.com`
- Carbon export list: `https://github.com/Sage/carbon/blob/master/src/index.ts`

If a component or prop is unclear, verify there before adding custom workarounds.

## How to choose imports
Use a short import policy instead of maintaining a long static list of every component path.

- Prefer direct component imports, such as `carbon-react/lib/components/button`.
- Prefer `__next__` component paths when they exist.
- Use the Carbon Storybook or export list to confirm the correct component path for anything not shown below.

### Common patterns
- App provider: `carbon-react/lib/components/carbon-provider`
- Global styles: `carbon-react/lib/style/global-style`
- Tokens wrapper: `carbon-react/lib/components/tokens-wrapper`
- Button: `carbon-react/lib/components/button`
- Button (`__next__`): `carbon-react/lib/components/button/__next__`
- Textbox: `carbon-react/lib/components/textbox`
- Date input: `carbon-react/lib/components/date`
- Flat table: `carbon-react/lib/components/flat-table`

### App bootstrap
When wiring Carbon at the app root, use:

- `CarbonProvider`
- `GlobalStyle`
- `TokensWrapper`

The expected order is `CarbonProvider` -> `GlobalStyle` -> `TokensWrapper` -> app content.

## Design tokens
Source: [Sage/design-tokens](https://github.com/Sage/design-tokens)

- Package: `@sage/design-tokens`
- Use tokens for custom CSS, inline styles, and layout values that are not already handled by Carbon.
- Do not hardcode colors, spacing, or typography values.

### Token usage examples
- CSS: `@import url("@sage/design-tokens/css/light.css");`
- JS/TS: `import { ... } from "@sage/design-tokens/js/es6";`

The package also provides additional formats such as SCSS and CommonJS if needed.
