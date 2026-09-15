# Prototyping guidelines

This doc covers how to build useful prototypes in this repo.

For Carbon and token reference details, see `docs/carbon-reference.md`. For agent-facing implementation rules, see `AGENTS.md`.

## What good looks like here
- **Flow-first**: prove the interaction, not the perfect implementation.
- **Carbon-first**: compose Carbon primitives into patterns rather than inventing a custom UI kit.
- **Honest UX**: use realistic labels, empty states, and edge cases.

## Data
- Prefer mock data in the page file for early exploration.
- If you need something reusable, place it in **`src/data/*`**, use **named exports** (not default exports), and start each file with `// MOCK DATA — replace with real API responses` (see `AGENTS.md`).
- Keep the mock layer simple unless the prototype clearly needs more.

## Navigation
- Use **React Router** for multi-screen flows so each screen has a **shareable URL** (deep links work on Netlify previews after the SPA rewrite in `netlify.toml`).
- Built-in playground routes today:
  - `/` — Home
  - `/carbon-components` — Carbon components gallery
  - `/example-page-1` … `/example-page-5` — Example starter pages
- Add new screens under `src/pages/*` and register a matching `<Route>` in `src/App.tsx`.

## Accessibility
- Use Carbon components for core controls and overlays.
- Keep accessible names on buttons and inputs with `label` and `aria-*` props.
- Do not remove or hide focus states.

## Dependencies
- Default to no new dependencies.
- If a prototype truly needs one, add it deliberately and document why.

