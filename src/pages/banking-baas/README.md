# Banking as a Service

## Purpose

This prototype explores how Sage can introduce Adyen-powered bank accounts and debit cards into the existing Banking experience. It focuses on the account list, account onboarding, the active-account dashboard, and debit-card management.

## Audience

Stakeholder review and engineering handoff.

## Status

Exploring

## Author

Scott Smith — 20 October 2026

## How to find it

Open `/banking/baas` in the playground.

## Key decisions

- Existing legacy accounts remain visible alongside Sage bank accounts.
- The promotional banner pairs the Copilot mark with layered Sage card visuals and opens a fixed-size, Sage-headed onboarding dialog.
- Completing the onboarding flow stages two demonstration accounts: one active and one pending review.
- The active account dashboard links to a debit-card view with reusable black card tiles, muted Sage-token gradients, and All, Issued, and Deactivated tabs. Card type and a contactless indicator sit beneath the Sage mark; card status pills hug their labels. Card issuing opens a shared 480px Carbon side panel with a live card preview, cardholder/network/colour choices, spend controls, and merchant and region restrictions.
- The prototype uses Carbon React and Sage design tokens, with the new composed UI kept in the `banking-baas` component group.

## Localization scope

The Sage Banking shell is available in English (`en-GB`), Spanish (`es-ES`), French (`fr-FR`), German (`de-DE`), and Portuguese (`pt-PT`). The provider-hosted onboarding surface intentionally stays in the exact English Figma copy so the external UI treatment remains faithful for stakeholder review.

## Known limitations

- Account creation, transfers, card issuing, and card detail actions are demonstration states only. The issue-card panel uses mock cardholder and restriction options; its typed form payload is ready to connect to the issuing API, but no API request is made.
- Adyen onboarding is represented by a local prototype flow rather than a live provider integration.
- The approval state and pending account are local demonstration states rather than live provider responses.
- Dashboard transactions and cardholders are mock data.
- The Visa mark is requested from the Simple Icons CDN and the full-colour Mastercard symbol from Wikimedia Commons; compact Sage-token fallbacks appear when the browser cannot reach either source.

## Change log

- 2026-10-20 — Added the Banking as a Service overview, Adyen-style onboarding flow, active and under-review account states, account dashboard, and reusable debit-card management view.
- 2026-10-20 — Reworked onboarding to mirror the annotated Adyen journey, including the loading handoff, eight form steps, approval state, and staged active/pending accounts.
- 2026-10-20 — Restyled the provider dialog to follow the Figma-hosted journey: provider start page, grey application canvas, progress rail, form cards, consent tiles, loader, and approval composition.
- 2026-10-20 — Replaced the generic form content with the exact Figma labels, helper copy, field groupings, review cards, and provider action placement.
- 2026-10-20 — Strengthened the promotion around bank-transaction matching and added a branded Carbon ring-loader handoff before the Adyen journey.
- 2026-10-20 — Updated the active-account dashboard to the flatter Figma direction, replacing the custom section navigation with a Back breadcrumb and using Sage KPI icons, 8px containers, and no surface shadows.
- 2026-10-20 — Added Visa and Mastercard marks beside transaction cardholder numbers to make the card network visible in the recent activity table.
- 2026-10-20 — Replaced the debit-card accordion groups with tabs, removed the account sub-navigation, restyled card tiles to follow the Figma card component, and added an assignable mock card-issuing flow with network and colour choices.
- 2026-10-20 — Refined debit cards with subtle token-colour gradients over black, moved physical/virtual labels beneath the Sage logo with a contactless mark, and constrained status pills to their content.
- 2026-10-20 — Increased card-gradient visibility slightly, placed contactless icons after card-type labels, and added linked Banking/account breadcrumbs with the account name in the page heading.
- 2026-10-20 — Reworked the Banking promotion around the Figma card composition, fixed the onboarding dialog frame across all steps, and simplified review sections to bottom dividers with full-size Edit actions.
- 2026-10-21 — Replaced CSS-drawn promotion cards with the supplied card artwork, scaled it to the banner column, and aligned the CTA with the banner copy.
- 2026-10-21 — Replaced the basic issue-card dialog with a shared 480px Carbon side panel, matching the single-column Figma form and previewing the selected network, cardholder, and gradient.
- 2026-10-21 — Aligned the issue-card preview with the debit-card tiles, applied those gradients to colour swatches, and expanded spending limits into a full-width form section.
