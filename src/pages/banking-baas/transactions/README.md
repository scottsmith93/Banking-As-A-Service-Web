# Sage bank transactions and purchase-invoice matching

## Purpose

Help a business owner or bookkeeper identify purchases without evidence and finish matching them with as little navigation as possible. Explore upload, extraction review, existing-invoice search, and a continuous work queue.

## Audience

Stakeholder review and engineering handoff.

## Status

Exploring

## Author

Scott Smith, with Codex — 21 October 2026.

## How to find it

`/banking/bank-movements?account=sage-operating-account&view=all`. Reach it through Bank movements in the left navigation, the account's Transactions navigation, or View all transactions on the dashboard. The `transaction` URL parameter opens a specific transaction directly. Legacy per-account transaction URLs redirect to this workspace. See [Bank movements](../../banking/bank-movements.README.md).

## Evidence reviewed

- [Figma Transactions page](https://www.figma.com/design/DkjnmlbRnlhEDc677x7heU/Banking?node-id=76-18976), including the desktop page (76:21659), table (76:21672), desktop filter drawer (76:21645), default detail panel (76:21932), and dispute entry (76:21936). The page is a canvas, so its individual frames were inspected separately.
- The supplied Pennylane Transactions screenshot, dated 21 October 2026, 22:49:23. This shows a list and filters; it provides no evidence about the competitor's detail drawer, upload process, or automatic matching rules.
- Sage frontend reference catalogue, `BankTransactionListDto.survey.bankTransactions.BankingTransactions`: its actions, proposed versus reconciled entries, amount differences, and work views informed the matching states. This catalogue is reference material, not the runtime translation source.

## Analysis and decisions

### Transaction justification — 22 October iteration

Visual refinement: recent title/subtitle form a 4px-gap group, with View all vertically centred. Descriptions are plain text; Carbon owns row click/focus/Enter/Space activation. A shared Sage icon/label pattern identifies card purchases, ATM withdrawals, transfers, refunds, fees, and direct debits in the recent list, full workspace, and detail facts. Justification uses a 12px thick green tick with a 4px label gap; category text aligns underneath the label. Non-applicable states are a muted dash with an accessible Not required label, and On hold remains muted text. Recent rows share a consistent height. Invoice-link keyboard events do not activate the containing row.

The account overview displays the ten newest records, not just purchases. Its title/actions share one row and its available balance/KPIs share a summary band, wrapping on smaller screens. The full workspace and overview reuse one justification renderer and one set of rules. Completed invoice-required purchases need a confirmed invoice association; category-only transactions (including ATM withdrawals) need an assigned category. Processing state remains separate from justification.

Linked invoices appear as a green Carbon tick and invoice-reference link directly into Purchases. Categorised transactions show a green tick and Categorised, with the category name beneath in plain text. Unresolved items have outlined Invoice needed or Category needed pills. Failed/cancelled payments show Not required, not a misleading green tick; pending/disputed purchases remain on hold. Proposed invoice matches are still Invoice needed until confirmed.

Category needed opens the existing transaction panel with a category selector and Save category action, not an invoice-upload CTA. Saving updates shared session data and all task counts. The former Matched work queue is now Justified and includes both confirmed invoice matches and categorised transactions. Two new ATM fixtures bring the Sage sample to 30 records: 16 initially need attention (15 invoice tasks plus one category task), 10 are justified, and the remaining 4 are processing/non-applicable states. Recent-table tablet layouts prioritise date, description, amount, and justification; supporting facts remain in the panel.

This is an explicit prototype evidence policy, not jurisdiction-specific accounting advice. Production APIs must provide applicable evidence/classification requirements. Category-only fixtures start with explicit assigned categories or Uncategorised; merchant category alone must not silently justify an invoice-required purchase.

### What the references establish

The Figma establishes a clear browsing pattern: search, cardholder, transaction type, a separate advanced-filter drawer, a sortable transaction table, pagination, and an independent detail surface. The details include payment status, transaction type, account, transaction and posting dates, category, location, and provider transaction ID. Its dispute flows are extensive: reason selection, supporting evidence, review, and dispute outcomes. They are a separate job from attaching a purchase invoice.

The competitor's counted **Not justified** queue is more useful for daily work than a table containing only processing statuses. Its top row exposes search, status, date, amount, category, account, and suggested reconciliation. Proof is visible as a column. The screenshot also illustrates the cost of showing every filter and many accounting columns at once: truncated descriptions, a wide table, and several competing concepts of status.

Figma's sample data should not define production accounting rules. Some example signs and statuses are ambiguous (including a negative refund and a disputed-state note equating disputes with processing failure). In this prototype, negative amounts are debits, refunds are credits, and a dispute is distinct from a failed payment.

### Task-led filtering

The default **Needs action** view contains only completed, outgoing purchases that require a purchase invoice and have none linked. **Matched** is the completed-work view. **All transactions** includes transfers, refunds, fees, failed payments, pending payments, and disputes without incorrectly turning them into missing-invoice tasks. Counts and the amount outstanding are calculated from the same records as the table.

Suggested matches are a subset of Needs action rather than a separate, overlapping completion state. The banner action opens a dedicated 480px review panel, independent of the table's current filters. It works oldest first, compares the payment with a proposed invoice, and offers Confirm and next, Reject and next, or Choose another invoice. The remaining count and live announcements make progress clear; keyboard focus moves to the next confirmation. Rejecting suppresses only that proposed transaction/invoice pair for the session. It does not discard either record or mark the purchase complete, and deliberate manual linking remains possible. Closing and reopening resumes the unresolved suggestions.

Search covers merchant, reference, provider transaction ID, cardholder, and linked invoice number. Cardholder and transaction type remain exposed because they support frequent delegation and investigation. Date range, absolute minimum/maximum amount, category, payment method, and payment status live in the advanced drawer. These are optional; the user should not have to supply a date range to apply another filter. Reversed date/amount ranges and negative minimums/maximums are rejected.

There is no bank-account filter on this account-specific page: linked breadcrumbs, navigation, and the current account provide that scope. A cross-account workspace would justify adding one later. Amount filters use magnitude for both debits and credits; this is stated next to the fields. Selecting a transaction preserves the current queue and filters.

Needs action initially sorts oldest first to expose the backlog; other queues initially sort newest first. Headers support additional sorting, and that sorting survives matching updates. Ten rows per page and the Carbon pager bound the list. A next-task button works through remaining eligible transactions within the current filter scope, oldest first. The current transaction stays open after it leaves the work queue so success is clear. At tablet widths the table prioritises date, merchant, invoice status, and amount; supporting cardholder, transaction-type, and payment-status columns remain available in the drawer and filters. The amount stays pinned on the right.

### Drawer hierarchy and matching

The 480px Carbon Sidebar leads with merchant, amount, date, and processing status, with a compact gradient/network card on the right for card payments. It uses the card's existing colour configuration, not a separate palette. Upload and link-existing are equal secondary action tiles in one full-width row; the latter uses Carbon's connect icon. Payment method/type and merchant/category are paired. Existing Figma-exported Apple Pay and Google Pay artwork identifies wallet payments. Transaction ID spans the width below the supporting facts. A suggested exact match can also be confirmed directly from the detail view.

Matched invoices appear in a bordered Carbon linked-button tile with reference, supplier, date, amount, and filename. It opens `/purchases/invoices/:invoiceId`, using the shared invoice snapshot. That Purchases route preserves the existing document/form composition but renders bank invoice data in a localized, read-only variant, retaining EUR and a return-to-transaction action. The original document and VAT breakdown are deliberately not fabricated. The older GBP invoice fixtures and their UI remain unchanged.

Grid cells have token-based 4px top/bottom padding; stacked merchant and cardholder content uses a 2px gap and explicit text line height to avoid inheriting the full grid row height.

**Upload:** choose a PDF/JPG/PNG of up to 10 MB → Carbon extraction loader → review supplier, invoice number, date, and total → confirm match → show the linked invoice and update the table and queue. The review is retained because a file attachment alone does not prove that extracted accounting data is correct. Amount differences remain unresolved. Duplicate supplier/invoice-number combinations direct the user to existing-invoice search instead of creating a second invoice.

**Existing invoice:** search the invoice snapshot → inspect supplier, number, date, amount, and match eligibility → confirm an eligible invoice → update both the invoice association and the transaction state atomically. Exact supplier, currency, and amount are required, and the invoice must not be dated after the payment. Invoices already matched to another transaction are excluded. Suggestions additionally use a preceding 31-day date window. Older invoices remain searchable for manual linking when otherwise eligible.

Payment status and invoice status have separate columns and labels. A payment being Completed is never used as a synonym for Matched. Pending and disputed purchases are on hold; fees, refunds, internal transfers, failed payments, and cancelled payments do not generate purchase-invoice tasks.

### Merchant location

A small Google Maps Embed API iframe is available when `VITE_GOOGLE_MAPS_EMBED_KEY` is configured. [Google's supported embed API requires a key](https://developers.google.com/maps/documentation/embed/quickstart). Without it, a real merchant-address summary and a Google Maps link remain usable; the prototype does not draw a pretend map. Add a website-restricted key to the local environment and restart Vite to enable the iframe.

Maps are placed below the invoice action and transaction facts. Only provider-supplied merchant locations are shown. Online payments without a location explicitly say so; a supplier's registered office must not be presented as the customer's purchase location. Addresses and map coordinates in these fixtures are demonstration data.

## Component mapping

- `useTransactionTableColumns` owns columns, cell layouts and formatting for both the Carbon FlatTable recent list and SageDataGrid full list. Both consume one shared transaction store.
- Existing account navigation and breadcrumbs establish route context.
- SageDataGrid supplies sorting, resizeable columns, keyboard cell navigation, and bounded pagination; the product pagination control is Carbon Pager.
- Carbon Sidebar, Button, Textbox, Decimal, DateInput, Select, Tabs, Pill, Message, and Loader supply the visible UI. A Carbon upload button opens the native browser file chooser.
- The invoice task, suggested-invoice card, and transaction facts are composed patterns and candidates for shared product patterns.

## Localization scope

All new visible labels, filters, errors, empty states, success messages, and accessibility strings are supplied in English, Spanish, French, German, and Portuguese. Dates are ISO data rendered with the active locale; amounts are numeric EUR values. Read-only dates use the readable day/month-name/year format; editable date controls use Carbon's locale-specific numeric entry format, as in the Figma filter drawer. Partial date text is retained until it can be validated, separately from the ISO filter value. Carbon's month-name override only changes output and does not support month-name input parsing in the installed version. Merchant names, document identifiers, addresses, and uploaded filenames are data.

## Known limitations and integration boundaries

- Transactions and invoices use an API-shaped EUR fixture snapshot, also resolved by the Purchases detail route. The legacy Purchases list still contains separate GBP-specific examples, not this snapshot. The bank invoice detail variant is read-only and shows document metadata, not the original PDF/image. A production integration must connect the real purchase-invoice service, document storage, VAT data, and shared identifiers.
- Extraction is simulated and explicitly disclosed in the review UI. The selected file is validated locally; its contents are not sent to an OCR service or persisted. The user can edit the example extracted fields before confirming.
- Associations persist across routes in shared React session state; refresh resets the demonstration. There is no real bank feed or server write.
- Matching demonstrates one invoice per transaction and exact currency/amount matches. Split payments, several invoices per payment, fees/FX adjustments, credit-note reconciliation, undo, supplier aliases, and multi-user conflicts need further design. Disputes remain represented as a payment state; the Figma dispute wizard is outside this iteration.
- Production extraction failures need a retry/manual-entry route and provider error handling. The prototype's file validation and mismatch/duplicate states cover failures it can actually produce locally.
- The 28 transactions are a bounded activity sample; account balance and monthly dashboard KPIs represent a separate monthly snapshot, not the sum of this list.

## Further recommendations

1. Add due-age and materiality sorting as task-priority options, alongside oldest first. Save the accountant's preferred filter combination when a real persistence service is available.
2. Rank suggestions by supplier identity/aliases, amount, currency, date, invoice reference, and remaining balance. Show the actual reasons for a suggestion; avoid unsupported confidence percentages.
3. Add a separate review state for extraction uncertainty and amount differences before supporting bulk confirmation. Bulk work should include only individually eligible suggestions with explicit user confirmation.
4. Handle legitimate non-invoice evidence (bank fees, payroll, tax, internal transfers) as separate reconciliation paths rather than forcing a purchase invoice onto every debit.
5. Add receipt/invoice requests to cardholders, visible ownership, oldest outstanding age, and a traceable matching history once the core link/upload flow is validated.

## Verification record

- Recent-table refinements: Chrome verified a 4px title/subtitle gap, vertically centred View all in all five languages at 1705/1440/1024/768px, plain descriptions without controls, ten uniform 56px rows, type icons, 12px thick green ticks and 4px tick-label gaps. Keyboard row activation, invoice links without row activation, row clicks, category saving, and muted non-applicable states passed without JavaScript errors. Data/rule safeguards, scoped lint, token/locale validation, TypeScript, and build also passed.
- Compact overview/justification iteration: Chrome checks confirmed 10 newest records, desktop H1/action alignment and a shared balance/KPI band; invoice-number navigation; category-only ATM presentation; category saving without an invoice; removal from Needs action and retained status on returning to the overview. All five languages checked at 1705px, 1440px, 1024px, and 768px without page overflow or JavaScript errors. Supporting recent-table columns collapse to keep justification visible on tablets.
- Rules/totals checked independently: Sage sample 30 records, 16 attention tasks (15 invoice + 1 category), 10 justified, EUR 3,397.75 requiring attention of which EUR 3,277.75 requires invoices, and 7 eligible suggestions. Unsettled/failed/cancelled ATM states do not count as justified or actionable; invoice amount/currency/supplier safeguards remain intact. Scoped ESLint, TypeScript, token/localization validation, and build passed using the existing Node-version precheck workaround described below.
- 22 October iteration: verified 4px cell padding and 2px stacked-content gaps in Chrome; equal-width/equal-row invoice action tiles; Google Pay artwork and the correct card gradient; sequential confirm, reject, manual choice, completion, and live counts. Rejecting a suggestion leaves Needs action unchanged and permits later deliberate manual linking.
- Verified the bordered invoice tile opens the correct EUR record at the Purchases detail route and returns to the matched transaction. Review panel, action tiles, and linked invoice view checked in all five languages at 1440px and 1024px without horizontal overflow or JavaScript errors. Existing upload/filter/pagination/keyboard/dashboard journeys were rerun successfully.
- Chrome review at 1440px desktop and 1024px tablet widths in all five languages: list and 480px drawer, locale switching, no page overflow, no JavaScript errors. Tablet columns retain invoice status and amounts.
- Browser journeys: pagination, transaction selection, invalid-file feedback, extraction review, amount mismatch, upload confirmation, existing-invoice association, next task, live counters, payment-status filtering, empty search, Enter/Escape navigation, dashboard navigation, and matching state retained across routes.
- Range checks: reversed amount ranges rejected; absolute-amount and date filters verified against the displayed rows; partial typed dates retained rather than discarded.
- Full queue: all 15 initially actionable purchases matched using the next-task flow, reaching Needs action (0) and Matched (20) out of 28 total transactions.
- Data/rule checks: initial unmatched total EUR 3,277.75; 7 exact suggestions; mismatched supplier/currency/amount/date, duplicate invoice number, reused invoice, and ineligible payment states rejected.
- TypeScript, scoped ESLint, locale/token/reference-catalogue validation, whitespace check, and production build passed. Build used `npm run build --ignore-scripts` to run the actual build pipeline while skipping the runtime-version precheck on this machine's unsupported Node 25. Existing font-resolution, Lottie, and bundle-size warnings remain.
- Google Maps iframe geometry is implemented, but live map loading was not tested without an API key. File extraction and invoice search remain the disclosed local demonstrations described above.

## Change log

- 2026-10-22 — Moved the full workspace to Bank movements with URL-selected accounts, a compact account/KPI band, and All / To justify / Justified tabs. Shared the complete table presentation with the overview; retained matching workflows and legacy link redirects.
- 2026-10-22 — Added shared invoice/category justification, an interactive categorisation task, two ATM fixtures, and generic transaction terminology. The overview now shows 10 newest transactions, compact header actions, and inline balance/KPIs; linked invoice references open Purchases directly.
- 2026-10-22 — Replaced suggested-match filtering with a confirm/reject/manual-choice review queue; tightened grid content spacing; paired transaction facts and invoice action tiles; added wallet marks, compact card art, and a bordered invoice link to the Purchases detail route.
- 2026-10-21 — Added an account transaction workspace with action queues, filters, transaction details, invoice upload/review, existing-invoice search, eligibility safeguards, and shared matching state; documented the Figma and competitor analysis.
