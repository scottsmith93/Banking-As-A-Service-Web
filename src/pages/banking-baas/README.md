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
- The promotional banner pairs the Copilot mark with layered Sage card visuals and opens a viewport-sized, Sage-headed onboarding dialog with a 40px edge gutter.
- Completing the onboarding flow stages two demonstration accounts: one active and one pending review.
- The active account dashboard links to a debit-card view whose tiles draw each card at real ID-1 proportions in the light Sage Wallet styles (Mint, Midnight, Plum), with All, Issued, and Deactivated tabs. Search and Create debit card share the title row. Sage Wallet issues Mastercard only, so every card, transaction, and the issuing form use the Mastercard mark and there is no network choice. Card issuing opens a 600px Carbon side panel with a centered 288px ID-1 proportion preview, a fixed Sage-green card style, two-column spend limits, and merchant and region restrictions.
- The prototype uses Carbon React and Sage design tokens, with the new composed UI kept in the `banking-baas` component group.

## Localization scope

The Sage Banking shell is available in English (`en-GB`), Spanish (`es-ES`), French (`fr-FR`), German (`de-DE`), and Portuguese (`pt-PT`). The provider-hosted onboarding surface intentionally stays in the exact English Figma copy so the external UI treatment remains faithful for stakeholder review.

## Known limitations

The transaction workspace and its Figma/competitor analysis are documented in [transactions/README.md](transactions/README.md). Open `/banking/bank-movements?account=sage-operating-account&view=all` to justify transactions, upload a document, or link an existing invoice from the EUR demo snapshot. The overview's ten newest transactions reuse the same column and cell definitions as Bank movements. Old per-account transaction URLs redirect here.

- Account creation, transfers, card issuing, and card detail actions are demonstration states only. Cardholders and restrictions are mock options. Issuing adds card metadata to shared in-memory state across Banking routes; refreshing resets it. Virtual cards are ready to use and physical cards appear as Ordered. The PIN is validated temporarily and is never retained in the demo card record; no shipment or issuing API request is made.
- Adyen onboarding is represented by a local prototype flow rather than a live provider integration.
- The approval state and pending account are local demonstration states rather than live provider responses.
- Dashboard transactions and cardholders are mock data.
- Network and wallet artwork is exported from the supplied Figma design and stored locally in `public/assets/banking-baas`; the panel makes no third-party image requests.

## Change log

- 2026-10-23 — Create debit card (cards page) and New card (account overview) now open the Sage Wallet wizard at its card step (2 steps: card details, card ready) instead of the side panel. Card tiles keep a single Manage action; View details was removed. The old side-panel components are no longer used.

- 2026-10-23 — Mastercard only: removed Visa from cards, transactions, and the issuing form. Redrew card tiles as light real-proportion cards, moved search and Create debit card into the title row, and dropped the redundant card count and CVV placeholder.

