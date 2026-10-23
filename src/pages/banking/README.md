# Grouped bank accounts

## Purpose

Provide a quiet account overview that makes outstanding invoice matching visible before entering an account. Banks own sections; account names own cards.

## Audience

Stakeholder review and engineering handoff.

## Status

Exploring

## Author

Scott Smith, with Codex — 22 October 2026.

## How to find it

`/banking` and `/banking/baas` share this screen. Existing Sage onboarding still stages one active account and one application under review.

The full transaction workspace is now `/banking/bank-movements`; account-card task actions preselect the originating bank. See [Bank movements](bank-movements.README.md) for its shared-table and API boundaries.

## Key decisions

- Account-level task counts now use the same justification rules as the transaction overview: both missing invoices and missing categories are actionable. The CTA says Review transactions, since not every task is invoice matching.
- One bounded, single-column stack. A white, marketing-style Sage Wallet account promotion leads the stack, selling getting paid faster and team credit cards; the Sage accounts section appears below it only once a Sage account exists. Its cards are drawn in code (light green and white, no dark artwork), animate in, float gently and fan apart on hover; all motion is off under reduced-motion settings. A close button dismisses the banner for the rest of the visit and returns focus to Create.
- Connected-bank sections use original BNP Paribas and CaixaBank wordmarks as their accessible headings, avoiding duplicated wordmark-plus-bank-name text. Card headings are account names.
- Sage active accounts use a restrained token-based green surface/accent, a Carbon flash icon, and Real-time sync. Under-review accounts do not claim to be syncing and show Last sync: Not started.
- Each active account exposes its matching count from the shared transaction records. Matching a transaction reduces the count on return to the list. Zero-task accounts show No transactions to match. Matching actions open the correct account's workspace; third-party bank workspaces omit Sage-only debit-card navigation.
- Balance and currency are right-aligned; lower-priority ledger details are omitted from the overview. Sync sits in the account action menu, keeping the main card focused on the matching task.
- No page-level search or Sync all: Create is the header action, and the promotion sits directly under the title. Individual sync (account menu) demonstrates loading and updated timestamps without pretending to fetch a bank feed. Newly created manual accounts remain under Other accounts until their bank identity/connection is configured; they cannot claim a sync or open another account's transactions.
- Carbon components provide controls, loaders, menus, and typography. Custom layout and Sage differentiation use approved tokens.

- Opening an account uses the Sage Wallet modal (`src/components/sage-wallet/`): a dark, animated brand panel on the left (the Sage onboarding stripes, a drifting aurora, scene-specific motion) and three steps on the right: a single pre-filled form, a success screen, and a debit card offer that previews the card live. The flow deliberately pushes toward both outcomes: the success screen's primary action is the card, skipping is always a quiet tertiary action, and the banner disappears once an account exists.
- PROTOTYPE: opening the account is a timed delay; the chosen monthly limit is not stored because the shared card store has no limit field yet. Delivery times and the Adyen safeguarding line are placeholder copy to confirm.

## Localization scope

All new copy is localized in English, Spanish, French, German, and Portuguese. EUR balances and full last-sync timestamps use the active locale. Timestamps use Europe/London; account names are demonstration data.

## Logo provenance

The brand marks are not redrawn or recoloured. They are loaded from Wikimedia-hosted originals attributed to the banks, with a text-heading fallback if unavailable:

- [BNP Paribas logo and attribution](https://commons.wikimedia.org/wiki/File:BNP_Paribas_logo.svg); [bank website](https://group.bnpparibas/en/).
- [CaixaBank logo and attribution](https://commons.wikimedia.org/wiki/File:Logo_CaixaBank.svg); [official media/brand resources](https://www.caixabank.com/en/headlines/media-resources.html).

These are trademarked assets used for identification in an internal prototype, not an assertion of affiliation. Logo requests are external and use no-referrer. They should be approved and self-hosted through the product's asset pipeline before production.

## Known limitations

- Bank accounts, balances, dates, and feed rows are fixtures in `src/data/bankAccountConnections.ts`. No credentials, live feeds, or provider API calls are involved. The previous placeholder connected-bank cards are replaced on this overview only; legacy example data is retained elsewhere.
- Sage onboarding and matches persist across routes in shared session state; refreshing resets them. Search, sync timestamps, and newly created manual accounts are page-local demonstration state and reset when this screen is remounted.
- Sync advances the demonstration timestamp only; actual realtime delivery/failures/reconnection need provider integration. Account balances are independent bank snapshots, not totals of the small activity sample.
- The sample has three connected accounts across two banks, plus two Sage accounts after onboarding. It is bounded; a much larger portfolio would need section pagination or progressive loading.
- Existing invoice extraction and Purchases limitations are documented in `../banking-baas/transactions/README.md`.

## Change log

- 2026-10-23 — Renamed Sage bank account to Sage Wallet account; replaced the multi-screen onboarding dialog with the three-step Sage Wallet modal (account, success, debit card).

- 2026-10-23 — Moved Create into the header and removed Sync all and search; replaced the dark promotion with a white, animated, dismissible offer about getting paid faster and team credit cards.

- 2026-10-22 — Account transaction actions now open Bank movements with account selection rather than an isolated per-bank transaction page.
- Verification: Chrome journeys covered grouping, authentic logo loading, promo containment, connected-account upload/matching and updated list counts, search/empty search, sync timestamps, and Sage onboarding with active/pending states. Single-column alignment and no horizontal overflow were checked at 1440px, 1024px, and 768px in all five languages. Existing transaction upload/filter/pagination/keyboard journeys passed. Token/localization/reference validators, scoped ESLint, TypeScript, and the production build passed; build used `npm run build --ignore-scripts` to skip the Node-version precheck on this machine's unsupported Node 25. Existing font-resolution/Lottie/bundle warnings remain.
- 2026-10-22 — Replaced the card grid with bank-grouped stacked account rows; moved the promotion into Sage's section; added sourced bank logos, live matching counts, last-sync timestamps, and real-time Sage treatment. Unified both banking list entry routes and retained the onboarding/create flows.
