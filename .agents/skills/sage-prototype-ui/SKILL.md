---
name: sage-prototype-ui
description: Build or significantly change React prototype screens and shared UI in the Sage Design Playground. Use for new pages, flows, reusable components, responsive layouts, or prototype architecture; do not use for copy-only translation or token-package maintenance.
---

# Sage prototype UI

Build prototypes that remain useful as examples for designers and clear references
for engineers.

Before implementation:

- Read `AGENTS.md` for repository-wide constraints.
- Read `docs/prototyping-guidelines.md` for audience, flow, data, routing, and
  accessibility guidance.
- Read `docs/carbon-reference.md` before choosing or importing UI components.
- Read `docs/design-tokens.md` before adding custom styling.
- If the work adds or changes user-facing copy, also read
  `docs/localization.md` and declare the prototype's localization scope.
- When an established Sage product flow could inform the screen, also use
  `sage-frontend-reference` to inspect the relevant JSON branches without
  treating their hierarchy as a mandatory UI schema.

Prefer existing composed patterns in `src/components` before creating another.
Keep route-level composition in `src/pages`, reusable UI in `src/components`, and
mock data in `src/data`. A new prototype must include the page-level README
required by `AGENTS.md`.

Verify the states and breakpoints appropriate to the declared audience. Run locale
validation, lint, and build before handoff; visually inspect the affected route
when the environment permits it.
