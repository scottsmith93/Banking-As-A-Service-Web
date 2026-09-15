# Prototyping guidelines

This doc covers how to build useful prototypes in this repo.

For Carbon imports, see `docs/carbon-reference.md`; for token package roles and
usage, see `docs/design-tokens.md`; and for user-facing copy, see
`docs/localization.md`. For agent-facing implementation rules, see `AGENTS.md`.

## What good looks like here
- **Flow-first**: prove the interaction, not the perfect implementation.
- **Carbon-first**: compose Carbon primitives into patterns rather than inventing a custom UI kit.
- **Honest UX**: use realistic labels, empty states, and edge cases.

## Data
- Prefer mock data in the page file for early exploration.
- If you need something reusable, place it in **`src/data/*`**, use **named exports** (not default exports), and start each file with `// MOCK DATA — replace with real API responses` (see `AGENTS.md`).
- Keep the mock layer simple unless the prototype clearly needs more.

## Navigation
- Use **React Router** for multi-screen flows so each screen has a stable,
  shareable URL. Manual publishing environments must be configured to return
  the app entry point for client-side routes.
- Built-in playground routes today:
  - `/` — current Portal/Operations dashboard showcase
  - `/playground-home` — showcase navigation
  - `/carbon-components` — Carbon components gallery
- The legacy `/example-page-*` URLs currently redirect into showcase routes.
  They are not the five reusable starter pages required by `AGENTS.md` and
  should not be copied as starter architecture.
- Add new screens under `src/pages/*` and register a matching `<Route>` in `src/App.tsx`.

## Accessibility
- Use Carbon components for core controls and overlays.
- Keep accessible names on buttons and inputs with `label` and `aria-*` props.
- Do not remove or hide focus states.

## Localization

- Declare the prototype's localization scope in its page-level README.
- Treat new prototype copy as localization-ready by default.
- Follow `docs/localization.md` for catalogue structure, interpolation,
  locale-aware formatting, and validation.

## Dependencies
- Default to no new dependencies.
- If a prototype truly needs one, add it deliberately and document why.
