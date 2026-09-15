import { useMemo } from "react";
import {
  AG_GRID_LOCALE_DE,
  AG_GRID_LOCALE_EN,
  AG_GRID_LOCALE_ES,
  AG_GRID_LOCALE_FR,
  AG_GRID_LOCALE_PT,
} from "@ag-grid-community/locale";
import {
  AllCommunityModule,
  type ColDef,
  type LocaleText,
  type Module,
  type Theme,
} from "ag-grid-community";
import {
  AgGridProvider,
  AgGridReact,
  type AgGridReactProps,
} from "ag-grid-react";
import { useLanguage } from "../../context/useLanguage";
import type { Language } from "../../locales";
import { sageDataGridTheme } from "./sageDataGridTheme";

const communityModules = [AllCommunityModule];
const gridLocaleByLanguage = {
  English: AG_GRID_LOCALE_EN,
  Spanish: AG_GRID_LOCALE_ES,
  French: AG_GRID_LOCALE_FR,
  German: AG_GRID_LOCALE_DE,
  Portuguese: AG_GRID_LOCALE_PT,
} satisfies Record<Language, LocaleText>;

const baseColumnDefinition = {
  filter: true,
  resizable: true,
  sortable: true,
  suppressMovable: true,
} satisfies ColDef;

export type SageDataGridProps<TData> = Omit<
  AgGridReactProps<TData>,
  "defaultColDef" | "localeText" | "modules" | "theme"
> & {
  /** Classes for the layout container around AG Grid. */
  containerClassName?: string;
  /** Overrides extend the shared defaults rather than replacing them. */
  defaultColDef?: ColDef<TData>;
  /** Use only for a deliberate locale override outside LanguageContext. */
  localeText?: LocaleText;
  /** Optional per-grid modules, including future Enterprise modules. */
  modules?: Module[];
  /** Optional product-specific theme derived from the shared Sage theme. */
  theme?: Theme;
};

/**
 * Shared AG Grid adapter for Sage prototypes.
 *
 * Think of this as the main Figma component: screens provide data, columns,
 * and events while modules, Sage styling, language, and accessibility defaults
 * remain consistent. The language key deliberately recreates AG Grid because
 * AG Grid reads locale text only when an instance is created.
 */
export function SageDataGrid<TData>({
  animateRows = false,
  containerClassName,
  defaultColDef,
  ensureDomOrder = true,
  localeText,
  modules,
  theme = sageDataGridTheme,
  ...gridProps
}: SageDataGridProps<TData>) {
  const { language } = useLanguage();
  const resolvedLocaleText = localeText ?? gridLocaleByLanguage[language];
  const resolvedColumnDefinition = useMemo<ColDef<TData>>(
    () => ({ ...baseColumnDefinition, ...defaultColDef }),
    [defaultColDef],
  );
  const containerClasses = ["sageDataGrid", containerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <AgGridProvider modules={communityModules}>
      <div className={containerClasses}>
        <AgGridReact<TData>
          {...gridProps}
          key={language}
          animateRows={animateRows}
          defaultColDef={resolvedColumnDefinition}
          ensureDomOrder={ensureDomOrder}
          localeText={resolvedLocaleText}
          modules={modules}
          theme={theme}
        />
      </div>
    </AgGridProvider>
  );
}
