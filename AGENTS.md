# Sage Design Playground — Agent Instructions

Last updated: 2026-09-15
Version: 0.1

This file defines the rules an agent must follow before proposing or making code changes in the Sage Design Playground. Rules include brief rationale so the agent can make informed decisions in edge cases.

---

## Audience and communication style

Most users of this tool are designers who are new to code and prototyping. The agent must adapt its communication accordingly:

- **Explain as you go.** When writing or changing code, include a brief plain-language explanation of what the code does and why. Do not assume knowledge of React, JSX, state management, or terminal commands.
- **Use analogies to design concepts.** Where possible, relate code concepts to familiar design ideas (e.g. "Props are like the settings you'd configure in a Figma component instance").
- **Offer, don't overwhelm.** After completing a task, offer to explain any part in more detail rather than front-loading lengthy tutorials. Let the user control the depth.
- **Narrate terminal commands.** Before running any command, explain what it will do in one sentence. Designers unfamiliar with the terminal should never see an unexplained command execute.
- **Flag jargon.** If a technical term is unavoidable, define it inline on first use (e.g. "We'll add a `useState` hook — that's React's way of remembering a value between renders").
- **Be encouraging.** Prototyping in code is new for most of this team. Celebrate progress and normalise iteration.

---

## Non-negotiable rules

- **Use Sage Carbon only: `carbon-react`.** This is Sage's own component library. It is not the same as IBM's Carbon. Never use `@carbon/react` — that is IBM's open-source package and it will introduce conflicting styles, missing Sage customisations, and broken theming. If you encounter documentation or examples referencing `@carbon/react`, do not follow them. Always use `carbon-react` from the Sage registry.
- **Do not add other UI libraries** unless the user explicitly asks and the repo context supports it. Keeping dependencies lean ensures prototypes remain lightweight and easy to hand off.
- **For any styling outside Sage Carbon, use the approved Sage token packages defined in `docs/design-tokens.md`.** This keeps custom UI aligned with Sage's visual language. Do not hardcode colours, spacing, or typography values, and do not claim dark-mode support unless the prototype imports and verifies a dark theme.
- Before adding custom styling or changing either token dependency, read `docs/design-tokens.md`. This repository deliberately keeps a Carbon-compatible token package and a separately aliased modern token package; they are not interchangeable.
- Run `npm run validate:tokens` after changing custom CSS or token imports. It fails when CSS references a variable not defined by the loaded token files or local CSS.

---

## Carbon usage rules

- Prefer direct component imports for tree-shaking and clarity.
- Prefer `__next__` component paths when they exist — these are Carbon's forward-compatible implementations and will eventually replace their legacy equivalents.
- Do not use deprecated props on `__next__` components. If unsure whether a prop is deprecated, check `docs/carbon-reference.md` first.
- When unsure about imports, props, or component availability, follow this resolution order:
  1. Check `docs/carbon-reference.md`.
  2. Check `https://carbon.sage.com` or the Carbon export list.
  3. Ask the user.

  Do not guess or hallucinate component names, props, or import paths.

---

## App bootstrap requirements

- `TokensWrapper` must wrap the app root to ensure design tokens are available to all components.
- The required bootstrap order is:
  ```
  CarbonProvider → GlobalStyle → TokensWrapper → app content
  ```
- Treat missing `TokensWrapper` support for `__next__` components as a functional bug — it will cause visual inconsistencies.

---

## Repo conventions

- Put prototype screens in `src/pages/*`.
- Put reusable composed patterns in `src/components/*`.
- Put shared utilities and hooks in `src/utils/*` and `src/hooks/*` respectively.
- Put mock data in `src/data/*` and export named constants (not default exports).
- **Naming conventions:**
  - Components and pages: `PascalCase` (e.g. `AgentOnboarding.jsx`).
  - Utility files and hooks: `camelCase` (e.g. `useChat.js`, `formatCurrency.js`).
  - Folders: `kebab-case` where they represent feature groupings (e.g. `src/components/chat-panel/`).
- Keep dependencies lean and avoid introducing new libraries unless they are clearly needed for the prototype.

## Localization

