# Navigation template destinations

## Purpose

Provides a minimal, reusable route destination for links in the Sage Active
navigation template. Each destination intentionally contains only its localized
page title until a future prototype supplies real content.

## Audience

Stakeholder review and engineering handoff.

## Status

Exploring

## Author

Sage Design Playground team — 7 October 2026.

## How to find it

The component is shared by the notification, task, account-matching, closing,
and FEC routes declared in `src/App.tsx`.

## Localization scope

All visible titles are localized in English, Spanish, French, German, and
Portuguese through the `appNavigation` catalogue namespace. English (`en-GB`)
is the source and default language.

## Key decisions

- One route-level component serves every unfinished destination.
- Route configuration supplies a semantic translation key rather than visible copy.
- The page remains deliberately blank apart from its title.

## Known limitations

- Destination content and interactions are intentionally not implemented.

## Change log

- 2026-10-07 — Added reusable blank destinations for the complete navigation template.
