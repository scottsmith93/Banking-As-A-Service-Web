# Sage Active Operations Exploration

A React + TypeScript prototype exploring "Operations mode" flows for Sage
Active — purchasing, inventory, purchase receipts, and subscription
management — built with **Carbon by Sage** (`carbon-react`) and
**Sage design tokens** for styling.

This is a clickable prototype backed by in-memory mock data (no backend),
intended for exploring UI flows and design ideas quickly.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and bundling
- [React Router v7](https://reactrouter.com/) for client-side routing
- [Carbon by Sage](https://carbon.sage.com) (`carbon-react`) component library
- [`@sage/design-tokens`](https://github.com/Sage/design-tokens) for spacing, color, and typography
- [AG Grid](https://www.ag-grid.com/) for data tables/listings

## Getting started

Requires Node `>=20.19 <24`.

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

## Project structure

| Path | Purpose |
|---|---|
| `src/pages/*` | Top-level screens, wired up in `src/routes.ts` |
| `src/components/*` | Shared UI components built from Carbon primitives |
| `src/data/*` | In-memory mock data used across the prototype |
| `src/locales/*` | English and French localisation catalogues for content managed by the localisation team |
| `src/context/*` | Cross-page React context (nav mode, subscription state, stock alerts) |
| `AGENTS.md` | Conventions and implementation rules for this codebase |
| `docs/` | Reference docs (Carbon/token usage, prototyping guidelines) |

## Notes

This prototype uses `carbon-react` (Sage's Carbon), not IBM's `@carbon/react`.
See `AGENTS.md` for the conventions this codebase follows.

## Localisation

English and French content is maintained in [`src/locales/en.json`](src/locales/en.json)
and [`src/locales/fr.json`](src/locales/fr.json). See [`src/locales/README.md`](src/locales/README.md)
for the key structure and update workflow.