- Before adding or changing user-facing copy, locale-aware formatting, or language support, read `docs/localization.md`.
- New prototype READMEs must state their localization scope. Unless a README explicitly records a narrower scope and limitation, all user-facing strings in the prototype are localization-ready in English, Spanish, French, German, and Portuguese.
- English (`en-GB`) is the source and default language. Every new localized requirement must be completed in all five JSON catalogues: `en-GB`, `es-ES`, `fr-FR`, `de-DE`, and `pt-PT`.
- Keep all five catalogue structures and interpolation placeholders aligned. `npm run validate:locales` enforces this and also runs as part of `npm run build`.
- Store complete, natural sentences in the locale catalogues. Do not use a variable to replace a translatable word or grammatical fragment inside a sentence; named placeholders are only for genuinely dynamic data such as names, counts, dates, and amounts.
- Do not build user-facing copy by concatenating translated strings or sentence fragments. Add a complete catalogue entry for each message so translators can change word order and grammar safely.
- Keep monetary values numeric in data and format EUR with `Intl.NumberFormat` using the active locale and `currency: "EUR"`. Do not hardcode the `€` position, decimal separator, thousands separator, or spacing; these differ across the five supported locales.

---

## UI variation workflow

- UI Fork is approved as development tooling for comparing component variants. Read `docs/uifork.md` and use the repo-scoped `uifork` skill before initializing, forking, renaming, deleting, or promoting a version.
- UI Fork is not an alternative product component library. Its internal Base UI, Tabler, Floating UI, and Motion dependencies are limited to its development widget; prototype code must continue to use Sage Carbon and Sage design tokens.
- Every version file must follow the same localization, accessibility, token, mock-data, and documentation rules as the original component.
- The standard `npm run build` must not expose the UI Fork widget. Use `npm run build:uifork` only for an intentional internal manual publication, and never for a production handoff.
- Inspect the exact component and the Git diff before running a mutating UI Fork command. Treat `delete` and `promote` as destructive because they remove version files.

---

## Design quality workflow

- Impeccable is the approved specialist skill for an intentional UI critique, audit, polish, hardening, optimization, adaptation, or explicit redesign. Read `docs/impeccable.md` before using it.
- Use `sage-prototype-ui` for ordinary implementation and architecture, Impeccable for focused design-quality passes, and UI Fork when the user needs parallel component variants. Combine them only when the request genuinely crosses those boundaries.
- `AGENTS.md`, Sage Carbon, Sage design tokens, and the repository localization rules always override Impeccable's generic aesthetic recommendations. “Bolder” never authorizes another component library, font, icon set, palette, focus treatment, or motion language.
- For product screens, use Impeccable's `Operate` mode by default: task completion, scanability, consistency, accessibility, and familiar Sage patterns outrank decorative novelty.
- Do not enable Impeccable hooks or live browser injection automatically. Both are opt-in workflows, and the first engine invocation downloads and verifies a version-pinned binary in the user's local Impeccable cache.
- Do not create or rewrite `PRODUCT.md`, `DESIGN.md`, or shared surface briefs unless the user invokes the corresponding Impeccable setup/documentation workflow. Existing prototype READMEs remain required.

---

## Data grid workflow

- Read `docs/ag-grid.md` before adding or changing an AG Grid table.
- Use the shared `SageDataGrid` adapter from `src/components/data-grid`; do not instantiate `AgGridReact`, `AgGridProvider`, or `AllCommunityModule` in feature components.
- Use Carbon `FlatTable` for small, mostly static tables. AG Grid is reserved for data-heavy interactions that need capabilities such as filtering, sorting, selection, editing, or virtualization.
- Keep feature columns, data, renderers, and events outside the shared adapter. Add per-grid modules through its `modules` prop instead of global registration.
- Keep `ag-grid-community`, `ag-grid-react`, and `@ag-grid-community/locale` on the same version range. Enterprise packages and licences are opt-in for a named prototype requirement.
- Never disable AG Grid cell focus. Use translated product copy in the feature catalogues; the official locale package translates AG Grid's own controls only.

---

## Starter pages

When the playground is scaffolded, it should include a set of example pages that give designers a working starting point. These are not templates to copy — they are live, editable references that demonstrate Carbon components, layout patterns, and prototype conventions in context.

