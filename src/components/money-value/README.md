# Shared money values

`MoneyValue` renders numeric amounts using `Intl.NumberFormat.formatToParts`.
Supply the active locale and currency; never split a formatted currency string manually.

- Negative amounts always use Sage's dark negative token with a bold figure and regular-weight minus.
- `direction="out"` applies that treatment to an explicitly unsigned spend aggregate without inventing a negative value.
- `direction="in"` and positive signed transactions use the dark positive token with a bold figure and regular-weight plus sign. Positive balances and invoice totals stay neutral.
- `signed` requests +/− transaction notation; zero and negative zero remain neutral and unsigned.
- Currency order, spacing, grouping and decimals stay locale-correct.
- Amounts remain right-aligned and vertically centred by the consuming table.

Used across banking transaction lists, detail/review panels, balances, card spend and overview summaries.
Invoice totals, amount differences, limits and review totals are not automatically treated as outgoing cash flow.
