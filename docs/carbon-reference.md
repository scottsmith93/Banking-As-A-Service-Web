# Carbon reference

This is the reference doc for Carbon components and import patterns in this playground.

For enforcement rules, see `AGENTS.md`. For token package roles and usage, see
`docs/design-tokens.md`. For prototype workflow guidance, see
`docs/prototyping-guidelines.md`.

## Core stack
- Use `carbon-react` for UI components.
- Do not use `@carbon/react`.
- Use the token packages described in `docs/design-tokens.md` for any custom styling outside Carbon components.

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

Read `docs/design-tokens.md` before adding custom CSS, choosing a variable, changing
themes, or upgrading either token dependency. Keeping this material separate avoids
confusing Carbon's legacy peer dependency with the modern token output used by
selected custom patterns.