The following starter pages should be available at scaffold time:

- **Blank page** — a minimal page with the correct layout wrapper and a heading. The simplest possible starting point for any new prototype.
- **Copilot chat interface** — a chat panel with message input, message list, and basic send/receive flow. Demonstrates state management, scroll behaviour, and conversational UI patterns.
- **Data table with actions** — a table with sortable columns, row selection, batch actions, and pagination. Demonstrates realistic tabular data, Carbon table components, and interaction states.
- **Form with validation** — a multi-field form with inline validation, error summaries, and a submission flow. Demonstrates form state, error handling, and accessible form patterns.
- **Dashboard overview** — a card-based layout with summary metrics, a chart placeholder, and navigation to detail views. Demonstrates grid layout, data presentation, and page-level composition.

Each starter page should include inline code comments explaining the key patterns it uses, so designers can learn by reading the working example before modifying it.

---

## Prototype completeness

Prototypes built in this playground serve multiple audiences, each with different expectations. The agent should tailor completeness to the prototype's intended use.

### Completeness by audience

**Internal design exploration** — the lowest bar. Focus on layout, composition, and visual fidelity. Mock data can be minimal. Interactive states and edge cases are optional. The goal is speed and experimentation.

**Stakeholder review** — the prototype must look and feel like a real product. Use realistic mock data, handle the happy path end-to-end, and ensure navigation between screens works smoothly. Stakeholders will click around — broken links, placeholder text, or missing pages undermine confidence in the design.

**Usability testing** — the highest fidelity bar. Every interaction the participant will encounter must work, including loading states, error handling, empty states, and success feedback. Broken or missing states break the illusion and compromise test validity. Ensure screen reader support for key interactions if participants include assistive technology users.

**Engineering handoff** — completeness here is about clarity, not fidelity. The prototype should clearly separate intended UX behaviour from prototype shortcuts. Mock data should be cleanly structured in `src/data/*` and clearly labelled. Code comments should explain design intent. See the "Engineering handoff" section for full guidance.

When a user starts a new prototype, the agent should ask which audience(s) it's for and adjust its approach accordingly. If the user isn't sure, default to stakeholder review level — it covers most needs without over-building.

### Realistic content and data

- Always use realistic mock data that reflects actual Sage product scenarios (e.g. real-looking invoice numbers, plausible company names, sensible monetary amounts). Never use "Lorem ipsum", "Test Company", or obviously fake placeholder text.
- **Currency:** Default to EUR (€) for mock data unless the user specifies a different locale. If the prototype is for a multi-currency context, include at least two currencies to demonstrate formatting differences.
- Define mock data in `src/data/*` so it can be swapped or extended without changing component code.
- Where a screen would show variable amounts of data in production, demonstrate at least two states: a typical case and an edge case (e.g. a long company name, a zero-value transaction, an empty list).

### Data integrity

- **Totals must reflect the data.** If a view shows line items alongside a total or summary figure, ensure the numbers add up correctly. Mismatched totals undermine trust in the prototype, particularly during stakeholder reviews and usability testing.
- **Pagination.** Where a dataset would realistically exceed a single screenful, implement pagination using Carbon's pagination component. Do not render unbounded lists. Mock data should include enough records to demonstrate at least two pages.

### UI states

Every interactive element should account for the following states where relevant:

- **Default** — the initial appearance.
- **Loading** — what the user sees while data is being fetched or an action is processing. Always use Sage Carbon's loader and skeleton components for loading states. Do not build custom loading indicators.
- **Empty** — what happens when there's no data to show (e.g. first-time use, no search results).
- **Error** — what the user sees when something goes wrong.
- **Success** — confirmation that an action completed, but only where the user needs feedback to understand what happened or to proceed with a next step. Not every action needs a success state — closing a panel, dismissing a notification, or toggling a filter do not require confirmation. Use judgment: if the user would wonder "did that work?" without feedback, add a success state.

The agent should proactively build these states unless the user explicitly says they are not needed. For usability testing in particular, missing states break the illusion of a working product.

### Responsive behaviour

