# UI Fork component variations

UI Fork lets designers compare multiple implementations of the same React
component inside the real prototype. Each variation remains a separate file, so
the alternatives can be reviewed, diffed, and promoted without duplicating a
whole page.

This project uses the stable `uifork` package at version `0.0.14` and keeps the
upstream agent skill in `.agents/skills/uifork`. The upstream source is
<https://github.com/sambernhardt/uifork> and declares the package as MIT.
The package is a development dependency. A repository-level `ws` override keeps
its local watch server on the patched `8.21.3` release.

## Scope and boundaries

UI Fork is development tooling, not a replacement for Sage Carbon. Its floating
widget brings its own internal UI dependencies, but application components and
their variants must continue to use:

- `carbon-react` for product UI;
- the token packages defined in `docs/design-tokens.md` for custom styling;
- the catalogues and complete-message rules in `docs/localization.md`;
- the accessibility and documentation requirements in `AGENTS.md`.

Do not import UI Fork's transitive dependencies directly into prototype code.
The widget itself is exempt from application localization because it is an
English-only developer tool and is excluded from a normal production build.

## Local workflow

Start the application normally:

```bash
npm run dev
```

The widget is loaded automatically in Vite development mode. In a second
terminal, start its local server if the widget needs to create, rename, delete,
or promote files:

```bash
npm run uifork:watch
```

The server listens on port `3030` and only watches `src`. Switching among
already registered versions still works without file-writing actions.

## Version a component

Inspect the component's export and current Git diff first. Then initialize one
specific reusable component:

```bash
npx uifork init src/components/Example.tsx --export default
```

UI Fork converts the original into this structure:

```text
Example.tsx           generated wrapper imported by the app
Example.versions.ts   version registry
Example.v1.tsx        preserved original implementation
Example.v2.tsx        alternative implementation
```

After initialization, replace any generated `any` prop type with the component's
real prop type and run targeted lint plus `npm run build`. New variations must
preserve the component's public props, unless changing that contract is an
explicit part of the prototype experiment.

Useful commands:

```bash
npx uifork fork src/components/Example.tsx v1 v2
npx uifork rename src/components/Example.tsx v2 v3
npx uifork promote src/components/Example.tsx v2
```

`delete` and `promote` remove files. Confirm the exact component and version in
the Git diff before using either command. Promoting should leave one clean
component with no UI Fork wrapper or version registry.

## Manual build modes

The standard manual publication is unchanged:

```bash
npm run build
```

It does not render the UI Fork widget. For a deliberate internal comparison
build, use:

```bash
npm run build:uifork
npm run preview
```

An internal build can switch between variations bundled at build time. Its
file-writing controls only work when the viewer also has the local watch server
running, because UI Fork connects to `localhost:3030`. Never use the UI Fork
build mode as a production or engineering-handoff artifact.
