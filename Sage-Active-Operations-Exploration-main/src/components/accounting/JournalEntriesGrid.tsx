import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { journalEntryLines, type JournalEntryLine } from "../../data/journalEntries";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
  salesListingGridTheme,
} from "../sales-listing/salesGridShared";

type JournalEntriesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function JournalEntriesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: JournalEntriesGridProps) {
  const gridApiRef = useRef<GridApi<JournalEntryLine> | null>(null);

  const columnDefs = useMemo<ColDef<JournalEntryLine>[]>(
    () => [
      { field: "number", headerName: "Number", minWidth: 90, maxWidth: 100 },
      { field: "journal", headerName: "Journal", minWidth: 80, maxWidth: 90 },
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      { field: "documentNumber", headerName: "Document number", minWidth: 130 },
      {
        field: "documentDate",
        headerName: "Document date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      { field: "status", headerName: "Status", minWidth: 90 },
      { field: "account", headerName: "Account", minWidth: 200 },
      { field: "thirdParty", headerName: "Third party", minWidth: 180 },
      { field: "description", headerName: "Description", flex: 1, minWidth: 180 },
      {
        field: "debitGbp",
        headerName: "Debit",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 110,
      },
      {
        field: "creditGbp",
        headerName: "Credit",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 110,
      },
      { field: "currency", headerName: "Currency", minWidth: 90, maxWidth: 100 },
      { field: "month", headerName: "Month", minWidth: 100 },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("journal entry"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("journal entry"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<JournalEntryLine>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
    }),
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<JournalEntryLine>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<JournalEntryLine>) => {
      gridApiRef.current = event.api;
      updateDisplayedCount(event.api);
    },
    [updateDisplayedCount],
  );

  const handleFilterChanged = useCallback(() => {
    if (gridApiRef.current) {
      updateDisplayedCount(gridApiRef.current);
    }
  }, [updateDisplayedCount]);

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="salesGrid salesGrid--wide">
        <AgGridReact<JournalEntryLine>
          theme={salesListingGridTheme}
          rowData={journalEntryLines}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          onGridReady={handleGridReady}
          onFilterChanged={handleFilterChanged}
          suppressCellFocus
          animateRows={false}
          headerHeight={40}
          rowHeight={44}
        />
      </div>
    </AgGridProvider>
  );
}