- Prototypes should be functional at common breakpoints (desktop and tablet at minimum).
- Use Carbon's grid system for layout rather than fixed pixel widths.
- If a prototype is specifically for a single viewport (e.g. mobile only), note that clearly in the prototype's README.

---

## Scope guidance

There are no hard limits on what designers can build — the playground supports everything from simple UI mockups to complex interactive flows with state management, routing, and simulated API calls. However, the agent should help users navigate complexity wisely:

- **For simple UI explorations** (layout, component composition, visual design): build quickly, keep state minimal, focus on fidelity.
- **For interactive prototypes** (multi-step flows, form validation, conditional logic): introduce React state and simple hooks, explain each concept as it's introduced.
- **For complex simulations** (realistic data flows, multi-screen apps, simulated backend responses): use `src/data/*` for mock APIs, explain the architecture before building, and check in with the user at each milestone.

When complexity grows, the agent should:

1. Pause and summarise the current architecture in plain language.
2. Confirm the user understands the structure before adding more.
3. Suggest simplifications if the complexity is not serving the prototype's goal.

The agent should never refuse a request based on complexity alone, but it should always be transparent about trade-offs (e.g. "We can absolutely build this — it'll add some moving parts. Here's what that looks like...").

---

## Accessibility expectations

- All prototype screens must be navigable by keyboard.
- **Use Carbon's built-in focus states.** Sage Carbon components provide focus indicators automatically. Do not override, remove, or restyle these. Do not disable focus outlines or use `tabindex` values greater than 0. If a custom interactive element is needed outside of Carbon, ensure it has a visible focus state that matches Carbon's existing style.
- Use semantic HTML elements and appropriate ARIA attributes where Carbon components do not provide them automatically.
- Maintain a logical reading order and focus management, particularly in chat interfaces, modals, and multi-step flows.
- If a prototype will be used in usability testing, ensure screen reader announcements work for key interactions (e.g. form errors, loading states, navigation changes).
- Refer to `docs/prototyping-guidelines.md` for detailed accessibility patterns.

---

## Prototype documentation

Every prototype must include a README.md in its page folder (e.g. `src/pages/agent-onboarding/README.md`) containing:

- **Title** — the name of the prototype.
- **Purpose** — one or two sentences on what it explores or tests.
- **Audience** — which audience(s) this prototype targets (internal exploration, stakeholder review, usability testing, engineering handoff).
- **Status** — one of: `Exploring`, `In Review`, `Testing`, `Handed Off`, `Archived`.
- **Author** — who created it and when.
- **How to find it** — the route path within the app (e.g. `/agent-onboarding`).
- **Key decisions** — brief notes on any design decisions baked into the prototype that reviewers or engineers should know about.
- **Known limitations** — anything deliberately left out or faked.
- **Change log** — a running list of significant changes. Each entry should include the date and a brief description of what changed and why (e.g. `2026-03-25 — Replaced single-step form with multi-step wizard after usability testing feedback`).

This makes prototypes discoverable, reusable, and understandable over time. The agent should:

- **Create this file automatically** when scaffolding a new prototype page, prompting the user for purpose, audience, and any known limitations.
- **Update the change log proactively** whenever a significant change is made to the prototype. A significant change is anything that alters the user flow, adds or removes a screen, changes the data model, or reflects a design decision shift. Minor tweaks (copy changes, spacing adjustments, bug fixes) do not need logging unless they reflect a deliberate design change.
- **Prompt the user to update the status** if the prototype appears to have moved to a new phase (e.g. if the user mentions testing or handoff).

---

## Engineering handoff

These practices should be applied continuously as the prototype is built, not saved for a handoff preparation step at the end. The goal is that every prototype is handoff-ready at any point, without requiring a cleanup pass.

- **Separate intent from implementation.** Add code comments that distinguish "this is the intended UX behaviour" from "this is a prototype shortcut" (e.g. `// PROTOTYPE: using setTimeout to simulate API latency — replace with real endpoint`). Apply these comments as the code is written, not retrospectively.
- **Mark mock data clearly.** All mock data files should include a comment at the top: `// MOCK DATA — replace with real API responses`. Add this when the file is created.
- **Document component mapping.** Where prototype components map to existing Sage Carbon components, note the mapping. Where they don't, flag these as candidates for new Carbon patterns. Capture this as components are built, not during a later review.
- **Use clear prop and variable names.** Code should be readable by engineers who have not seen the prototype before. Avoid abbreviated or ambiguous names.
- **Do not over-engineer.** Prototypes are references, not production code. The agent should resist refactoring for performance or adding production concerns (error boundaries, analytics, auth) unless the user specifically asks.

