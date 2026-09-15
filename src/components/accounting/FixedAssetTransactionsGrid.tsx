import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import type { FixedAssetTransaction } from "../../data/fixedAssetTransactions";
import {
  createActionsCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";

type FixedAssetTransactionsGridProps = {
  rowData: FixedAssetTransaction[];
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function FixedAssetTransactionsGrid({
  rowData,
  quickFilterText = "",
  onDisplayedRowCountChange,
}: FixedAssetTransactionsGridProps) {
  const gridApiRef = useRef<GridApi<FixedAssetTransaction> | null>(null);

  const columnDefs = useMemo<ColDef<FixedAssetTransaction>[]>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        field: "transactionType",
        headerName: "Transaction type",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "amountGbp",
        headerName: "Amount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 120,
      },
      {
        field: "currentNetBookValueGbp",
        headerName: "Current net book value",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 180,
      },
      {
        field: "postJournalEntry",
        headerName: "Post journal entry",
        minWidth: 150,
      },
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: createActionsCellRenderer("fixed asset transaction"),
        sortable: false,
        filter: false,
        minWidth: 88,
        maxWidth: 88,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<FixedAssetTransaction>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<FixedAssetTransaction>) => {
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

  const handleRowDataUpdated = useCallback(() => {
    if (gridApiRef.current) {
      updateDisplayedCount(gridApiRef.current);
    }
  }, [updateDisplayedCount]);

  return (
    <SageDataGrid<FixedAssetTransaction>
      rowData={rowData}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
      onRowDataUpdated={handleRowDataUpdated}
    />
  );
}