- 2026-10-22 — Grouped the recent-transactions heading/subtitle with a 4px gap and centred View all against the group. Made descriptions plain text while retaining Carbon's keyboard-accessible rows; added shared transaction-type icons and compact thick-tick justification styling, with muted non-applicable states and consistent row heights.
- 2026-10-22 — Compacted the account overview: inline title/actions and a single balance/KPI band, plus 10 newest transactions. Replaced receipt indicators with shared Justified states: linked invoices, Categorised with plain category text, or outlined attention pills. Added ATM fixtures and a category-saving flow that updates the overview, full transaction queues, and account-list counts.
- 2026-10-22 — Reworked the bank-account list as a single stack grouped by bank, with the promo inside Sage's section, bank logos, matching tasks, last-sync timestamps, and differentiated real-time Sage accounts. Both list routes share the implementation; see `../banking/README.md` for scope and asset provenance.
- 2026-10-22 — Added sequential suggested-match review with confirm, reject, and manual invoice choice; refined transaction cell spacing and detail layout, and linked matched EUR invoices to a read-only Purchases detail view.
- 2026-10-21 — Added the transaction workspace, invoice work queues, advanced filters, detail drawer, upload/review and existing-invoice matching paths; dashboard activity now opens the same transaction records.

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
- 2026-10-21 — Moved recent transactions ahead of cardholder spend, compacted the spend summary, applied the Sage gradient to the generic account card, and widened the issue-card panel with more efficient spending controls.
- 2026-10-21 — Reduced and repositioned the promotion artwork for responsive layouts, made onboarding scale to the browser with rounded corners, and added realistic, editable example data to the application review.
- 2026-10-21 — Centered the promotion artwork, switched onboarding fields to a single-column layout so helper text and controls stay aligned, removed outlines from account dashboard panels, and added a light outline around the transactions table.
- 2026-10-21 — Refined the issue-card panel with bordered Sage radio cards for network and colour choices, prominent network marks, and a centered preview at the ISO/IEC 7810 ID-1 card ratio.
- 2026-10-21 — Matched the Figma issue-card form with a 288px centered preview, removed card-colour editing, selected Visa by default, and grouped the controls into the reference’s spaced sections.
- 2026-10-21 — Removed duplicate panel padding: the black preview now spans the panel and fields have one 40px inset. Added the card halo, full-width network choices, and original Visa, Mastercard, Apple Pay, and Google Pay artwork exported from Figma. The inset stays 40px on narrow screens, where identity and spending fields stack vertically.
- 2026-10-21 — Applied the primary-inverted green to the card and softer halo. Card creation now simulates a two-second request with a Carbon button spinner, then keeps the same panel open for the Figma celebration state with Manage card and Create another debit card actions. Confirmation copy describes the virtual card issued by this form; no physical card is ordered.
- 2026-10-21 — Replaced side-panel dissolves with right-edge entry and exit using Carbon's existing animation lifecycle and timing. Reduced-motion preferences retain the default transition. Rounded debit-card tiles to 8px and moved card creation beside search, stacking the toolbar below 700px.
- 2026-10-21 — Added the Card type → Card details flow. Physical cards include a masked four-digit PIN, single-column shipping address, ATM withdrawals and in-store payment controls. Both paths use their latest Figma confirmations. Fixed the cardholder display by importing Carbon Select and Option from the same entry point; shared card state now adds the created card to the list from either Banking entry point, and Manage card opens it.
- 2026-10-21 — Matched the Figma card-type chooser with Carbon cards, branded previews, primary CTAs and benefit lists. Removed the preview stage’s black background, replaced Change card type with a Back link above the title, placed network selection before cardholder details, and shortened the PIN input. Shipping now pairs town/city with postcode and county with country; pairs stack below 540px. The country select offers nine demo destinations with localized names and submits an ISO country code.
- 2026-10-21 — Replaced the still celebration on both card-issuing success screens with the supplied local Lottie animation. The browser renderer loads on demand, plays once, respects reduced-motion preferences and releases its resources when the success screen closes.

- 2026-10-21 — Reintroduced shared account navigation and matched the revised Figma overview: balance on the page canvas, stacked-icon secondary actions, one summary strip, a subtle transaction table with explicit invoice association and a data-derived missing-receipts message, and a full-width cardholder-spend surface. Network marks use the existing local Figma exports. Desktop keeps the 40px content inset; when the account content area is below 700px it uses the existing 24px inset and stacks actions and summaries. This container breakpoint accounts for the application’s fixed navigation rail. The table and secondary navigation scroll horizontally rather than clipping data. The dedicated Transactions page remains the next iteration; the navigation currently anchors to recent transactions. Statements, money movement and View all transactions retain their visual placeholder actions; their destination flows are not part of this overview iteration.

- 2026-10-21 — Removed vertical padding around the secondary navigation, tightened stacked action-button gaps to 4px, and reduced supporting card-network marks. Recent transactions now use Carbon keyboard-accessible row selection and hover without opening a destination; dividers are lighter and the final row relies on the table’s outer border. Monthly cardholder rows include mock transaction counts and top merchants; counts sum to the summary total of 20.