---

## Anti-patterns to avoid

The agent should actively prevent these common mistakes:

- **Inline styles.** Never use inline `style={}` attributes. Use Sage Carbon components, `@sage/design-tokens`, or styled-components referencing tokens.
- **Magic numbers.** Never hardcode pixel values for spacing, font sizes, or colours. Always reference `@sage/design-tokens`.
- **Custom loaders or spinners.** Never build custom loading indicators. Always use Sage Carbon's loader and skeleton components.
- **Giant single-file components.** If a component exceeds roughly 150 lines, suggest breaking it into smaller composed components. Explain the reasoning in design terms (e.g. "Think of it like flattening a Figma frame — smaller components are easier to reuse and rearrange").
- **Dead code.** Remove unused imports, commented-out blocks, and orphaned components. Clean code is easier for the whole team to read.
- **Uncontrolled duplication.** If similar UI appears in multiple places, extract it into `src/components/*`. Prototypes should model the same reuse thinking that production code requires.
- **Ignoring existing patterns.** Before building something from scratch, check `src/components/*` for existing composed patterns and `docs/carbon-reference.md` for Sage Carbon components that already solve the problem.
- **Unbounded lists.** Never render a list of items without pagination or a reasonable cap. Use Carbon's pagination component for any dataset that could exceed a screenful.

---

## Quality checklist

The agent must run the following checks before presenting any new screen, component, or significant update to the user. These are not optional — treat failures as bugs to fix before showing the work.

### Numerical accuracy

- **All numbers must add up.** If a view shows line items alongside a total, subtotal, tax amount, or summary figure, verify the arithmetic is correct. Do not rely on having set the values correctly the first time — recalculate and confirm before presenting.
- **Right-align numerical values.** In tables, invoices, reports, and any financial context, numeric columns (amounts, quantities, totals, percentages) must be right-aligned. This is standard accounting convention — it allows users to scan and compare figures by decimal position. Labels and text columns remain left-aligned.

### Formatting consistency

- **Date formatting.** Pick one date format per prototype and apply it everywhere. Default to `DD MMM YYYY` (e.g. `25 Mar 2026`) unless the user specifies otherwise. Never mix formats within the same prototype (e.g. `25/03/2026` on one screen and `25 March 2026` on another).
- **Number formatting.** Apply consistent thousand separators, decimal places, and currency symbols throughout. Default to UK number formatting with the € symbol (e.g. `€1,250.00`). If a prototype includes percentages, be consistent about decimal places (e.g. always one decimal place, or always whole numbers — never a mix).

### Visual accuracy

- **Brand alignment.** Ensure colours, typography, and iconography come from Sage Carbon and `@sage/design-tokens`. If something looks "off brand", it probably is — check the token reference before moving on.

---

## Conflict resolution

If a user request conflicts with these rules:

1. Explain the specific constraint and why it exists.
2. Suggest the closest compliant alternative.
3. Only proceed with a rule violation if the user explicitly confirms after understanding the trade-off.

Never silently break a rule to fulfil a request.

---

## Supporting docs

- `docs/ag-grid.md` — reusable adapter, extension boundaries, localization, accessibility, and upgrade guidance.
- `docs/carbon-reference.md` — Sage Carbon component and import reference.
- `docs/design-tokens.md` — authoritative package roles, import rules, token selection, and upgrade guidance.
- `docs/localization.md` — localization scope, catalogue structure, formatting, and validation workflow.
- `docs/impeccable.md` — design-quality skill boundaries, security model, artifacts, and recommended commands.
- `docs/prototyping-guidelines.md` — Flow, mock data, routing, accessibility, and prototype workflow guidance.
- `docs/uifork.md` — component variation workflow, commands, build modes, and Sage guardrails.
