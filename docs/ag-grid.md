# AG Grid integration

AG Grid is an approved exception to the default Carbon-only component rule for
data-heavy prototype tables. Use it only when Carbon's `FlatTable` cannot express
the required sorting, filtering, selection, editing, virtualization, or large-data
behaviour. For small and mostly static tables, keep using Carbon.

The project uses the Community edition and exposes it through
`src/components/data-grid`. Feature components should not instantiate
`AgGridReact`, `AgGridProvider`, or `AllCommunityModule` directly.

## Basic use

```tsx
import { SageDataGrid, type ColDef } from "../../components/data-grid";

type CustomerRow = {
  id: string;
  customerName: string;
  balance: number;
};

const columns: ColDef<CustomerRow>[] = [
  { field: "customerName", headerName: copy.columns.customer },
  {
    field: "balance",
    headerName: copy.columns.balance,
    type: "rightAligned",
    valueFormatter: ({ value }) => formatCurrency(value),
  },
];

<SageDataGrid<CustomerRow> rowData={customers} columnDefs={columns} />;
```

`SageDataGrid` supplies Community modules, the Sage token theme, sortable and
resizable column defaults, stable DOM order, disabled row animation, and the
English, Spanish, French, German, or Portuguese AG Grid locale selected by
`LanguageContext`. The instance is recreated when the language changes because
AG Grid reads locale text at startup.

## Extension points

The shared table presentation is flat: transparent header backgrounds, no header
row borders and no outside frame. The global table stylesheet applies the same
contract to Carbon FlatTable and existing native tables, retaining body row
rules, sorting/resizing interactions, selection and focus indicators.

- Pass feature-specific AG Grid options directly to `SageDataGrid`; its props
  retain AG Grid's generic row typing.
- Use `defaultColDef` only to override shared defaults. The wrapper merges it.
- Pass optional `modules` for a feature that needs additional Community or
  Enterprise modules. Do not register them globally.
- Pass a theme derived from `sageDataGridTheme` only for a documented product
  requirement. New values must use tokens from `docs/design-tokens.md`.
- Use `containerClassName` for layout exceptions such as an auto-height lines
  table. Keep cell renderers and business rules in the feature folder.
- Import common AG Grid types from `src/components/data-grid`; import uncommon
  types from `ag-grid-community` rather than expanding the wrapper without need.

Enterprise modules require the matching `ag-grid-enterprise` version and a valid
commercial licence. Add them only when a named prototype requires an Enterprise
feature; never include the package speculatively.

## Product rules

- Column headings, tooltips, empty states, action labels, and accessible names
  belong in all five feature catalogues. The locale package covers AG Grid's own
  controls only.
- Keep amounts numeric and format them with the active locale. Monetary columns
  are right-aligned and use `currency: "EUR"` unless the prototype says otherwise.
- Preserve keyboard cell focus. Do not set `suppressCellFocus`; it prevents users
  from navigating cells with the keyboard.
- Paginate datasets that can exceed one screen. Use Carbon pagination as the
  product control and drive AG Grid through its API rather than exposing AG Grid's
  built-in pagination panel.
- Use Carbon loaders and skeletons around the grid for loading states. Provide
  explicit empty and error states appropriate to the feature.
- Test the affected screen at desktop and tablet widths in all five languages.

## Dependency upgrades

Keep `ag-grid-community`, `ag-grid-react`, and `@ag-grid-community/locale` on the
same version range. After an upgrade, review the AG Grid migration guide and run:

```bash
npm run validate
npm run lint
npm run build
```

Verify sorting, filtering, keyboard navigation, locale switching, custom cell
renderers, clickable rows, and auto-height tables before merging the upgrade.
