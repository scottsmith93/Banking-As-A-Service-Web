import { themeQuartz } from "ag-grid-community";

// AG Grid is not a Carbon component, so its visual contract is expressed only
// with the Sage tokens loaded by TokensWrapper. Keep product-specific styling
// in the consuming component rather than adding variants to this base theme.
export const sageDataGridTheme = themeQuartz.withParams({
  accentColor: "var(--colorsActionMajor500)",
  backgroundColor: "var(--colorsUtilityYang100)",
  borderColor: "var(--colorsUtilityMajor050)",
  columnBorder: false,
  fontFamily: "inherit",
  headerBackgroundColor: "transparent",
  headerRowBorder: false,
  headerColumnBorder: false,
  headerHeight: "var(--spacing500)",
  headerTextColor: "var(--colorsUtilityYin090)",
  oddRowBackgroundColor: "var(--colorsUtilityMajor010)",
  pinnedColumnBorder: false,
  rowBorder: false,
  rowHeight: "calc(var(--spacing500) + var(--spacing050))",
  selectedRowBackgroundColor: "var(--colorsActionMajor025)",
  spacing: "var(--spacing100)",
  wrapperBorder: false,
});
