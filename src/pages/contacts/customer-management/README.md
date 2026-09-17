# Customer management

## Purpose

Explore a reusable customer-management flow with searchable, filterable and
paginated data, plus create, edit and delete interactions.

## Audience

Stakeholder review and engineering handoff.

## Status

Exploring.

## Author

Codex — 17 Sep 2026.

## How to find it

`/contacts/customers`

## Localization scope

All user-facing copy is maintained in English, Spanish, French, German and
Portuguese under the `customerManagement` locale namespace. English is the
default language.

## Key decisions

- Uses the shared `SageDataGrid` adapter with sorting, column filters, checkbox
  selection and Carbon-controlled pagination.
- The form follows the identification and primary-contact structure found in the
  Sage frontend customer reference. Banking, SEPA and advanced sales terms are
  deliberately outside this first management flow.
- Amounts remain numeric EUR values and dates are formatted for the active locale.

## Known limitations

- Changes are stored in React memory and reset when the page reloads.
- The short initial delay simulates loading; there is no backend request.
- The legacy `/contacts/customers/new` route remains available for compatibility.

## Change log

- 2026-09-17 — Replaced the static customer list with an interactive AG Grid
  management flow for stakeholder review.
