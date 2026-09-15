import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { priceLists, type PriceList } from "../../data/priceLists";
import { ActiveCellRenderer } from "../sales-listing/activeCellRenderer";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatListingDate,
} from "../sales-listing/salesGridShared";

type PriceListsGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function PriceListsGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: PriceListsGridProps) {
  const gridApiRef = useRef<GridApi<PriceList> | null>(null);

  const columnDefs = useMemo<ColDef<PriceList>[]>(
    () => [
      { field: "code", headerName: "Code", minWidth: 100 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
      {
        field: "startDate",
        headerName: "Start date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "endDate",
        headerName: "End date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      { field: "adjustmentType", headerName: "Adjustment type", minWidth: 150 },
      {
        field: "active",
        headerName: "Active",
        cellRenderer: ActiveCellRenderer,
        minWidth: 90,
        maxWidth: 100,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("price list"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("price list"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<PriceList>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<PriceList>) => {
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
    <SageDataGrid<PriceList>
      rowData={priceLists}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
