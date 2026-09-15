# Sage Design Playground

A reusable React + TypeScript starting point for Sage prototypes, built with
**Carbon by Sage** (`carbon-react`) and **Sage design tokens**. The repository
currently includes substantial Operations and Portal/Client showcases; these
are reference implementations, not the default scope of every new prototype.

The included experiences use in-memory mock data (no backend) and are intended
for exploring UI flows and design ideas quickly. New prototypes should follow
`AGENTS.md`, use an isolated route/page folder, and include their own README.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and bundling
- [React Router v7](https://reactrouter.com/) for client-side routing
- [Carbon by Sage](https://carbon.sage.com) (`carbon-react`) component library
- [`@sage/design-tokens`](https://github.com/Sage/design-tokens) for spacing, color, and typography
- [AG Grid](https://www.ag-grid.com/) through the reusable `SageDataGrid` adapter
  for data-heavy tables, and [Nivo](https://nivo.rocks/) for showcase charts;
  neither is the default for a new prototype
- [UI Fork](https://github.com/sambernhardt/uifork) for development-only component
  variation and in-context comparison
- [Impeccable](https://github.com/pbakaus/impeccable) as a repo-scoped agent skill
  for intentional design critique, audit, polish, hardening, and optimization

## Getting started

Requires Node `>=20.19 <24` and npm `>=11.11.1`. The repository's `.nvmrc`
selects Node 22.13.0 when using `nvm`.

```bash
npm install
npm run dev
```

The dev server starts on [http://localhost:5173](http://localhost:5173).

Other scripts:

```bash
npm run build    # type-check and build for production
npm run lint     # run ESLint
npm run preview  # preview a production build locally
```

UI Fork is available automatically during local development. To create or edit
component versions from its floating widget, run its watch server in a second
terminal:

```bash
npm run uifork:watch
```

Read [`docs/uifork.md`](docs/uifork.md) before versioning a component. The normal
build excludes the widget; `npm run build:uifork` creates an intentional internal
manual-preview build that includes it.

Impeccable adds no application dependency or runtime code. Read
[`docs/impeccable.md`](docs/impeccable.md) before invoking `$impeccable`; its
engine, hooks, live mode, and shared design artifacts are opt-in.

Use [`SageDataGrid`](src/components/data-grid/SageDataGrid.tsx) instead of
instantiating AG Grid directly. [`docs/ag-grid.md`](docs/ag-grid.md) explains when
to prefer Carbon tables, how localization works, and how to add future modules.

## Project structure

| Path | Purpose |
|---|---|
| `src/pages/*` | Top-level screens, wired up in `src/routes.ts` |
| `src/components/*` | Shared UI components and approved adapters around non-Carbon dependencies |
| `src/data/*` | In-memory mock data used across the prototype |
| `src/locales/*` | English, Spanish, French, German, and Portuguese localisation catalogues |
| `src/context/*` | Cross-page React context (nav mode, subscription state, stock alerts) |
| `AGENTS.md` | Conventions and implementation rules for this codebase |
| `docs/` | Reference docs for Carbon, AG Grid, design tokens, localization, Impeccable, UI Fork, and prototype workflow |
| `.agents/skills/*` | Repo-scoped Codex skills for prototype implementation, localization, tokens, design quality, and UI variation |

## Notes

This prototype uses `carbon-react` (Sage's Carbon), not IBM's `@carbon/react`.
See [`AGENTS.md`](AGENTS.md) for the conventions this codebase follows,
[`docs/carbon-reference.md`](docs/carbon-reference.md) for component imports, and
[`docs/design-tokens.md`](docs/design-tokens.md) before adding custom styles.

## Localisation

English, Spanish, French, German, and Portuguese content is maintained in
[`src/locales`](src/locales). English is the default. The app uses `i18next` and
`react-i18next`; read [`docs/localization.md`](docs/localization.md) for the
governing rules and [`src/locales/README.md`](src/locales/README.md) for the
file-level workflow.

Validate both catalogues with `npm run validate:locales`. The same validation runs
automatically before every production build.

Validate that custom CSS only references loaded token variables with
`npm run validate:tokens`. `npm run validate` runs both repository checks.
